import p5 from "p5";
import "./style.css";
import { Street } from "./Street";
import { RoadIntersection } from "./RoadIntersection";
const w = 500;
const h = 500;
const street2 = new Street({
  cars: [],
  w,
  h,
});
const street1 = new Street({
  cars: [],
  w,
  h,
});
const street3 = new Street({
  cars: [],
  w,
  h,
});
const street4 = new Street({
  cars: [],
  w,
  h,
});
const roadIntersection = new RoadIntersection([
  street1,
  street2,
  street3,
  street4,
]);
let lastTrafficLightsUpdatedTime = new Date();
const _app = new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;
  p.setup = function setup() {
    p.createCanvas(w, h);
  };
  const initCtx = {
    street1() {
      p.translate(250 - 50, 0);
    },
    street2() {
      p.translate(250, 250);
      p.rotate(p.PI);
      p.translate(-40, -260);
    },
    street3() {
      p.translate(250, 250);
      p.rotate(p.PI / 2);
      p.translate(-40, -250);
    },
    street4() {
      p.translate(250, 250);
      p.rotate((-1 * p.PI) / 2);
      p.translate(-50, -260);
    },
  };
  const withCtx = (ctx: VoidFunction, fn: VoidFunction) => {
    p.push();
    ctx();
    fn();
    p.pop();
  };
  p.draw = function draw() {
    p.background(255);
    withCtx(initCtx.street1, () => street1.draw(p));
    withCtx(initCtx.street2, () => street2.draw(p));
    withCtx(initCtx.street3, () => street3.draw(p));
    withCtx(initCtx.street4, () => street4.draw(p));
    withCtx(initCtx.street1, () => street1.drawCars(p));
    withCtx(initCtx.street2, () => street2.drawCars(p));
    withCtx(initCtx.street3, () => street3.drawCars(p));
    withCtx(initCtx.street4, () => street4.drawCars(p));
    withCtx(initCtx.street1, () => street1.drawTrafficLight(p));
    withCtx(initCtx.street2, () => street2.drawTrafficLight(p));
    withCtx(initCtx.street3, () => street3.drawTrafficLight(p));
    withCtx(initCtx.street4, () => street4.drawTrafficLight(p));
    const secondsSinceTrafficLightsUpdated =
      (new Date().getTime() - lastTrafficLightsUpdatedTime.getTime()) / 1000;
    if (secondsSinceTrafficLightsUpdated >= 5) {
      console.log("Updating streetlights");
      roadIntersection.chooseNextStreet();
      lastTrafficLightsUpdatedTime = new Date();
    }
  };
}, document.getElementById("app")!);
