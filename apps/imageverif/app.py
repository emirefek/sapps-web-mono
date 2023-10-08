from flask import Flask, request, jsonify
import cv2
import numpy as np
from random import randint
import base64


import torch
import numpy as np
import cv2
from time import time
import os


model = torch.hub.load(
    "ultralytics/yolov5", "custom", path="best.pt", force_reload=True
)
classes = ["fire"]
device = "cuda" if torch.cuda.is_available() else "cpu"


def your_yolo_function(image):
    def plot_boxes(results, frame):
        boolen_value = False

        labels, cord = results
        n = len(labels)
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.1:
                x1, y1, x2, y2 = (
                    int(row[0] * x_shape),
                    int(row[1] * y_shape),
                    int(row[2] * x_shape),
                    int(row[3] * y_shape),
                )
                bgr = (0, 255, 0)
                cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                cv2.putText(
                    frame, "fire", (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2
                )
                boolen_value = True

        return frame, boolen_value

    def score_frame(frame):
        model.to(device)
        frame = [frame]
        results = model(frame)
        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord

    # model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=True)
    # classes = ["fire"]
    # device = 'cuda' if torch.cuda.is_available() else 'cpu'

    print("merhaba dünya")

    # frame =cv2.imread("photo_odev_line15.jpg")
    frame = cv2.resize(image, (640, 640))
    result = score_frame(frame)

    frame, sent_bool = plot_boxes(result, frame)
    print(sent_bool)

    cv2.imshow("ekran", frame)
    cv2.waitKey(5000)
    cv2.destroyAllWindows()

    return sent_bool


app = Flask(__name__)


@app.route("/process_image", methods=["POST"])
def process_image():
    data = request.json
    image_data = data["image"]
    print(image_data[:10] + image_data[-10:])

    image_bytes = base64.b64decode(image_data)
    image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_UNCHANGED)

    # YOLO işlemleri
    processed = your_yolo_function(
        image
    )  # YOLO işlemlerini gerçekleştiren fonksiyonunuzu çağırın
    # cv2.imshow("image",image)
    return jsonify({"success": processed})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)
