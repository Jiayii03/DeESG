const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

let dummyData = generateRandomData();
let sensorData = null;  // Cached sensor data

// Function to generate random emissions data
function generateRandomData() {
    return {
        CO2_emissions: Math.max(0, Math.round(getRandomValue(50000, 10000))),
        methane_emissions: Math.max(0, Math.round(getRandomValue(1000, 200))),
        NOx_emissions: Math.max(0, Math.round(getRandomValue(500, 100))),
        PM_emissions: Math.max(0, Math.round(getRandomValue(200, 50))),
    };
}

// Function to generate random value based on mean and standard deviation
function getRandomValue(mean, stdDev) {
    const u = 1 - Math.random();
    const v = Math.random();
    const randomStdNormal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return mean + stdDev * randomStdNormal;
}

// Update dummy emissions data every second
setInterval(() => {
    dummyData = generateRandomData();
}, 1000);

// Read sensor data periodically (e.g., every 1 second)
setInterval(() => {
    exec('python3 read_dht11.py', (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Sensor Error: ${error ? error.message : stderr}`);
            sensorData = { error: 'Failed to read sensor data' };
            return;
        }

        try {
            // Parse the JSON output from the Python script
            sensorData = JSON.parse(stdout);
        } catch (parseError) {
            console.error(`JSON Parse Error: ${parseError.message}`);
            sensorData = { error: 'Invalid sensor data format' };
        }
    });
}, 1000);

// API endpoint to serve both emissions data and cached sensor data
app.get('/data', (req, res) => {
    const combinedData = {
        ...dummyData,  // emissions data
        ...sensorData  // cached temperature and humidity data
    };
    res.json(combinedData);
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
