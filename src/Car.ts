import p5 from "p5";
import { TrafficLight, TrafficLightColor } from "./TrafficLight";
import { Position } from "./Position";
import { CanvasDimensions } from "./CanvasDimensions";
export type CarProps = {
  trafficLight: TrafficLight;
  position: Position;
  canvasDimensions: CanvasDimensions;
};
export abstract class Car {
  constructor(private props: CarProps) {}
  get trafficLight() {
    return this.props.trafficLight;
  }
  get position() {
    return this.props.position;
  }
  get canvasDimensions() {
    return this.props.canvasDimensions;
  }
  abstract get isBeforeTrafficLight(): boolean;
  abstract move(p: p5): void;
  get canMove(): boolean {
    return this.trafficLight.color !== TrafficLightColor.RED;
  }
}
