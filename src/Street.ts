import p5 from "p5";
import { sliceIntoEqualChuncks } from "./helpers/sliceIntoEqualChuncks";
import { range } from "ramda";
import { VerticalCar } from "./VerticalCar";
import { Car } from "./Car";
import { TrafficLight } from "./TrafficLight";
import { randomTrue } from "./helpers/randomTrue";
type StreetProps = {
  cars: Car[];
  w: number;
  h: number;
  centerOffset: number;
};
export abstract class Street {
  private trafficLight = new TrafficLight();
  protected readonly DISTANCE_BETWEEN_STREETS = 10;
  protected readonly STREET_WIDTH = 40;
  protected readonly STEET_WIDTH_OFFSET_TO_MIDDLE = this.STREET_WIDTH / 2;
  protected readonly CROSSWALK_HEIGHT = 10;
  protected readonly INTERSECTION_HEIGHT =
    this.STREET_WIDTH * 2 + this.DISTANCE_BETWEEN_STREETS;
  protected readonly COLOR_CONFIG = {
    STREET_COLOR: "#222222",
    INTERSECTIONS_COLOR: "#444444",
    STREET_LINES_COLOR: "#facc15",
  };
  protected readonly SECOND_CROSSWALK_START_OFFSET;
  protected readonly FIRST_CROSSWALK_START_OFFSET;
  protected readonly CARS_BEFORE_TRAFFIC_LIGHT_LIMIT = 3;
  protected abstract getLeftOffset(): number;
  protected abstract getTopOffset(): number;
  protected abstract getDrawingStreetWidth(): number;
  protected abstract getDrawingStreetHeight(): number;
  protected abstract drawIntersectionLimits(p: p5): void;
  protected abstract drawStreetLines(p: p5): void;
  protected abstract drawTrafficLight(p: p5): void;
  constructor(private props: StreetProps) {
    this.FIRST_CROSSWALK_START_OFFSET =
      (this.h - this.INTERSECTION_HEIGHT) / 2 -
      this.DISTANCE_BETWEEN_STREETS / 2;
    this.SECOND_CROSSWALK_START_OFFSET =
      (this.h - this.INTERSECTION_HEIGHT) / 2 +
      this.INTERSECTION_HEIGHT +
      this.DISTANCE_BETWEEN_STREETS / 2;
    setInterval(() => {
      if (!randomTrue(0.2)) return;
      this.cars.push(
        new VerticalCar(3, {
          trafficLight: this.trafficLight,
          canvasDimensions: {
            w: this.w,
            h: this.h,
          },
          position: {
            x:
              this.w / 2 +
              this.centerOffset +
              this.STEET_WIDTH_OFFSET_TO_MIDDLE,
            y: 0,
          },
        })
      );
    }, 1000);
  }
  get h() {
    return this.props.h;
  }
  get w() {
    return this.props.w;
  }
  get cars() {
    return this.props.cars;
  }
  get canAddCar() {
    return this.cars.length < this.CARS_BEFORE_TRAFFIC_LIGHT_LIMIT;
  }
  get centerOffset() {
    return this.props.centerOffset;
  }
  public draw(p: p5) {
    const totalCarsBeforeTrafficLight = this.cars.filter(
      (vc) => vc.isBeforeTrafficLight
    ).length;
    console.log(`Cars before traffic light: ${totalCarsBeforeTrafficLight}`);
    this.drawStreet(p);
    this.drawStreetLines(p);
    this.drawIntersectionLimits(p);
    this.cars.forEach((vc) => vc.move(p));
    this.drawTrafficLight(p);
  }
  protected drawStreet(p: p5) {
    p.fill(this.COLOR_CONFIG.STREET_COLOR);
    p.noStroke();
    p.rect(
      this.getLeftOffset(),
      this.getTopOffset(),
      this.getDrawingStreetWidth(),
      this.getDrawingStreetHeight()
    );
  }
}
