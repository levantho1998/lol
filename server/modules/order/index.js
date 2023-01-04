const orderModel = require('./module')

const handlers = {
    async findMany(req, res, next) {
        try {
            let { email, payment, sortBy, sort } = req.query
            let conditions = {}
            if (email) {
                conditions.email = email
            }
            if (payment) {
                conditions.payment = payment
            }
            let sortInfo = `${sort === 'Highest to Lowest' ? '-' : ''}${sortBy}`
            let items = await orderModel.find(conditions).sort(sortInfo)
            res.json(items)
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        try {
            let data = req.body
            let order = await orderModel.create(data)
            res.json(order)
        } catch (err) {
            next(err)
        }
    },
    async delete(req, res, next) {
        try {
            let id = req.params.id
            let item = await orderModel.findByIdAndDelete(id)
            res.json(item)
        } catch (err) {
            next(err)
        }
    },
}

module.exports = handlers