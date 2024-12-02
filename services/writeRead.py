import gspread
from oauth2client.service_account import ServiceAccountCredentials
import requests
import time
import re


# ESP32 IP address
esp32_ip = "http://192.168.1.157"
pattern = r"[-+]?\d*\.\d+|\d+"

# Define the scope
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/spreadsheets", 
         "https://www.googleapis.com/auth/drive.file", 
         "https://www.googleapis.com/auth/drive"
         ]

# Add your service account key file path
creds = ServiceAccountCredentials.from_json_keyfile_name("firstenergy-440004-48dd166dea73.json", scope)

# Authorize the client
client = gspread.authorize(creds)

# Open the Google Sheet by name or by URL
sheet = client.open("FirstEnergyData").sheet1

def readData():
    pass

def readHistory():
    pass