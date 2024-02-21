/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { storage, app } from '../../../utils/firebase';
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import donationImage from '../../../apis/donate/donationImageVerify';
import  { useNavigate } from 'react-router-dom'
const CameraCapture = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [firebaseImageUrl, setFirebaseImageUrl] = useState(null);
  const [objectID , setobjectId] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const objectIDD = localStorage.getItem('objectID');
    setobjectId(objectIDD)
  },[])

  const videoRef = React.useRef();
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const uploadToFirebase = async () => {
    try {
      const storageRef = ref(storage, `images/${Date.now()}.png`);
      await uploadString(storageRef, capturedImage, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);
      setFirebaseImageUrl(imageUrl);
      
      const response = await donationImage({ objectID, imageUrl })
      console.log(response)
      if(response.data!==null){
        navigate('/ngo/thankyou')
      }

    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {capturedImage ? (
        <div>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          <br />
          <button style={{ width: '200px', marginTop: '10px' }} onClick={() => setCapturedImage(null)}>Retake</button>
          <button style={{ width: '200px', marginTop: '10px' }} onClick={uploadToFirebase}>Upload</button>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay style={{ maxWidth: '100%', maxHeight: '400px' }} />
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '200px' }}>
            <button style={{ width: '200px' }} onClick={startCamera}>Start Camera</button>
            <button style={{ width: '200px', marginTop: '10px' }} onClick={captureImage}>Take Picture</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;