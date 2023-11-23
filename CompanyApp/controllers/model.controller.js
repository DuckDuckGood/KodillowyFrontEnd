class MongoModel {
  constructor(model) {
    this.model = model;
  }

  getModel() {
    if (this.model && this.model.length === 1) {
      return this.model[0];
    }
    return this.model;
  }

  send(res) {
    try {
      res.json(this.getModel());
    } catch(error) {
      res.json({ message: error });
    };
  }
}

module.exports = MongoModel;