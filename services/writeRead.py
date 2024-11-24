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

# Set Count for the day
count = 2

def writeData():
    # # Get the data
    # analog_value, dc_voltage, ac_voltage = readData()
    # analog_value1, dc_voltage1, ac_voltage1 = readData()
    # analog_value2, dc_voltage2, ac_voltage2 = readData()
    # analog_value3, dc_voltage3, ac_voltage3 = readData()
    
    # # Create a list of requests
    # requests = [
    #     {
    #         "range": f"A{count}:C1",
    #         "values": [["Name", "Age", "City"]],
    #     },
    #     {
    #         "range": "A{count}:C2",
    #         "values": [["Bob", "30", "Los Angeles"]],
    #     },
    #     {
    #         "range": "A3:C3",
    #         "values": [["Charlie", "22", "Chicago"]],
    #     }
    # ]

    # # Send to API
    # sheet.batch_update(requests)

    pass

def readData():
    response = requests.get(esp32_ip)
    numbers = re.findall(pattern, response.text)
    analog_value = int(numbers[0])  # First value is an integer
    dc_voltage = float(numbers[1])  # Second value is a float
    ac_voltage = float(numbers[2])  # Third value is a float
    analog_value = 0
    dc_voltage = 0
    ac_voltage = 0
    return analog_value, dc_voltage, ac_voltage

def readHistory():
    data = sheet.get_all_records()
    analog_value = []
    dc_voltage = []
    ac_voltage = []

    for i in data:
        numbers = re.findall(pattern, i['Analog Value: 923, DC Voltage: 0.7438, AC Voltage: 51.5784'])
        analog_value.append(int(numbers[0]))
        dc_voltage.append(float(numbers[1]))
        ac_voltage.append(float(numbers[2]))

    return analog_value, dc_voltage, ac_voltage

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
