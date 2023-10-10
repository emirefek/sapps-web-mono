FROM nvidia/cuda:12.1.1-runtime-ubuntu22.04

WORKDIR /yolov8

ADD https://ultralytics.com/assets/Arial.ttf /root/.config/Ultralytics/
ADD app.py /yolov8/
ADD best17.pt /yolov8/

RUN apt-get update \
    && apt-get install --no-install-recommends -y libgl1-mesa-glx libglib2.0-0 python3 python3-pip  \
    && pip3 install ultralytics opencv-python flask python-dotenv omegaconf waitress \
    && rm -rf /var/lib/apt/lists/*


# ENTRYPOINT ["yolo"]
ENTRYPOINT ["python3", "./app.py"]

# CMD [ "python3", "./app.py" ]