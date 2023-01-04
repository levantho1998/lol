const productModel = require("./module");

const handlers = {
  async findMany(req, res, next) {
    try {
      let { category, name, sortBy, sort } = req.query;
      let conditions = {};
      if (category) {
        conditions.category = new RegExp(category, "i");
      }
      if (name) {
        conditions.name = new RegExp(name, "i");
      }
      let sortInfo = `${sort === "Highest to Lowest" ? "-" : ""}${sortBy}`;
      let items = await productModel.find(conditions).sort(sortInfo);
      res.json(items);
    } catch (err) {
      next(err);
    }
  },
  async findOne(req, res, next) {
    try {
      let id = req.params.id;
      let item = await productModel.findById(id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      let data = req.body; // {title: '123',des: '123'}
      let item = await productModel.create(data); // {_id:'',title:'123',des:'123'}
      res.json(item);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      let data = req.body;
      let id = req.body._id;

      if (!id) {
        throw new Error(`Require 'id' to update`);
      }

      let item = await productModel.findByIdAndUpdate(id, data, { new: true });

      res.json(item);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      let id = req.params.id;
      let item = await productModel.findByIdAndDelete(id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  },
  async updateQuantitySold(req, res, next) {
    try {
      let data = req.body;
      for (item of data) {
        const id = item.product._id;
        const prod = await productModel.findById(id);
        const quantitySold = prod.quantitySold ?? 0;
        await productModel.findByIdAndUpdate(
          id,
          {
            ...prod._doc,
            quantitySold: quantitySold + item.quantity,
          },
          { new: true }
        );
      }
      res.status(200);
    } catch (err) {
      res.status(400);
      next(err);
    }
  },
  async getHotProduct(req, res, next) {
    try {
      let hotProducts = await productModel
        .find()
        .sort({ quantitySold: -1 })
        .limit(10);
      const filterHotProducts = [...hotProducts].filter(
        (item) => item.quantitySold !== 0 && !!item.quantitySold
      );
      res.json(filterHotProducts);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = handlers;
