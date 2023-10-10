import { useRef, useState, useEffect } from "react";
import { UnstyledButton, Button, Flex, Text, Space } from "@mantine/core";
import HeaderButton from "../../Components/Partial/HeaderButton";
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
import { useLocation } from "../../context/LocationProvider";

function ImageUploadCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [trpcStatus, setTrpcStatus] = useState<
    "pending" | "loading" | "success" | "fail"
  >("pending");
  const [ar, setAr] = useState<number>(1);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const mutNewReport = trpc.report.new.useMutation();
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { latitude, longitude } = useLocation();

  function changeFacingMode() {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  }

  async function uploadImage() {
    console.log(upload_preset, cloud_name);
    console.log(latitude, longitude);
    setTrpcStatus("loading");

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
        setTrpcStatus("fail");
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
        videoRef.current.srcObject = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
        },
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
    startCamera();
  }, [facingMode]);

  return (
    <Flex
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
      <Space h="sm" />
      {trpcStatus === "loading" &&
        "We are looking for lighter fire in the image. Wait..."}
      <Text></Text>
      <Flex align={"center"} justify={"space-evenly"}>
        {!capturedImage ? null : (
          <>
            <UnstyledButton onClick={retry}>
              <IconRotateClockwise size={60} />
            </UnstyledButton>
            <UnstyledButton onClick={uploadImage} variant="default">
              <IconArrowNarrowRight size={60} />
            </UnstyledButton>
          </>
        )}
        {capturedImage ? null : (
          <>
            <UnstyledButton onClick={changeFacingMode} variant="default">
              <IconCameraRotate size={60} />
            </UnstyledButton>
            <UnstyledButton onClick={captureImage} variant="default">
              <IconCamera size={60} />
            </UnstyledButton>
          </>
        )}
      </Flex>
      <Flex>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Modal opened={opened} onClose={close} title="Result">
            <Text c={trpcStatus === "success" ? "green" : "red"}>
              {trpcStatus ? "Upload Successful" : "Upload Failed"}
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
      </Flex>
    </Flex>
  );
}

export default ImageUploadCamera;
