import time
import requests
import lgpio

# Define the GPIO pins for the LCD
LCD_RS = 26
LCD_EN = 19
LCD_D4 = 13
LCD_D5 = 6
LCD_D6 = 5
LCD_D7 = 11

# Define LCD constants
LCD_WIDTH = 16  # Maximum characters per line
LCD_LINE_1 = 0x80  # Address for the 1st line
LCD_LINE_2 = 0xC0  # Address for the 2nd line
E_PULSE = 0.0005
E_DELAY = 0.0005

# Set up lgpio for the LCD
gpio = lgpio.gpiochip_open(0)
lgpio.gpio_claim_output(gpio, LCD_RS)
lgpio.gpio_claim_output(gpio, LCD_EN)
lgpio.gpio_claim_output(gpio, LCD_D4)
lgpio.gpio_claim_output(gpio, LCD_D5)
lgpio.gpio_claim_output(gpio, LCD_D6)
lgpio.gpio_claim_output(gpio, LCD_D7)

def lcd_byte(bits, mode):
    """Send byte to data pins."""
    lgpio.gpio_write(gpio, LCD_RS, mode)  # RS

    # High bits
    lgpio.gpio_write(gpio, LCD_D4, bits & 0x10 == 0x10)
    lgpio.gpio_write(gpio, LCD_D5, bits & 0x20 == 0x20)
    lgpio.gpio_write(gpio, LCD_D6, bits & 0x40 == 0x40)
    lgpio.gpio_write(gpio, LCD_D7, bits & 0x80 == 0x80)
    lcd_toggle_enable()

    # Low bits
    lgpio.gpio_write(gpio, LCD_D4, bits & 0x01 == 0x01)
    lgpio.gpio_write(gpio, LCD_D5, bits & 0x02 == 0x02)
    lgpio.gpio_write(gpio, LCD_D6, bits & 0x04 == 0x04)
    lgpio.gpio_write(gpio, LCD_D7, bits & 0x08 == 0x08)
    lcd_toggle_enable()

def lcd_toggle_enable():
    """Pulse the enable pin."""
    time.sleep(E_DELAY)
    lgpio.gpio_write(gpio, LCD_EN, 1)
    time.sleep(E_PULSE)
    lgpio.gpio_write(gpio, LCD_EN, 0)
    time.sleep(E_DELAY)

def lcd_init():
    """Initialize the display."""
    lcd_byte(0x33, 0)  # Initialize
    lcd_byte(0x32, 0)  # Set to 4-bit mode
    lcd_byte(0x06, 0)  # Cursor move direction
    lcd_byte(0x0C, 0)  # Turn cursor off
    lcd_byte(0x28, 0)  # 2-line display
    lcd_byte(0x01, 0)  # Clear display
    time.sleep(E_DELAY)

def lcd_string(message, line):
    """Send string to display."""
    message = message.ljust(LCD_WIDTH, " ")
    lcd_byte(line, 0)
    for char in message:
        lcd_byte(ord(char), 1)

def fetch_sensor_data():
    """Fetch sensor data from the localhost API."""
    try:
        response = requests.get('http://localhost:3000/data', timeout=1)
        if response.status_code == 200:
            data = response.json()
            temperature = data.get("temperature")
            humidity = data.get("humidity")
            if temperature is not None and humidity is not None:
                # Display temperature and humidity on the LCD
                lcd_string(f"Temp: {temperature:.1f}C", LCD_LINE_1)
                lcd_string(f"Hum:  {humidity:.1f}%", LCD_LINE_2)
                print(f"Temperature: {temperature}C, Humidity: {humidity}%")
            else:
                print("Incomplete data received")
                lcd_string("Incomplete data", LCD_LINE_1)
                lcd_string("Received", LCD_LINE_2)
        else:
            print("Error fetching data from API")
            lcd_string("API Error", LCD_LINE_1)
    except requests.RequestException as error:
        print(f"Error: {error}")
        lcd_string("API Error", LCD_LINE_1)

# Initialize the LCD
lcd_init()

# Main loop to fetch and display sensor data every second
try:
    while True:
        fetch_sensor_data()
        time.sleep(1)  # Wait for 1 second before fetching data again
except KeyboardInterrupt:
    print("Program stopped by user.")
finally:
    # Clean up and turn off the LCD display
    lcd_string("Shutting down...", LCD_LINE_1)
    time.sleep(1)
    lcd_byte(0x01, 0)  # Clear display
    lgpio.gpiochip_close(gpio)
