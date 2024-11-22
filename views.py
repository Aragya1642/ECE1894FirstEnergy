from flask import Blueprint, render_template, jsonify
from services import writeRead

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/api/data")
def get_data():
    # Fetch data using your existing Python script function
    analog_value, dc_voltage, ac_voltage = writeRead.readData()
    
    # Return the data as a JSON response
    return jsonify({
        "analog_value": analog_value,
        "dc_voltage": dc_voltage,
        "ac_voltage": ac_voltage
    })

@views.route("/api/history")
def get_history():
    # Fetch historical data
    analog_value, dc_voltage, ac_voltage = writeRead.readHistory()
    history = [
        {"analog_value": analog_value},
        {"dc_voltage": dc_voltage},
        {"ac_voltage": ac_voltage}
    ]
    return jsonify(history)