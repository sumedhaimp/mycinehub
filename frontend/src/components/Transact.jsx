import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { async } from "@firebase/util";
const Transact = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  // const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.email);
  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (currentUser) setEmail(currentUser.email);
  //   else navigate("/login");
  // });
  // const addToList = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/user/add", {
  //       email,
  //       data: movieData,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setErrorMessage("Install MetaMask please!!");
    }
  };
  const myown = async () => {
    let params = [
      {
        from: defaultAccount.toString(),
        to: "0xf03345c585442f97C7733AFC44238f26F0F4D4E8",
        gas: Number(31000).toString(16),
        gasPrice: Number(3000000).toString(16),
        value: Number(1 * 1e18).toString(16),
      },
    ];
    let result = await window.ethereum
      .request({ method: "eth_sendTransaction", params })
      .then(async (balance) => {
        console.log(location.state.email);
        setUserBalance(ethers.utils.formatEther(balance));
        const email = location.state.email;
        const movieData = location.state.movieData;
        try {
          await axios.post("http://localhost:5000/api/user/add", {
            email,
            data: movieData,
          });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
    console.log(userBalance);
    navigate("/mylist");
  };
  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };
  async function sendTransaction(e) {
    if (e.target.v.value == 2) {
      let params = [
        {
          from: defaultAccount.toString(),
          to: "0xf03345c585442f97C7733AFC44238f26F0F4D4E8",
          gas: Number(31000).toString(16),
          gasPrice: Number(3000000).toString(16),
          value: Number(e.target.v.value * 1e18).toString(16),
          // value:Number(2).toString(16),
        },
      ];
      const email = location.state.email;
      const movieData = location.state.movieData;
      try {
        await axios.post("http://localhost:5000/api/user/add", {
          email,
          data: movieData,
        });
      } catch (e) {
        console.log(e);
      }
      let result = await window.ethereum
        .request({ method: "eth_sendTransaction", params })
        .then(() => {
          console.log(location.state.email);
          navigate("/mylist");
          // setUserBalance(ethers.utils.formatEther(balance));
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(result);
    } else {
      navigate("/movies");
    }
    navigate("/mylist");
  }
  return (
    <div>
      <center>
        <h1>MetaMask wallet connection</h1>
        <button onClick={connectWallet}>connect wallet button</button>
        <h3>Address : {defaultAccount}</h3>
        <h3>Balance : {userBalance}</h3>
        {/* <form onSubmit={sendTransaction}>
          <h1>pay 2 ethers to buy this movie: </h1>
          <input type="text" name="v" placeholder="value" />
          <input type="submit" value="Submit"/>
        </form> */}
        {/* {errorMessage} */}
        {/* <input type="button" value="confirm" onClick={() => navigate("/netflix")} /> */}
        {/* <input type="button" value="confirm" onClick={sendTransaction} /> */}
        <input type="button" value="send" onClick={myown} />
      </center>
    </div>
  );
};
export default Transact;
