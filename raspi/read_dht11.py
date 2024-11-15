import time
import adafruit_dht
import board
import json

# Initialize the DHT11 sensor on GPIO4
dhtDevice = adafruit_dht.DHT11(board.D4)

try:
    # Get temperature and humidity readings
    temperature = dhtDevice.temperature
    humidity = dhtDevice.humidity

    # Output the readings as JSON
    print(json.dumps({
        "humidity": humidity,
        "temperature": temperature
    }))

except RuntimeError as error:
    print(json.dumps({
        "error": str(error)
    }))

finally:
    # Clean up the sensor to avoid any resource issues
    dhtDevice.exit()
