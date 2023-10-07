import { useRef, useState, useEffect } from "react";
import { Group, Button } from "@mantine/core";
import HeaderButton from "../Partial/HeaderButton";
import axios from "axios";
import { trpc } from "../../lib/trpc";
import {useNavigate} from "react-router-dom";

function ImageUploadCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const mutNewReport = trpc.report.new.useMutation();
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const navigate = useNavigate();

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

  async function uploadImage() {
    console.log(upload_preset, cloud_name);
    if (capturedImage != "") {
      const resp = await axios({
        url: `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        method: "POST",
        data: JSON.stringify({
          file: capturedImage,
          upload_preset: upload_preset,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp);

      mutNewReport.mutate({
        image: resp.data["secure_url"],
        location: {
          latitude: latitude || 0,
          longitude: longitude || 0,
        },
      });

      navigate("/report");
      return resp.data;
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set the canvas dimensions to match the video feed
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Capture the current frame from the video feed
        context.drawImage(videoRef.current, 0, 0);

        // Convert the captured frame to a data URL and set it in the state
        const capturedImageDataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(capturedImageDataUrl);
      }
    }
  };

  const retry = () => {
    setCapturedImage("");
    startCamera();
  };

  useEffect(() => {
    startCamera();
  }, []);

  useEffect(() => {
    getLocation();    
  }, [longitude, latitude]);

  return (
    <div>
      <HeaderButton />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      {capturedImage ? null : (
        <div>
          <video ref={videoRef} autoPlay playsInline />
        </div>
      )}
      <Group justify="flex-end" grow>
        <Button onClick={retry} variant="default">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
</svg>
        </Button>
        {capturedImage ? null : (
          <Button onClick={captureImage} variant="default">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
   <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
</svg>
          </Button>
        )}
        <Button onClick={uploadImage} variant="default">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 12l14 0"></path>
   <path d="M15 16l4 -4"></path>
   <path d="M15 8l4 4"></path>
</svg>
        </Button>
      </Group>
    </div>
  );
}

export default ImageUploadCamera;
