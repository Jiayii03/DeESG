import lgpio
import time

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
ENABLE = 0b00000100  # Enable bit
E_PULSE = 0.0005
E_DELAY = 0.0005

# Set up lgpio
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

# Initialize display
lcd_init()

# Display message
lcd_string("Greenesis!", LCD_LINE_1)
lcd_string("Using lgpio", LCD_LINE_2)

# Cleanup
time.sleep(5)
lgpio.gpiochip_close(gpio)
