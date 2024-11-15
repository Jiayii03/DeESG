## To get input from sensor (every 1 second), run

```bash
cd ~/ethbkk
node DHTsensor.js
```

## To get input from sensor and display on the LCD, run

```bash
cd ~/ethbkk
sudo python3 DHTSensorWithDisplay.py
```

or 

```bash
cd ~/ethbkk
pm2 start DHTSensorWithDisplay.py --name DisplayLCD
```

## To activate server API (local network), run

```bash
cd ~/ethbkk
pm2 start server.js --name "SensorAPI"
```

run `pm2 list` to check if it is running
To test the API, run curl http://greenesis:3000/data (from local network)

## To expose the API endpoint (from Internet), run

```bash
ngrok http 3000
```

Note that this is not running in the background
To test the API, run curl http://.........../data (publicly)

## To run ngrok in the background, run

```bash
pm2 start ./start-ngrok.sh --name ngrok
```

To see what the endpoint is, run

```bash
curl -s http://127.0.0.1:4040/api/tunnels | grep -o 'https://[^"]*'
```

Then run curl http://.............../data (publicly) to get the output






