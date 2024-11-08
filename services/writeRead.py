import gspread
from oauth2client.service_account import ServiceAccountCredentials
import requests
import time

# ESP32 IP address
esp32_ip = "http://192.168.1.157"

# Define the scope
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/spreadsheets", 
         "https://www.googleapis.com/auth/drive.file", 
         "https://www.googleapis.com/auth/drive"
         ]

# Add your service account key file path
creds = ServiceAccountCredentials.from_json_keyfile_name("firstenergy-440004-e93a3721f178.json", scope)

# Authorize the client
client = gspread.authorize(creds)

def writeData():
    pass

def readData():
    analog_value = 923
    dc_voltage = 0.7438
    ac_voltage = 51.5784
    return analog_value, dc_voltage, ac_voltage

def readHistory():
    pass

# Open the Google Sheet by name or by URL
# sheet = client.open("FirstEnergyData").sheet1

# Read data
# data = sheet.get_all_records()
# print(data)

# count = 1

# while True:
#     try:
#         response = requests.get(esp32_ip)
#         print("Received data:", response.text)
#         sheet.update(range_name="A" + str(count), values=[[response.text]])
#         count += 1
#         time.sleep(1)  # Wait for 1 second before polling again
#     except Exception as e:
#         print("Error:", e)
#         time.sleep(5)

# # Read all values from the sheet
# all_values = sheet.get_all_values()

# # Print all values
# for row in all_values:
#     print(row)
