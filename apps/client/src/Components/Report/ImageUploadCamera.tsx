import React, { useRef, useState, useEffect } from 'react';
import { Group, Button } from '@mantine/core';
import HeaderButton from '../Partial/HeaderButton';
import {v2 as cloudinary} from 
          
cloudinary.config({ 
  cloud_name: 'dygncw193', 
  api_key: '462962765672646', 
  api_secret: 'JL_nPBQZnQ0ynRIltAQ5vVezVhQ' 
});

const ImageUploadCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Set the canvas dimensions to match the video feed
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        // Capture the current frame from the video feed
        context.drawImage(videoRef.current, 0, 0);
        
        // Convert the captured frame to a data URL and set it in the state
        const capturedImageDataUrl = canvasRef.current.toDataURL('image/png');
        setCapturedImage(capturedImageDataUrl);
      }
    }
  };

  const retry = () => {
    setCapturedImage(null);
    startCamera();
  };

  useEffect(()=>{
    startCamera();
  }, [])

  return (
    <div>
      <HeaderButton /> 
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      {capturedImage ? null : <div>
        <video ref={videoRef} autoPlay playsInline />
      </div>}
      <Group justify='flex-end' grow>
       <Button onClick={retry} variant="default">Retry</Button>
        {capturedImage ? null : <Button onClick={captureImage} variant="default">Take Picture</Button>}
        <Button onClick={retry} variant="default">Proceed</Button>
      </Group>
    </div>
  );
};

export default ImageUploadCamera;
