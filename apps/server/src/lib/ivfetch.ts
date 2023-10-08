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

    if (!process.env.PYTHON_AI_URL) {
      throw new Error("PYTHON_AI_URL is undefined");
    }

    const postResponse = await axios(process.env.PYTHON_AI_URL, {
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
