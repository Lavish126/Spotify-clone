const express = require("express");
const {createMusic , createAlbum, getAllMusics, getAllAlbums, getAlbumById} = require("../controllers/music.controller");
const {authArtist, authUser} = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize: 20 * 1024 * 1024}, // 20 MB
    fileFilter:(req, file, cb) => {
        if(file.mimetype.startsWith("audio/")) return cb(null, true);
        const error = new Error("only audio files can be uploaded");
        error.status = 400;
        cb(error);
    }
})

const router = express.Router();

router.post("/upload", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);
router.get("/allMusics",authUser, getAllMusics);
router.get("/albums",authUser, getAllAlbums);
router.get("/albums/:albumId",authUser, getAlbumById);


module.exports = router;
