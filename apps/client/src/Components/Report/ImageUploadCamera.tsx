import { useRef, useState, useEffect } from "react";
import { Group, Button, Flex, Text } from "@mantine/core";
import HeaderButton from "../Partial/HeaderButton";
import axios from "axios";
import { trpc } from "../../lib/trpc";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconRotateClockwise,
  IconArrowNarrowRight,
  IconCameraRotate,
  IconCamera,
} from "@tabler/icons-react";

function ImageUploadCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [trpcSuccessful, setTrpcSuccessful] = useState<boolean>(true);
  const [ar, setAr] = useState<number>(1);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const mutNewReport = trpc.report.new.useMutation();
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [opened, { open, close }] = useDisclosure(false);
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

      const respStatus = resp1.status;
      if (respStatus) {
        open();
      }

      if (respStatus === "REJECTED" || respStatus === "PENDING") {
        setTrpcSuccessful(false);
      }
      // navigate("/report");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            <Button leftSection={<IconRotateClockwise />} onClick={retry} variant="default"/>
            <Button leftSection={<IconArrowNarrowRight />} onClick={uploadImage} variant="default" />
          </>
        )}
        {capturedImage ? null : (
          <>
            <Button leftSection={<IconCameraRotate />} onClick={changeFacingMode} variant="default" />
            <Button leftSection={<IconCamera />} onClick={captureImage} variant="default" />
          </>
        )}
        <input
          type="file"
          accept="image/*" // Define accepted file types if needed
          onChange={handleFileChange}
          style={{ display: "none" }}
        ></input>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Modal opened={opened} onClose={close} title="Result">
            <Text c="red">
              {trpcSuccessful ? "Upload Successful" : "Upload Failed"}
            </Text>
            <Button
              onClick={() => {
                navigate("/report", { replace: true });
              }}
            >
              Go Back to Main Page
            </Button>
          </Modal>
        </div>
      </Group>
    </Flex>
  );
}

export default ImageUploadCamera;
