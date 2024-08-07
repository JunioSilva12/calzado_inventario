
const { matchedData } = require('express-validator');
const multer = require('multer');

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

  module.exports = { loadFileImage ,uploadImage }