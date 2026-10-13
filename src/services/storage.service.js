const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file){
    const result =  await ImageKitClient.files.upload({
       file,
       fileName: "music_"+ Date.now(),
       folder: "backend01/spotify"
     })
     return result;
}

module.exports = {uploadFile}

