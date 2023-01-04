const express = require('express')
const Stripe = require('stripe')

const paymentRouter = new express.Router()

const stripe = new Stripe('sk_test_51HO2ZoBA7xz6XAIm8xgxMi3D8fRnVNu0AMKFw5PRdTG5wNyBbY3tffdjuD7Xl8iEjW30JPMO1IwiyZcfitna4HTX00eJPCcgMR')


paymentRouter.post('/charge', async (req, res) => {
    const { id, amount, order } = req.body
    console.log(id, amount, order)
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: `Purchased`,
            payment_method: id,
            confirm: true
        })

        console.log(payment)

        res.status(200).json({
            confirm: 'true'
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Your card's security code is incorrect."
        })
    }

})

module.exports = paymentRouter