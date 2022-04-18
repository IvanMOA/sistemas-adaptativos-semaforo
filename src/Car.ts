import p5 from "p5";
import { TrafficLight, TrafficLightColor } from "./TrafficLight";
import { Position } from "./Position";
import { CanvasDimensions } from "./CanvasDimensions";
import { nanoid } from "nanoid";
export type CarProps = {
  trafficLight: TrafficLight;
  position: Position;
  streetLinePosition: Position;
  nextCarPosition: Position;
  canvasDimensions: CanvasDimensions;
  speed: number;
};
export class Car {
  id: string;
  constructor(private props: CarProps) {
    this.id = nanoid();
  }
  get trafficLight() {
    return this.props.trafficLight;
  }
  get position() {
    return this.props.position;
  }
  get streetLinePosition() {
    return this.props.streetLinePosition;
  }
  get nextCarPosition() {
    return this.props.nextCarPosition;
  }
  get canvasDimensions() {
    return this.props.canvasDimensions;
  }
  get speed() {
    return this.props.speed;
  }
  get canMove(): boolean {
    return (
      ((this.trafficLight.color !== TrafficLightColor.RED ||
        this.position.y < this.streetLinePosition.y) &&
        this.nextCarPosition.y - this.position.y > 50) ||
      this.position.y >= this.canvasDimensions.h
    );
  }
  public get isBeforeTrafficLight() {
    return this.position.y <= this.canvasDimensions.h / 2;
  }
  public move(p: p5) {
    p.fill("#f43f5e");
    p.noStroke();
    p.rect(this.position.x, this.position.y - 10, 10, 15);
    p.fill("#9ca3af");
    p.rect(this.position.x - 2, this.position.y - 10, 2, 3);
    p.rect(this.position.x + 10, this.position.y - 10, 2, 3);
    p.rect(this.position.x + 10, this.position.y, 2, 3);
    p.rect(this.position.x - 2, this.position.y, 2, 3);

    if (this.position.y < this.canvasDimensions.h + 50 && this.canMove) {
      this.position.y += this.speed;
    }
  }
}
