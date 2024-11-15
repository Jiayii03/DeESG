import time
import adafruit_dht
import board

# Initialize the DHT11 sensor on GPIO4
dhtDevice = adafruit_dht.DHT11(board.D4)

while True:
    try:
        # Get temperature and humidity readings
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
        print("Temp={0:0.1f}C Humidity={1:0.1f}%".format(temperature, humidity))

    except RuntimeError as error:
        # Handle occasional read errors from the sensor
        print("Error:", error.args[0])

    time.sleep(2)
