const { Router } = require('express');
const { crearProducto, getProductByID, getProducts, updateProduct ,delateProduct ,delateImgProduct } = require('../controllers/product');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')
const {loadFileImage , uploadImage} =  require('../utils/handleUploadImage');
const router = Router()
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
router.get('/', getProducts)
router.get(
    '/:id',
  //checkRol('ROLE_ADMIN', 'ROLE_OPERATOR'),validatorGetProducts,
   getProductByID
)
router.post(
    '/',
    [authMiddleware],
    crearProducto
)




// router.post(
//     '/image',
//     // [authMiddleware],
//     uploadImage.fields([{ name: 'file', maxCount: 1 }]),
//     loadFileImage
// )


// Middleware de Multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// Ruta para subir archivos
router.post('/image', upload.single('file'), async (req, res) => {
    try {

      const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 200 }) // Redimensiona la imagen (opcional)
      .jpeg({ quality: 80 })  // Ajusta la calidad (puedes modificarla según necesites)
      .toBuffer();


      const ext = req.file.originalname.split('.').pop()
        const filename = `file-${Date.now()}.${ext}`
      console.log('body....',req.body)
      const { data, error } = await supabase.storage
        .from('productImages')
        .upload(`public/${filename}`,compressedBuffer);
      
      if (error) {
        console.log('el error',error);
        throw error;
      }
  
      const { publicURL, error: publicURLError } = supabase.storage
        .from('productImages')
        .getPublicUrl(`public/${filename}`);
  
      if (publicURLError) {
        throw publicURLError;
      }
  
      res.status(200).send({ message: 'Imagen subida correctamente' , uri: filename });
    } catch (error) {
      console.error(error);
       (error.error =='Duplicate')?  res.status(200).json({ message: 'Imagen ya estaba subida' , uri: req.file.originalname })
       : res.status(500).send({ error: error.message });
    }
  });


router.put(
    '/:id',
    [authMiddleware],
    updateProduct
)
router.delete( 
    '/:id',
    [authMiddleware],
    delateProduct
)

router.delete('/image/:filename',[authMiddleware], delateImgProduct);

module.exports = router

