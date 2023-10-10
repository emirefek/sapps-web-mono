from flask import Flask, request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
import torch
import base64
import logging

# from dotenv import load_dotenv
# from dotenv import dotenv_values

# Load YOLOv8 model
model = YOLO("best17.pt")

app = Flask(__name__)


def process_yolo(image):
    frame = cv2.resize(image, (640, 640))
    results = model.predict(
        frame,
        save=True,
        conf=0.20,
        save_conf=True,
        boxes=True,
    )
    # print(results[0])
    # result = score_frame(frame)

    boxes = results[0].boxes
    isBox = len(boxes) > 0  # returns one box
    logging.info(f"isFire: {isBox}")
    # print("isFire", isBox)
    # box.xyxy
    # boxes.xyxy  # box with xyxy format, (N, 4)
    # boxes.xywh  # box with xywh format, (N, 4)
    # boxes.xyxyn  # box with xyxy format but normalized, (N, 4)
    # boxes.xywhn  # box with xywh format but normalized, (N, 4)
    # boxes.conf  # confidence score, (N, 1)
    # boxes.cls  # cls, (N, 1)
    # boxes.data  # raw bboxes tensor, (N, 6) or boxes.boxes .
    # print(box.xyxy)

    # frame, sent_bool = plot_boxes(result, frame)
    # print(sent_bool)

    # cv2.imshow("ekran", frame)
    # cv2.waitKey(5000)
    # cv2.destroyAllWindows()

    return isBox


@app.route("/process_image", methods=["POST"])
def process_image():
    data = request.json
    image_data = data["image"]
    image_bytes = base64.b64decode(image_data)
    image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_UNCHANGED)

    # YOLOv8 processing
    processed = process_yolo(image)

    return jsonify({"success": processed})


@app.route("/test", methods=["GET"])
def test():
    return jsonify({"hello": "World"})


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    from waitress import serve

    serve(app, host="0.0.0.0", port=5000)
    # app.run(host="0.0.0.0", debug=True, port=5000)
