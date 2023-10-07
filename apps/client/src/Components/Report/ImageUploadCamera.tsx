import React, { useRef, useState, useEffect } from 'react';
import { Group, Button } from '@mantine/core';
import HeaderButton from '../Partial/HeaderButton';
import {Cloudinary} from "@cloudinary/url-gen";
import axios from 'axios';
import { trpc } from "../../lib/trpc";


function ImageUploadCamera(){
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [uploadedUrl, setUploadedUrl] = useState<string>();
  const mutNewReport = trpc.report.new.useMutation()

  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.warn("geolocation not supported");
    }
  }

  function showPosition(position: GeolocationPosition) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  

  async function uploadImage(){
    const formData = new FormData();
    if(capturedImage != ""){
      formData.append("file", capturedImage);
      formData.append("upload_preset", "w9t3unsw")
      let data = "";
      axios.post(
        'https://api.cloudinary.com/v1_1/dygncw193/upload',
        formData).then((res)=> {
          data = res.data["secure_url"];
          setUploadedUrl(data);
          mutNewReport.mutate({
            image: data,
            location: {
              latitude: latitude || 0,
              longitude: longitude || 0
            }
          })
        })
      return data;
    }
  }

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
    setCapturedImage("");
    startCamera();
  };

  useEffect(()=>{
    startCamera();
    getLocation();
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
        <Button onClick={uploadImage} variant="default">Proceed</Button>
      </Group>
    </div>
  );
};

export default ImageUploadCamera;
