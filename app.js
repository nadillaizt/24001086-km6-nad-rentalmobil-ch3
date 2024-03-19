const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Path to cars.json file
const carsFilePath = './data/cars.json';

// Read car data from cars.json file
let cars = JSON.parse(fs.readFileSync(carsFilePath, 'utf-8'));

// GET list of cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET a single car data by ID
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (!car) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        res.json(car);
    }
});

// POST car data
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    // Write back car data to cars.json file
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
    res.json(newCar);
});

// PUT update car data by ID
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        cars[index] = { ...cars[index], ...updatedCar };
        // Write back car data to cars.json file
        fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
        res.json(cars[index]);
    }
});

// DELETE car data by ID
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        const deletedCar = cars.splice(index, 1);
        // Write back car data to cars.json file
        fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
        res.json(deletedCar[0]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
