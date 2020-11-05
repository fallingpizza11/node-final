//By Isaac Giuricich

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs')

const priceCalc = require('../price-calc')
const calculator = new priceCalc()


const Order = require('../models/order');

// online server
const mongoDB = 'mongodb+srv://admin:admin@cluster0.vzaf6.mongodb.net/A00956627?retryWrites=true&w=majority'

// local server  mongodb://localhost/A00956627
// const mongoDB = 'mongodb://localhost/A00956627'


mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
  console.log('connected to database!')
})

router.get('/history', isLoggedIn, async (req, res) => {
  try {
    const orderHistory = await Order.find({username: req.user.username})
    res.json(orderHistory)
  } catch (err) {
    res.send('there has been an error finding the order history' + err)
  }
})


// getting order back from the database
router.get('/:orderId', isLoggedIn, async function(req, res, next) {
  try {
    // returns specific order from the 'order collection'
    const gotOrders = await Order.findById(req.params.orderId)
    res.json(gotOrders)
  } catch (err) {
    res.send('there has been an error finding the collection: ' + err)
  }
});

// sending order to the database
router.post('/', isLoggedIn, async (req, res) => {
  let file = fs.readFileSync('./resource/lookup.json') // this might be a problem depending if its running on a linux machine or windows
  let lookup = JSON.parse(file)
  
  const pizza = {
    size: req.body.size,
    sauce: req.body.sauce,
    crust: req.body.crust,
    cheese: req.body.cheese,
    meat: req.body.meat,
    veg: req.body.veg
  }

  const order = new Order({
    pizza: pizza,
    price: calculator.calculate(pizza, lookup),
    status: "created",
    username: req.user.username
  })

  try {
    const savedOrder = await order.save()
    res.json(savedOrder)
  } catch (err) {
    res.json({message: err})
  }
})

// updating order
router.patch('/:orderId', isLoggedIn, async (req, res) => {
  try {
    const updatedOrder = await Order.updateOne({ _id: req.params.orderId }, { $set: { status: req.body.status }})
    res.json(updatedOrder)
  } catch (err) {
    res.send('there has been an error updating the collection: ' + err)
  }
})

//deleting order
router.delete('/:orderId', isLoggedIn, async (req, res) => {
  
  try {
    const deletedOrder = await Order.deleteOne({ _id: req.params.orderId })
    res.json(deletedOrder)
  } catch (err) {
    res.send('there has been an error deleting the object: ' + err)
  }
})


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('you have access');
    return next()
  }
  console.log('i banish u to the shadow realm');
  res.redirect('/login')
}



module.exports = router;
