const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/task')
const app = express();

app.use(bodyParser.json());


// ROUTES

app.get('/', (req, res) => {
    res.send('Hello CRUD-API')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// UPDATE A PRODUCT

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// DELETE A PRODUCT

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set('strictQuery',false)

mongoose.connect('mongodb+srv://ruchirbansal2001:raiden07@crud-api.neibzpl.mongodb.net/CRUD-API?retryWrites=true&w=majority&appName=CRUD-API', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    app.listen(3000, () => {
        console.log('CRUD-API is running on port 3000');
    })
    console.log(`Connected to MongoDB`)
}).catch(console.error());


