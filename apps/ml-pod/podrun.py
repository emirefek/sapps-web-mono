import cv2
import numpy as np
from ultralytics import YOLO
import torch
import logging
import runpod
import requests
from PIL import Image
from io import BytesIO

# Load YOLOv8 model
model = YOLO("best17.pt")


def process_yolo(image):
    frame = cv2.resize(image, (640, 640))
    results = model.predict(
        frame,
        save=True,
        conf=0.20,
        save_conf=True,
        boxes=True,
    )

    boxes = results[0].boxes
    isBox = len(boxes) > 0
    logging.info(f"isFire: {isBox}")

    return isBox


def handler(job):
    job_input = job["input"]
    image_url = job_input["image"]

    # Download the image from the URL
    response = requests.get(image_url)
    response.raise_for_status()  # Check if the request was successful

    # Open the image using PIL
    image = Image.open(BytesIO(response.content))

    # If the image is in PNG format, convert it to JPG
    if image.format == "PNG":
        image = image.convert("RGB")

    # Convert the PIL Image to a NumPy array (and hence to OpenCV format)
    image_np = np.array(image)

    # Now image_np can be passed to your process_yolo function
    resp = process_yolo(image_np)

    return resp  # or return whatever you need to


runpod.serverless.start({"handler": handler})
