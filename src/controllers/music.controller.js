const mongoose = require("mongoose");
const musicModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service");
const albumModel = require("../models/album.model");

// Only these artist fields are ever sent to the client (never the password hash)
const ARTIST_FIELDS = "userName email";
const MAX_LIMIT = 50;

async function createMusic(req,res){
  try{
   const title = req.body.title?.trim();
   const file = req.file;

   if(!file){
      return res.status(400).json({
         message:"music file is required"
      })
   }
   if(!title){
      return res.status(400).json({
         message:"title is required"
      })
   }

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
  }catch(error){
     res.status(500).json({
        message:"Error uploading music",
        error:error.message
     })
  }
}



async function createAlbum(req,res){
  try{
  const title = req.body.title?.trim();
  const musics = req.body.musics || [];

  if(!title){
    return res.status(400).json({
      message:"title is required"
    })
  }
  if(!Array.isArray(musics) || !musics.every((id) => mongoose.isValidObjectId(id))){
    return res.status(400).json({
      message:"musics must be an array of music ids"
    })
  }

  // Artists can only put their own songs in their albums
  const ownedCount = await musicModel.countDocuments({
    _id: {$in: musics},
    artist: req.user.id,
  })
  if(ownedCount !== new Set(musics).size){
    return res.status(400).json({
      message:"some musics don't exist or don't belong to you"
    })
  }

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
  }catch(error){
    res.status(500).json({
      message:"Error creating album",
      error:error.message
    })
  }
}


// GET /allMusics?page=1&limit=10&artist=<userId>
async function  getAllMusics(req,res){
try{
       const page = Math.max(parseInt(req.query.page) || 1, 1);
       const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), MAX_LIMIT);

       const filter = {};
       if(req.query.artist){
          if(!mongoose.isValidObjectId(req.query.artist)){
             return res.status(400).json({
                message:"invalid artist id"
             })
          }
          filter.artist = req.query.artist;
       }

       const [musics, total] = await Promise.all([
          musicModel
            .find(filter)
            .sort({_id: -1}) // newest first
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("artist", ARTIST_FIELDS),
          musicModel.countDocuments(filter),
       ])

    res.status(200).json({
    message:"Musics fetched successfully",
    musics:musics,
    pagination:{
       page,
       limit,
       total,
       totalPages: Math.ceil(total / limit),
    }
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
  const albums =   await albumModel.find().sort({_id: -1}).select("albumTitle artist musics").populate("artist", ARTIST_FIELDS)
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
    if(!mongoose.isValidObjectId(albumId)){
        return res.status(404).json({
            message:"Album not found"
        })
    }
    const album = await albumModel.findById(albumId).populate("artist", ARTIST_FIELDS).populate("musics")
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
