const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController");


const routes = require("express").Router();
const router = require("express").Router();
router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete",removeFromLikedMovies)
module.exports = router;