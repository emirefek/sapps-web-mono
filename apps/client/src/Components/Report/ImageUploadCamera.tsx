import { useRef, useState, useEffect } from "react";
import { Group, Button, UnstyledButton, Flex } from "@mantine/core";
import HeaderButton from "../Partial/HeaderButton";
import axios from "axios";
import { trpc } from "../../lib/trpc";
import { useNavigate } from "react-router-dom";

function ImageUploadCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [ar, setAr] = useState<number>(1);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const mutNewReport = trpc.report.new.useMutation();
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const navigate = useNavigate();

  function changeFacingMode() {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.warn("geolocation not supported");
    }
  }

  function showPosition(position: GeolocationPosition) {
    const coords = position.coords;
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  }

  async function uploadImage() {
    console.log(upload_preset, cloud_name);
    console.log(latitude, longitude);

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

      const resp1 = await mutNewReport.mutateAsync({
        image: resp.data["secure_url"],
        location: {
          latitude: latitude || 0,
          longitude: longitude || 0,
        },
      });
      console.log("trpcMutateResp", resp1);

      navigate("/report");
      return resp.data;
    }
  }

  const startCamera = async () => {
    try {
      // Release the current stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const track = stream.getVideoTracks()[0];
      const { width, height } = track.getSettings();
      const aspectRatio = (width ?? 1) / (height ?? 1);
      setAr(aspectRatio);
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
    getLocation();
  }, []);

  useEffect(() => {
    startCamera();
  }, [facingMode]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0]; // Get the first selected file

    if (selectedFile) {
      // Create a FileReader
      const reader = new FileReader();

      // Define a callback function for when the FileReader has finished reading the file
      reader.onload = (e) => {
        // e.target.result contains the data URL
        const dataURL = e.target?.result as string;
        setCapturedImage(dataURL);
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Flex
      align={"flex-start"}
      justify={"space-between"}
      direction={"column"}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <HeaderButton />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {capturedImage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            aspectRatio: ar,
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={capturedImage}
            alt="Captured"
          />
        </div>
      )}
      {capturedImage ? null : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            aspectRatio: ar,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      )}
      <Group justify="flex-end" grow>
        {!capturedImage ? null : (
          <>
            <Button onClick={retry} variant="danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-rotate-clockwise"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
              </svg>
            </Button>
            <Button onClick={uploadImage} variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-arrow-narrow-right"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l14 0"></path>
                <path d="M15 16l4 -4"></path>
                <path d="M15 8l4 4"></path>
              </svg>
            </Button>
          </>
        )}
        {capturedImage ? null : (
          <>
            <Button onClick={changeFacingMode} variant="default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-camera-rotate"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
                <path d="M11.245 15.904a3 3 0 0 0 3.755 -2.904m-2.25 -2.905a3 3 0 0 0 -3.75 2.905"></path>
                <path d="M14 13h2v2"></path>
                <path d="M10 13h-2v-2"></path>
              </svg>
            </Button>
            <Button onClick={captureImage} variant="default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-camera"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
                <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              </svg>
            </Button>
          </>
        )}
        <input
          type="file"
          accept="image/*" // Define accepted file types if needed
          onChange={handleFileChange}
          style={{ display: "none" }}
        ></input>
      </Group>
    </Flex>
  );
}

export default ImageUploadCamera;
