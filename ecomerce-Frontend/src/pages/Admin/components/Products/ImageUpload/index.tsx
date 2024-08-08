import  UploadPlaceholder from '../../../../../core/assets/images/upload-placeholder.svg';
import { makePrivateRequest } from '../../../../../core/utils/request';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './styles.scss';
import { AxiosProgressEvent } from 'axios';
import imageCompression from 'browser-image-compression';

type Props ={
  onUploadSuccess: (imgUrl: string) => void;
  productImgUrl: string;
}

const ImageUpload = ({onUploadSuccess, productImgUrl}: Props) => {
  console.log(productImgUrl);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const imgUrl = uploadedImgUrl || productImgUrl;
  const [fileName, setFileName] = useState('');
  const onUploadProgress = (progessEvent: AxiosProgressEvent) => {
 // esto esta como mal
    const progress = Math.round((progessEvent.loaded * 100) / progessEvent.bytes);
    setUploadProgress(progress);

  }

  const uploadImage = async (selectedImage: File) => {
    const payload = new FormData();
     payload.append('file', selectedImage,fileName);

     console.log("...p",payload);
    console.log("...p",selectedImage);
    makePrivateRequest({
      url: '/product/image',
      method: 'POST',
      data: payload,
      onUploadProgress 
    })
      .then(response => {
        console.log("la data uri...",response.data);
        setUploadedImgUrl(response.data.uri);
        onUploadSuccess(response.data.uri);
        toast.info('Archivo enviado exitosamente');
      })
      .catch(() => {
        toast.error('Error al enviar archivo');
      })
      .finally(() => setUploadProgress(0))

  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if( event.target.name === 'image'){
    const selectedImage = event.target.files?.[0];
    console.log(selectedImage);
    if (selectedImage) {
      setFileName(selectedImage.name);
        try {
          // Opciones de compresión
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true
          };
          // Comprimir la imagen
          const compressedFile = await imageCompression(selectedImage, options);
         
          uploadImage(compressedFile);
        } catch (error) {
          console.error('Error while compressing image:', error);
        }
      
     
    }
       }
      }
   

      
  return (
    <div className="row">
      <div className="">
        <div className="upload-button-container">
       
          <input
            type="file"
            id="upload"
            name='image'
            accept="image/*"
            onChange={handleChange}
            hidden
          />
          <label htmlFor="upload">AGREGAR IMAGEN</label>

          <small className="upload-text-helper text-primary">
            <br />Las imágenes deben ser JPG o PNG y no deben exceder
            <strong> 5 mb. </strong>
          </small>
        </div>
      </div>
      <div className="upload-placeholder">
        {uploadProgress > 0 && (
          <>
           <img src={UploadPlaceholder}/>
            <div className="upload-progress-container">
              <div
                className="upload-progress"
                style={{ width: `${uploadProgress}%` }}
              >

              </div>
            </div>
          </>
        )}
        {(imgUrl && uploadProgress=== 0) && (
          <img
            src={`https://qxmmzyiseveolkmgrcts.supabase.co/storage/v1/object/public/productImages/public/${imgUrl}`}
            alt={imgUrl}
            className="uploaded-image"
          />
        )}

      </div>
    </div>
  )
}

export default ImageUpload;