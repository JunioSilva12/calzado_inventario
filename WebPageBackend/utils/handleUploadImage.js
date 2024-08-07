
const { matchedData } = require('express-validator');
const multer = require('multer');
const { authorizeB2  } = require('../config/backBlaze');



const {moverArchivo} = require('./handleImage');
const loadFileImage =async (req, res) => {

  console.log("la-img", req.files.file[0]);
  
    if (! req.files.file[0]) {
      
      return res.status(400).json({ error: 'No se ha seleccionado ninguna imagen'  });
    }
    // Aquí puedes guardar la información de la imagen en tu base de datos o hacer lo que necesites
    //moverArchivo( req.files.file[0].path , req.files.file[0].originalname);
    res.status(200).json({ message: 'Imagen subida correctamente' , uri: req.files.file[0].originalname });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathStorage = `../ecomerce-Frontend/public/product_images`
        callback(null, pathStorage)
    },
    filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop()
       // const filename = `file-${Date.now()}.${ext}`
       const filename=file.originalname;
        callback(null, filename)
    }
})
  
  const uploadImage = multer({ storage });



  const loadFileImage2 = async (req, res) => {
    try {
      // Autorizar B2
      await authorizeB2();
  
      // Obtener el Upload URL y el Auth Token
      const response = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
      });
  
      const { uploadUrl, authorizationToken } = response.data;
  
      // Subir el archivo a Backblaze B2
      const fileUploadResponse = await b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: req.file.originalname,
        data: req.file.buffer,
      });
  
      res.status(200).send({
        fileUrl: `https://f000.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${req.file.originalname}`,
        data: fileUploadResponse.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading file' });
    }
  }


  module.exports = { loadFileImage ,uploadImage,loadFileImage2 }