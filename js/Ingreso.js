class Income extends Dato {
  static incomeCount = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Income.incomeCount;
  }
  get id() {
    return this._id;
  }
}
