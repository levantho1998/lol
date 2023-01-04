const categoryModel = require('./module')

const handlers = {
    async findMany(req, res, next) {
        try {
            let {name} = req.query
            let conditions = {}
            if (name) {
                conditions.name = new RegExp(name, 'i')
            }
            let category = await categoryModel.find(conditions)
            res.json(category)
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        try {
            let data = req.body
            let category = await categoryModel.create(data)
            res.json(category)
        } catch (err) {
            next(err)
        }
    },
    async delete(req, res, next) {
        try {
            let id = req.params.id
            let item = await categoryModel.findByIdAndDelete(id)
            res.json(item)
        } catch (err) {
            next(err)
        }
    },
}

module.exports = handlers