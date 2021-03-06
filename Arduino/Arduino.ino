
#include <SPI.h>
#include <WiFiNINA.h>
#include <ArduinoJson.h>
#include <RTCZero.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_AM2315.h>
#include <SD.h>

#include "arduino_secrets.h"

#define TCAADDR 0x70

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)

int status = WL_IDLE_STATUS;
WiFiServer server(80);

RTCZero rtc;

int tzAdjust = -5;
int timerLow = 32;
int timerHigh = 80;
float tempLight, rhLight, tempShade, rhShade;
String mode = "NORMAL";
int timeIndex = 0;
float soilVWC = -1;
float uvIndex = -1;
char fileXfer[3] = "00";

Adafruit_AM2315 am2315;

File sdFile;

void setup() {
  
  Serial.begin(9600);      // initialize serial communication
  delay(2000);
  pinMode(6, OUTPUT);      // set the LED pin mode
  pinMode(10, OUTPUT);     // needed for SD library

  Serial.println("Initializing SD card... ");

  // get timerLow and timerHigh from SD card
  if (SD.begin(4)) {
    sdFile = SD.open("timerLow.txt");
    sdFile.read(fileXfer, 2);
    sdFile.close();
  
    timerLow = fileXfer[0] - '0';
    timerLow = timerLow*10;
    timerLow += fileXfer[1] - '0';
  
    sdFile = SD.open("timerOff.txt");
    sdFile.read(fileXfer, 2);
    sdFile.close();
    
    timerHigh = fileXfer[0] - '0';
    timerHigh = timerHigh*10;
    timerHigh += fileXfer[1] - '0';
  }
  else {
    Serial.println("Initialization failed");
  }

  wifiInit(); // Initialize Wifi

  setClock(); // Set RTC clock
  calcTimeIndex();

  // Initialize AM2315 on multiplexer channel 2
  tcaSelect(2, 2000);
  if (! am2315.begin()) {
     Serial.println("Sensor 2 not found, check wiring & pullups!");
     while (1);
  }
  
  //Initialize AM2315 on multiplexer channel 7
  tcaSelect(7, 2000);
  if (! am2315.begin()) {
     Serial.println("Sensor 7 not found, check wiring & pullups!");
     while (1);
  }
} // end of setup()


void loop() {

  // Check for wifi, if not connected reconnect and set clock
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.end();
    wifiInit();
    setClock();
  }
  
  // Check time and toggle light accordingly
  if (mode != "TIMEROVERRIDE") {
    calcTimeIndex();
    if (timeIndex >= timerLow && timeIndex < timerHigh) {
      digitalWrite(6, HIGH);
    }
    else {
      digitalWrite(6, LOW);
    }
  }

  // Read VH400 soil humidity sensor
  readVH400();

  // Read UV light sensor
  readUV();

  // Read AM2315's. Only reading every minute on the :30 since the AM2315's are so slow
  // Should dig into AM2315 to see if I can speed this up.
  if (rtc.getSeconds() == 30) {
    Serial.println("Reading temp/rh sensor 2...");
    tcaSelect(2, 2000);
    if (! am2315.readTemperatureAndHumidity(&tempLight, &rhLight)) {
      Serial.println("Failed to read data from AM2315 2");
      tempLight = -1;
      rhLight = -1;
    }
    Serial.print("(2) Temp *C: "); Serial.println(tempLight);
    Serial.print("(2) Hum %: "); Serial.println(rhLight);

    Serial.println("Reading temp/rh sensor 7...");
    tcaSelect(7, 2000);
    if (! am2315.readTemperatureAndHumidity(&tempShade, &rhShade)) {
      Serial.println("Failed to read data from AM2315 7");
      tempShade = -1;
      rhShade = -1;
    }
    Serial.print("(7) Temp *C: "); Serial.println(tempShade);
    Serial.print("(7) Hum %: "); Serial.println(rhShade);
    Serial.println();
  }
  
  WiFiClient client = server.available();   // listen for incoming clients
  if (client) {                             // if you get a client,
    delay(200);
    Serial.println("new client");           // print a message out the serial port
    String currentLine = "";                // make a String to hold incoming data from the client
    StaticJsonDocument<300> jsonDoc;        // JSON document for output
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();             // read a byte, then
        //Serial.write(c);                    // print it out the serial monitor
        if (c == '\n') {                    // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Access-Control-Allow-Origin: *");
            client.println("Content-type:text/html");
            client.println("");

            // the content of the HTTP response follows the header:

            // Assemble JSON items
            if(digitalRead(6)) {
              jsonDoc["lightStatus"] = "ON";
            } else {
              jsonDoc["lightStatus"] = "OFF";
            }
            jsonDoc["timerLow"] = timerLow;
            jsonDoc["timerHigh"] = timerHigh;
            String hours = String(rtc.getHours());
            if (hours.length() < 2) {
              hours = "0" + hours;
            }
            String minutes = String(rtc.getMinutes());
            if (minutes.length() < 2) {
              minutes = "0" + minutes;
            }
            String seconds = String(rtc.getSeconds());
            if (seconds.length() < 2) {
              seconds = "0" + seconds;
            }
            jsonDoc["time"] = hours + ":" + minutes + ":" + seconds;
            
            jsonDoc["mode"] = mode;

            jsonDoc["tempLight"] = tempLight;
            jsonDoc["rhLight"] = rhLight;
            jsonDoc["tempShade"] = tempShade;
            jsonDoc["rhShade"] = rhShade;
            jsonDoc["tzAdjust"] = tzAdjust;
            jsonDoc["soilVWC"] = soilVWC;
            jsonDoc["uvIndex"] = uvIndex;


            // Send JSON to client
            serializeJson(jsonDoc, client);
            
            // The HTTP response ends with another blank line:
            client.println();
            // break out of the while loop:
            break;
          } else {    // if you got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }

        // Parse client request:
        if (currentLine.endsWith("GET /LIGHT-ON")) {
          digitalWrite(6, HIGH);               
          Serial.println("Light on");
        }
        
        if (currentLine.endsWith("GET /LIGHT-OFF")) {
          digitalWrite(6, LOW);                
          Serial.println("Light off");
        }
        
        if (currentLine.startsWith("GET") && currentLine.endsWith("SETTIMER")) {
          
          // Get timerLow value from URL and store in timerLow
          String strTimerLow = currentLine.substring(5, 7); // ON time is chars 5 and 6
          timerLow = strTimerLow.toInt();

          // Write timerLow value to SD card
          fileXfer[0] = currentLine[5];
          fileXfer[1] = currentLine[6];
          sdFile = SD.open("timerLow.txt", O_READ | O_WRITE | O_CREAT | O_TRUNC);
          sdFile.write(fileXfer);
          sdFile.close();

          //Get timerHigh value from URL and store in timerHigh
          String strTimerHigh = currentLine.substring(8, 10); // OFF time is chars 8 and 8
          timerHigh = strTimerHigh.toInt();
          
          // Write timerHigh value to SD card
          fileXfer[0] = currentLine[8];
          fileXfer[1] = currentLine[9];
          sdFile = SD.open("timerOff.txt", O_READ | O_WRITE | O_CREAT | O_TRUNC);
          sdFile.write(fileXfer);
          sdFile.close();

          mode = "NORMAL";
          
        }

        if (currentLine.startsWith("GET") && currentLine.endsWith("SETCLOCK")) {
          String tzOffsetStr = currentLine.substring(5, 7); // time zone offset is chars 5 and 6
          tzAdjust = tzOffsetStr.toInt() - 12;
          setClock();
        }

        if (currentLine.endsWith("GET /TIMERSET")) {
          mode = "TIMERSET";
        }

        if (currentLine.endsWith("GET /TIMEROVERRIDE")) {
          mode = "TIMEROVERRIDE";
        }

        if (currentLine.endsWith("GET /DIAGNOSTIC")) {
          mode = "DIAGNOSTIC";
        }
        
        if (currentLine.endsWith("GET /NORMAL")) {
          mode = "NORMAL";
        }  
      }
    }
    
    // close the connection:
    client.stop();
  }
}

// sets RTC clock using network time, adjusted locally for time zone
void setClock() {
  rtc.begin();
  unsigned long epoch;
  epoch = WiFi.getTime();
  rtc.setEpoch(epoch + tzAdjust*3600);
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

// Parses time into 15 minutes chunks: i.e. midnight = time index 0, 01:00 = time index 4, 12:00 = time index 48, etc
// This just makes the UI easier, as there's no real reason to set the timer in any finer than 15 minute increments
void calcTimeIndex() {
  timeIndex = rtc.getHours()*4 + rtc.getMinutes()/15;
}

// Selects which channel to use on the I2C multiplexer. This only seems to work for me for the AM2315's if
// I put a 2 second delay in, otherwise it will only recongize the first AM2315 and never establish communication
// with the 2nd AM2315
void tcaSelect(uint8_t i, int d) {
  if (i > 7) return;
  Wire.begin();
  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << i);
  Wire.endTransmission();
  delay(d);
}

// Read VH400 sensor and apply lookup table to raw analog sensor output
void readVH400() { 
  int rawAnalogRead = analogRead(1);
  float voltageRead = rawAnalogRead*3.3/1023;
  if (voltageRead <= 1.1) {
    soilVWC = 10*voltageRead - 1;
  } else if (voltageRead <= 1.3) {
    soilVWC = 25*voltageRead - 17.5;
  } else if (voltageRead <= 1.82) {
    soilVWC = 48.08*voltageRead - 47.5;
  } else if (voltageRead <= 2.2) {
    soilVWC = 26.32*voltageRead - 7.89;
  } else {
    soilVWC = 62.5*voltageRead - 87.5;
  }
  if (soilVWC > 100) {
    soilVWC = 100;
  }
}

// Read UV sensor and convert raw analog output to UV index
void readUV() {
  int rawAnalogRead = analogRead(6);
  float voltageRead = rawAnalogRead*3.3/1023;
  uvIndex = voltageRead * 10;
}

// Connects to wifi network
void wifiInit() {
  Serial.println("Wifi init");
  delay(1000);
  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to Wifi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);                   // print the network name (SSID);

    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);
    // wait 10 seconds for connection:
    delay(5000);
  }
  server.begin();                           // start the web server on port 80
  printWifiStatus();                        // you're connected now, so print out the status
}
