import axios from "axios";
import sharp from "sharp";

export async function ivSendImage(image_url: string) {
  try {
    const response = await axios.get(image_url, {
      responseType: "arraybuffer", // Görüntüyü bir arraybuffer olarak al
    });

    const jpgImageBuffer = await sharp(response.data).jpeg().toBuffer();
    const encodedImage = jpgImageBuffer.toString("base64");

    // const imageBuffer = Buffer.from(response.data, "binary");
    // const encodedImage = imageBuffer.toString("base64");
    // console.log("encodedImage", encodedImage);

    const postResponse = await axios("http://127.0.0.1:5000/process_image", {
      method: "POST",
      data: {
        image: encodedImage,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return postResponse.data.success ? true : false;
  } catch (error) {
    console.error("Error:", error);
  }
}
