import p5 from "p5";
import { Car, CarProps } from "./Car";
export class HorizontalCar extends Car {
  constructor(private speed: number, carProps: CarProps) {
    super(carProps);
  }
  public get isBeforeTrafficLight() {
    return this.position.y <= this.canvasDimensions.h / 2;
  }
  public move(p: p5) {
    p.fill("red");
    p.ellipse(this.position.x, this.position.y, 10, 10);
    if (this.position.x < this.canvasDimensions.h && this.canMove) {
      this.position.x += this.speed;
    }
  }
}

// import p5 from "p5";
// import {Car} from "./Car";
// import {TrafficLight} from "./TrafficLight";
// export class HorizontalCar extends Car {
//     constructor(private speed: number, private w: number, private h: number, public x: number, public y: number, trafficLight: TrafficLight) {
//         super({ trafficLight })
//     }
//     public get isBeforeTrafficLight() {
//         return this.x <= this.w / 2
//     }
//     public move(p: p5) {
//         p.fill('red')
//         p.ellipse(this.x, this.y, 10, 10)
//         if (this.x < this.h && this.canMove) {
//             this.x += this.speed
//         }
//     }
// }
