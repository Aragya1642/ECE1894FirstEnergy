#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>

// WiFi Credentials
const char ssid[] = "xxx";
const char password[] = "xxx";

// Create a web server
WebServer server(80);

// TODO: Declare Pins Here

// Function to get WiFi connection info
void printWifiStatus() {
  // Print Successful Connection
  Serial.println("Connected to the Wifi!");
  
  // print the SSID of the network you're attached to:
  Serial.print("\nSSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void handleRoot() {
  // read the analog / millivolts value for pin 2:
  int analogValue = analogRead(A2);
  // Do mapping from adc input to dc voltage
  float analogVolts = (analogValue/4095.0) * 3.3; 
  // Do mapping from dc voltage to ac voltage
  float acVoltage = (analogVolts + 0.2826)/0.0199;

  String message = "Analog Value: " + String(analogValue) + 
                   ", DC Voltage: " + String(analogVolts, 4) + 
                   ", AC Voltage: " + String(acVoltage, 4);
  server.send(200, "text/plain", message);

  // print out the values you read:
  // Serial.printf("ADC analog value = %d\n",analogValue);
  // Serial.println(analogVolts, 5);
  // Serial.println(acVoltage, 5);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

void setup() {
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  
  // setup Wi-Fi network with SSID and password
  Serial.printf("Connecting to %s\n", ssid);
  Serial.printf("\nattempting to connect to WiFi network SSID '%s' password '%s' \n", ssid, password);

  // attempt to connect to Wifi network:
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(500);
  }
  printWifiStatus();

  // Define routes
  server.on("/", HTTP_GET, handleRoot);
  server.begin();
  Serial.println("Server started");

  //set the resolution to 12 bits (0-4096)
  analogReadResolution(12);
}

bool alreadyConnected = false;  // whether or not the client was connected previously

void loop() {
  // Handle client requests
  server.handleClient();
}