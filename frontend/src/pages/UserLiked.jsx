import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Cardown from "../components/Cardown";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";

export default function useLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  // const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  console.log(movies);
  // const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState(undefined);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);
  // console.log(movies);
  // useEffect(() => {
  //   if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  // }, [genresLoaded]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  // console.log(getUserLikedMovies(email))
  return <Container>
    <Navbar isScrolled={isScrolled}/>
    <div className="content flex column">
      <h1>MyList</h1>
      <div className="grid flex">
        {
          
          movies.map((movie, index) => {
            
            return <Cardown movieData={movie} index={index} key={movie.id} isLiked={true} />
          })
        }
      </div>
    </div>
  </Container>
}
const Container = styled.div`
  .content{
    margin:2.3rem;
    margin-top:8rem;
    gap:3rem;
    h1{
      margin-left:3rem;
    }
    .grid{
      flex-wrap:wrap;
      gap:1rem;
    }
  }
`;
