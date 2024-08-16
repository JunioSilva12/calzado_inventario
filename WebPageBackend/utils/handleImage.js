
const fs = require('fs');



const path = require('path');

const moverArchivo = (imagePath ,nameFile) => {
  console.log("url de la imagen...",imagePath);
  const pathTosend = `.`  

    try {
        fs.renameSync(`../../storage/Product_image/${nameFile}`, path.join(pathTosend, nameFile));

        console.log(`Archivo movido de '${imagePath}' a '${pathTosend}' correctamente.`);
    } catch (error) {
        console.error(`Error al mover el archivo: ${error.message}`);
    }
}




















function removeExtension(filename) {
  const lastDotPosition = filename.lastIndexOf('.');
  if (lastDotPosition === -1) return filename;
  return filename.substring(0, lastDotPosition);
}

  module.exports = {  removeExtension,  moverArchivo }