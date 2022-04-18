import p5 from "p5";
import { sliceIntoEqualChuncks } from "./helpers/sliceIntoEqualChuncks";
import { range } from "ramda";
import { Car } from "./Car";
import { TrafficLight, TrafficLightColor } from "./TrafficLight";
import { randomFalse } from "./helpers/randomFalse";
import { nanoid } from "nanoid";
type StreetProps = {
  cars: Car[];
  w: number;
  h: number;
};
export class Street {
  id: string;
  trafficLight = new TrafficLight();
  protected readonly DISTANCE_BETWEEN_STREETS = 10;
  protected readonly STREET_WIDTH = 40;
  protected readonly STEET_WIDTH_OFFSET_TO_MIDDLE = this.STREET_WIDTH / 2;
  protected readonly CROSSWALK_HEIGHT = 10;
  protected readonly INTERSECTION_HEIGHT =
    this.STREET_WIDTH * 2 + this.DISTANCE_BETWEEN_STREETS;
  protected readonly COLOR_CONFIG = {
    STREET_COLOR: "#222222",
    INTERSECTIONS_COLOR: "#444444",
    STREET_LINES_COLOR: "#f5f3ff",
  };
  protected readonly SECOND_CROSSWALK_START_OFFSET;
  protected readonly FIRST_CROSSWALK_START_OFFSET;
  protected readonly CARS_BEFORE_TRAFFIC_LIGHT_LIMIT = 3;
  constructor(private props: StreetProps) {
    this.id = nanoid();
    this.FIRST_CROSSWALK_START_OFFSET =
      (this.h - this.INTERSECTION_HEIGHT) / 2 -
      this.DISTANCE_BETWEEN_STREETS / 2;
    this.SECOND_CROSSWALK_START_OFFSET =
      (this.h - this.INTERSECTION_HEIGHT) / 2 +
      this.INTERSECTION_HEIGHT +
      this.DISTANCE_BETWEEN_STREETS / 2;
    setInterval(() => {
      if (randomFalse(0.2) || !this.canAddCar) return;
      this.cars.push(
        new Car({
          trafficLight: this.trafficLight,
          canvasDimensions: {
            w: this.w,
            h: this.h,
          },
          position: {
            x: this.STEET_WIDTH_OFFSET_TO_MIDDLE,
            y: 0,
          },
          streetLinePosition: {
            x: 0,
            y: this.FIRST_CROSSWALK_START_OFFSET,
          },
          speed: 3,
          nextCarPosition: this.cars[this.cars.length - 1]?.position ?? {
            x: 1000,
            y: 1000,
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
  set cars(cars) {
    this.props.cars = cars;
  }
  get canAddCar() {
    return this.cars.length < this.CARS_BEFORE_TRAFFIC_LIGHT_LIMIT;
  }
  get carsBeforeTrafficLight() {
    return this.cars.filter((vc) => vc.isBeforeTrafficLight);
  }
  public draw(p: p5) {
    this.cars = this.cars.filter((car) => car.position.y <= 500 + 50);
    this.drawStreet(p);
    this.drawStreetLines(p);
    this.drawIntersectionLimits(p);
  }
  public drawCars(p: p5) {
    this.cars.forEach((vc) => vc.move(p));
  }
  drawIntersectionLimits(p: p5) {
    p.fill(this.COLOR_CONFIG.INTERSECTIONS_COLOR);
    p.rect(
      this.STEET_WIDTH_OFFSET_TO_MIDDLE - 10 / 2 - 15,
      this.FIRST_CROSSWALK_START_OFFSET,
      this.STREET_WIDTH,
      this.CROSSWALK_HEIGHT
    );
    p.rect(
      this.STEET_WIDTH_OFFSET_TO_MIDDLE - 10 / 2 - 15,
      this.SECOND_CROSSWALK_START_OFFSET,
      this.STREET_WIDTH,
      this.CROSSWALK_HEIGHT
    );
  }
  drawStreetLines(p: p5) {
    for (const chunk of sliceIntoEqualChuncks(range(1, 501), 50)) {
      const STREET_LINE_HEIGHT = 20;
      const streetPaintWidth = 10;
      p.fill(this.COLOR_CONFIG.STREET_LINES_COLOR);
      p.rect(
        this.STEET_WIDTH_OFFSET_TO_MIDDLE - streetPaintWidth / 2,
        this.SECOND_CROSSWALK_START_OFFSET + STREET_LINE_HEIGHT + chunk[0],
        streetPaintWidth,
        STREET_LINE_HEIGHT
      );
      p.rect(
        this.STEET_WIDTH_OFFSET_TO_MIDDLE - streetPaintWidth / 2,
        this.FIRST_CROSSWALK_START_OFFSET -
          STREET_LINE_HEIGHT -
          this.CROSSWALK_HEIGHT -
          chunk[0],
        streetPaintWidth,
        STREET_LINE_HEIGHT
      );
    }
  }
  drawTrafficLight(p: p5) {
    const drawOrigin = {
      x: 0,
      y: this.SECOND_CROSSWALK_START_OFFSET - this.CROSSWALK_HEIGHT + 30,
    };
    p.push();
    p.noStroke();
    p.translate(drawOrigin.x + 15, drawOrigin.y);
    p.translate(-15, 0);
    p.fill("#9ca3af");
    p.rect(0, 0, 30, 10);
    const activeGreen = "#65a30d";
    const nonActiveGreen = "#d9f99d";
    p.fill(
      this.trafficLight.color === TrafficLightColor.GREEN
        ? activeGreen
        : nonActiveGreen
    );
    p.translate(0, -7);
    p.rect(0, 0, 10, 7);
    const activeYellow = "#fbbf24";
    const nonActiveYellow = "#fef3c7";
    p.fill(
      this.trafficLight.color === TrafficLightColor.YELLOW
        ? activeYellow
        : nonActiveYellow
    );
    p.rect(10, 0, 10, 7);
    const activeRed = "#dc2626";
    const nonActiveRed = "#fee2e2";
    p.fill(
      this.trafficLight.color === TrafficLightColor.RED
        ? activeRed
        : nonActiveRed
    );
    p.rect(20, 0, 10, 7);
    p.pop();
  }
  drawStreet(p: p5) {
    p.fill(this.COLOR_CONFIG.STREET_COLOR);
    p.noStroke();
    p.rect(0, 0, this.STREET_WIDTH, this.h + 10);
  }
}
