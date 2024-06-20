const sharp = require('sharp');
const fs = require('fs');
const potrace = require('potrace');


const { createCanvas , loadImage} = require('canvas');


const path = require('path');

const moverArchivo = (imagePath ,nameFile) => {
  console.log("url de la imagen...",imagePath);
  const pathTosend = `C:\\Users\\JUNIOR SILVA\\OneDrive\\Desktop\\proyecto1.1\\semestre9\\INGENIERIA DE SOFTWARE\\WebPageproyect\\ecomerce-Frontend\\src\\core\\assets\\images\\`  

    try {
        fs.renameSync(imagePath, path.join(pathTosend, nameFile));

        console.log(`Archivo movido de '${imagePath}' a '${pathTosend}' correctamente.`);
    } catch (error) {
        console.error(`Error al mover el archivo: ${error.message}`);
    }
}










const transformImage3 = (imagePath ,nameFile) =>{

  const pathTosend = `C:\\Users\\JUNIOR SILVA\\OneDrive\\Desktop\\proyecto1.1\\semestre9\\INGENIERIA DE SOFTWARE\\WebPageproyect\\new\\webpageproyect\\src\\core\\assets\\images\\`  
  // Cargar la imagen
  console.log(pathTosend);
  const inputImagePath  = imagePath;  // Ruta de la imagen de entrada
  const outputSvgPath = pathTosend+`${removeExtension(nameFile)}.svg`;

  // Cargar la imagen
loadImage(inputImagePath).then((image) => {
  // Crear un canvas con las dimensiones de la imagen
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  // Dibujar la imagen en el canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Convertir el canvas a un buffer PNG
  const pngBuffer = canvas.toBuffer('image/png');

  // Usar potrace para convertir el buffer PNG a SVG
  potrace.trace(pngBuffer, (err, svg) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    // Agregar espacio de nombres xlink al SVG resultante
    const svgWithNamespace = svg.replace(
      '<svg ',
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink" '
    );

    // Guardar el SVG resultante en un archivo
    fs.writeFile(outputSvgPath, svgWithNamespace, (err) => {
      if (err) {
        console.error('Error writing SVG file:', err);
        return;
      }
      console.log('SVG file saved at:', outputSvgPath);
    });
  });
}).catch((err) => {
  console.error('Error loading image:', err);
});


}


const transformImage2 = (imagePath ,nameFile) =>{

const pathTosend = `C:\\Users\\JUNIOR SILVA\\OneDrive\\Desktop\\proyecto1.1\\semestre9\\INGENIERIA DE SOFTWARE\\WebPageproyect\\new\\webpageproyect\\src\\core\\assets\\images\\`  
// Cargar la imagen
console.log(pathTosend);
const inputImagePath = imagePath;  // Ruta de la imagen de entrada
const outputSvgPath = pathTosend+`${removeExtension(nameFile)}.svg`;  // Ruta donde se guardará la imagen SVG

potrace.trace(inputImagePath, (err, svg) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const svgWithNamespace = svg.replace(
    '<svg ',
    '<svg xmlns:xlink="http://www.w3.org/1999/xlink" '
  );

  fs.writeFile(outputSvgPath, svgWithNamespace, (err) => {
    if (err) {
      console.error('Error writing SVG file:', err);
      return;
    }
    console.log('SVG file saved at:', outputSvgPath);
  });
});


}






function removeExtension(filename) {
  const lastDotPosition = filename.lastIndexOf('.');
  if (lastDotPosition === -1) return filename;
  return filename.substring(0, lastDotPosition);
}
const transformImage =  (imagePath ,nameFile ) => {
// Ruta de la imagen PNG


const pathTosend = `C:\\Users\\JUNIOR SILVA\\OneDrive\\Desktop\\proyecto1.1\\semestre9\\INGENIERIA DE SOFTWARE\\WebPageproyect\\new\\webpageproyect\\src\\core\\assets\\images\\`  
// Cargar la imagen
console.log(pathTosend);
sharp(imagePath)
  .toBuffer()
  .then((buffer) => {
    // Crear un archivo SVG básico con un rectángulo
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect x="0" y="0" width="100" height="100" fill="url(#image)" />
        <image id="image" xlink:href="data:image/png;base64,${buffer.toString('base64')}" />
      </svg>
    `;

    // Guardar el contenido SVG en un archivo
    fs.writeFileSync(`${pathTosend}`+`${removeExtension(nameFile)}.svg`, svgContent);
    console.log('Imagen convertida a SVG correctamente.');
  })
  .catch((error) => {
    console.error('Error al convertir la imagen:', error);
  });
}
  module.exports = { transformImage ,transformImage2 , transformImage3 ,moverArchivo }