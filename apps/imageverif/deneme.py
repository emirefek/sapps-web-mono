import cv2
from ultralytics import YOLO

print("deneme")
model = YOLO("best17.pt")
cap = cv2.VideoCapture(0)


while True:
    ret, frame = cap.read()

    results = model.track(frame, persist=True)
    frame_ = results[0].plot()

    cv2.imshow("frame", frame_)

    if cv2.waitKey(15) & 0xFF == ord("q"):
        break
cap.release()
cv2.destroyAllWindows()
