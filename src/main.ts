import p5 from "p5";
import "./style.css";
import { VerticalCar } from "./VerticalCar";
import { VerticalStreet } from "./VerticalStreet";
import { HorizontalStreet } from "./HorizontalStreet";

const w = 500;
const h = 500;
const street = new VerticalStreet([], w, h, 0);
const street2 = new VerticalStreet([], w, h, 0);
// const hStreet = new HorizontalStreet([], w, h, 10);
// const hStreet2 = new HorizontalStreet([], w, h, -40)
const _app = new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;
  p.setup = function setup() {
    p.createCanvas(w, h);
  };
  p.draw = function draw() {
    p.background(255);
    p.fill("#222222");
    p.rect(w / 2, h / 2, 10, 10);
    // hStreet.draw(p);
    street.draw(p);
    p.translate(250, 250);
    p.rotate(p.PI / 2);
    p.translate(-250, -250);
    street2.draw(p);
  };
}, document.getElementById("app")!);
