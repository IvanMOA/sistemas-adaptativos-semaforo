export enum TrafficLightColor {
  GREEN,
  YELLOW,
  RED,
}
export class TrafficLight {
  color = TrafficLightColor.RED;
  constructor() {}
  turnGreen() {
    this.color = TrafficLightColor.GREEN;
  }
  turnYellow() {
    this.color = TrafficLightColor.YELLOW;
  }
  turnRed() {
    this.color = TrafficLightColor.RED;
  }
}
