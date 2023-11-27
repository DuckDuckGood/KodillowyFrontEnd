class MongoModel {
  constructor(model) {
    this.model = model;
  }

  send(res, iterable = false) {
    try {
      const model = !iterable && this.model && this.model.length === 1
        ? this.model[0]
        : this.model;

        res.json(model);
    } catch(error) {
      res.status(500).json({ message: error });
    }
  }

  get() {
    return this.model;
  }
}

module.exports = MongoModel;