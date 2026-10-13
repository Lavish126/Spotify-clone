const express = require("express");
const {createMusic , createAlbum, getAllMusics, getAllAlbums, getAlbumById} = require("../controllers/music.controller");
const {authArtist, authUser} = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router();

router.post("/upload", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);
router.get("/allMusics",authUser, getAllMusics);
router.get("/albums",authUser, getAllAlbums);
router.get("/albums/:albumId",authUser, getAlbumById);


module.exports = router;