class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `I am driving a ${this.year} ${this.make} ${this.model}.`;
  }
}

const myCar = new Car("Audi", "Q2", "2019");
console.log(myCar.getInfo());
