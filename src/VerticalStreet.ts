import { VerticalCar } from "./VerticalCar";
import { Street } from "./Street";
import p5 from "p5";
import { sliceIntoEqualChuncks } from "./helpers/sliceIntoEqualChuncks";
import { range } from "ramda";
import { Car } from "./Car";
export class VerticalStreet extends Street {
  constructor(verticalCars: Car[], w: number, h: number, centerOffset: number) {
    super({
      cars: verticalCars,
      w: w,
      h: h,
      centerOffset: centerOffset,
    });
  }
  protected getLeftOffset(): number {
    return this.w / 2 + this.centerOffset;
  }
  protected getTopOffset(): number {
    return 0;
  }
  protected getDrawingStreetHeight(): number {
    return this.h;
  }
  protected getDrawingStreetWidth(): number {
    return this.STREET_WIDTH;
  }
  protected drawIntersectionLimits(p: p5) {
    p.fill(this.COLOR_CONFIG.INTERSECTIONS_COLOR);
    p.rect(
      this.w / 2 +
        this.centerOffset +
        this.STEET_WIDTH_OFFSET_TO_MIDDLE -
        10 / 2 -
        15,
      this.FIRST_CROSSWALK_START_OFFSET,
      this.STREET_WIDTH,
      this.CROSSWALK_HEIGHT
    );
    p.rect(
      this.w / 2 +
        this.centerOffset +
        this.STEET_WIDTH_OFFSET_TO_MIDDLE -
        10 / 2 -
        15,
      this.SECOND_CROSSWALK_START_OFFSET,
      this.STREET_WIDTH,
      this.CROSSWALK_HEIGHT
    );
  }
  protected drawStreetLines(p: p5) {
    for (const chunk of sliceIntoEqualChuncks(range(1, 501), 50)) {
      const STREET_LINE_HEIGHT = 20;
      const streetPaintWidth = 10;
      p.fill(this.COLOR_CONFIG.STREET_LINES_COLOR);
      p.rect(
        this.w / 2 +
          this.centerOffset +
          this.STEET_WIDTH_OFFSET_TO_MIDDLE -
          streetPaintWidth / 2,
        this.SECOND_CROSSWALK_START_OFFSET + STREET_LINE_HEIGHT + chunk[0],
        streetPaintWidth,
        STREET_LINE_HEIGHT
      );
      p.rect(
        this.w / 2 +
          this.centerOffset +
          this.STEET_WIDTH_OFFSET_TO_MIDDLE -
          streetPaintWidth / 2,
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
      x: this.w / 2 + this.centerOffset,
      y: this.SECOND_CROSSWALK_START_OFFSET - this.CROSSWALK_HEIGHT - 10,
    };
    p.push();
    p.translate(drawOrigin.x + 15, drawOrigin.y);
    p.translate(-15, 0);
    p.fill("#9ca3af");
    p.rect(0, 0, 30, 10);
    p.fill("#65a30d");
    p.translate(0, -7);
    p.rect(0, 0, 10, 7);
    p.fill("#fbbf24");
    p.rect(10, 0, 10, 7);
    p.fill("#dc2626");
    p.rect(20, 0, 10, 7);
    p.pop();
  }
}
