from sklearn.neighbors import KNeighborsClassifier
import cv2
import pickle
import numpy as np
import os
import csv
import time
from datetime import datetime
from win32com.client import Dispatch

# Function to trigger voice feedback
def speak(str1):
    speak = Dispatch("SAPI.SpVoice")
    speak.Speak(str1)

# Initialize video capture and face detection
video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')

# Load pre-trained face data and labels
with open('data/names.pkl', 'rb') as w:
    LABELS = pickle.load(w)
with open('data/faces_data.pkl', 'rb') as f:
    FACES = pickle.load(f)

print('Shape of Faces matrix --> ', FACES.shape)

# Train the KNN classifier
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(FACES, LABELS)

# Load the background image
imgBackground = cv2.imread("background.png")

# Column names for the attendance CSV (added 'DATE' as a column)
COL_NAMES = ['NAME', 'TIME', 'DATE']

# Dictionary to store the last attendance time for each person
last_attendance_time = {}

# Function to take attendance
def take_attendance(output):
    current_time = time.time()
    person_name = str(output[0])

    # Check if the person has been recorded in the last 5 seconds
    if person_name in last_attendance_time:
        elapsed_time = current_time - last_attendance_time[person_name]
        if elapsed_time < 5:
            return False  # Skip attendance if less than 5 seconds have passed

    # Prepare timestamp and attendance info
    date = datetime.fromtimestamp(current_time).strftime("%d-%m-%Y")
    timestamp = datetime.fromtimestamp(current_time).strftime("%H:%M-%S")
    attendance = [person_name, str(timestamp), str(date)]  # Added date to the attendance

    # Check if the attendance file for the day exists
    attendance_file = f"Attendance/Attendance_{date}.csv"
    exist = os.path.isfile(attendance_file)

    # Save attendance
    with open(attendance_file, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if not exist:  # If file does not exist, write column names
            writer.writerow(COL_NAMES)
        writer.writerow(attendance)

    # Update the last attendance time for the person
    last_attendance_time[person_name] = current_time

    speak(f"Thank Your {person_name}")  # Voice feedback
    return True  # Return true after attendance is taken


while True:
    ret, frame = video.read()  # Read frame from video
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    faces = facedetect.detectMultiScale(gray, 1.3, 5)  # Detect faces

    # For each detected face, predict the label
    for (x, y, w, h) in faces:
        crop_img = frame[y:y+h, x:x+w, :]  # Crop the face from the frame
        resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)  # Resize and flatten
        output = knn.predict(resized_img)  # Predict using the trained KNN model

        # Automatically take attendance when a person is detected (with 5-second gap)
        take_attendance(output)  # Automatically log attendance

        # Draw the face box and label on the frame
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 1)
        cv2.rectangle(frame, (x, y-40), (x+w, y), (50, 50, 255), -1)
        cv2.putText(frame, str(output[0]), (x, y-15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)

        # If 'q' key is pressed, break the loop
        k = cv2.waitKey(1)
        if k == ord('q'):
            break

    # Overlay the frame on the background image and display
    imgBackground[162:162 + 480, 55:55 + 640] = frame
    cv2.imshow("Frame", imgBackground)

# Release the video capture and close windows
video.release()
cv2.destroyAllWindows()

