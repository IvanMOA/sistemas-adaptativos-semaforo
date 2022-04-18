import p5 from "p5";
import { Car, CarProps } from "./Car";
import { CanvasDimensions } from "./CanvasDimensions";
export class VerticalCar extends Car {
  constructor(private speed: number, carProps: CarProps) {
    super(carProps);
  }
  public get isBeforeTrafficLight() {
    return this.position.y <= this.canvasDimensions.h / 2;
  }
  public move(p: p5) {
    p.fill("red");
    p.ellipse(this.position.x, this.position.y, 10, 10);
    if (this.position.y < this.canvasDimensions.h) {
      this.position.y += this.speed;
    }
  }
}
