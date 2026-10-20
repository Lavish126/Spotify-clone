const musicModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

async function createMusic(req,res){

   const {title} = req.body
   const file = req.file

   const result = await uploadFile(file.buffer.toString('base64'));
   const music = await musicModel.create({
      uri:result.url,
      title,
      artist: req.user.id,
   })

   res.status(201).json({
    message:"music created successfully",
    id: music._id,
    title: music.title,
    uri: music.uri,
    artist: music.artist
   })

   }



async function createAlbum(req,res){
  
  const{title,musics} = req.body;
  const album = await albumModel.create({
    albumTitle:title,
    artist: req.user.id,
    musics: musics,

  })
  res.status(201).json({
    message:"album created successfully",
    album:{
       id: album._id,
       title: album.albumTitle,
       musics: album.musics,
       artist:album.artist
    }
  })
}


async function  getAllMusics(req,res){
try{ 
       const musics  =  await musicModel
       .find()
       .skip(1)
       .limit(10)
       .populate("artist")

    res.status(200).json({
    message:"Musics fetched successfully",
    musics:musics
   })
}catch(error){
     res.status(500).json({
        message:"Musics fetched error",
        error:error.message
     })
}
}

async function getAllAlbums(req,res){
    try{
  const albums =   await albumModel.find().select("title artist ").populate("artist","username email")
         return res.status(200).json({
            message:"Album fetched successfully",
            albums:albums
         })
    }catch(error){
        return res.status(500).json({
            message:"Album not fetched successfully",
            error:error.message
        })
    }
}

async function getAlbumById(req,res){
    try{
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics")
    if(!album){
        return res.status(404).json({
            message:"Album not found"
        })
    }
    return res.status(200).json({
        message:"Album fetched successfully",
        album:album
    })
}catch(error){
        return res.status(500).json({
            message:"Error fetching album",
            error:error.message
        })
    }
}


  

module.exports = {createMusic, createAlbum, getAllMusics, getAllAlbums,getAlbumById}