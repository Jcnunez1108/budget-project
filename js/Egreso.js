class Egress extends Dato {
  static egressCounter = 0;

  constructor(description, value) {
    super(description, value);
    this._id = ++Egress.egressCounter;
  }
  get id() {
    return this._id;
  }
}
