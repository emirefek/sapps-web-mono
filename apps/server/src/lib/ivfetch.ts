import axios from "axios";

export async function ivSendImage(image_url: string) {
  try {
    const postResponse = await axios(process.env.RUNPOD_URL + "/runsync", {
      method: "POST",
      data: {
        input: {
          image: image_url,
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.RUNPOD_KEY,
      },
    });
    console.log("postResponse", postResponse.data);

    return postResponse.data.output === true ? true : false;
  } catch (error) {
    console.error("Error:", error);
  }
}
