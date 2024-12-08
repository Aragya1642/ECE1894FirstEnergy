import gspread
from oauth2client.service_account import ServiceAccountCredentials
import requests
import time
import re
from flask import jsonify

# ESP32 IP address
# esp32_ip = "http://192.168.1.157"
esp32_ip = "http://192.168.1.101"
pattern = r"[-+]?\d*\.\d+|\d+"

# Define the scope
# scope = ["https://spreadsheets.google.com/feeds",
#          "https://www.googleapis.com/auth/spreadsheets", 
#          "https://www.googleapis.com/auth/drive.file", 
#          "https://www.googleapis.com/auth/drive"
#          ]

# Add your service account key file path
# creds = ServiceAccountCredentials.from_json_keyfile_name("firstenergy-440004-e93a3721f178.json", scope)

# Authorize the client
# client = gspread.authorize(creds)

# Open the Google Sheet by name or by URL
# sheet = client.open("FirstEnergyData").sheet1

def readData():
    try:
        response = requests.get(esp32_ip)
        numbers = re.findall(pattern, response.text)
        analog_value = int(numbers[0])  # First value is an integer
        dc_voltage = float(numbers[1])  # Second value is a float
        ac_voltage = float(numbers[2])  # Third value is a float
        return analog_value, dc_voltage, ac_voltage
    except Exception as e:
        return 0, 0, "error"

def writeData(time, ac_voltage):
    try:
        # Prepare the data to send to Google Sheets (time and ac_voltage)
        values = [
            [time, ac_voltage]
        ]

        # Append the new row to the sheet
        # sheet.append_row(values[0])

        # Return a success response
        # return jsonify({'status': 'success', 'message': 'Data successfully written to Google Sheets'}), 200
    
    except Exception as e:
        # Return error response if something goes wrong
        # return jsonify({'status': 'error', 'message': str(e)}), 500
        pass

def readHistory():
    pass