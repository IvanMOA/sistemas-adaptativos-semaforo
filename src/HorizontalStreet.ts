import { Street } from "./Street";
import p5 from "p5";
import { sliceIntoEqualChuncks } from "./helpers/sliceIntoEqualChuncks";
import { range } from "ramda";
import { Car } from "./Car";
export class HorizontalStreet extends Street {
  constructor(
    horizontalCars: Car[],
    w: number,
    h: number,
    centerOffset: number
  ) {
    super({
      cars: horizontalCars,
      w: w,
      h: h,
      centerOffset: centerOffset,
    });
  }
  protected getLeftOffset(): number {
    return 0;
  }
  protected getTopOffset(): number {
    return this.h / 2 + this.centerOffset;
  }
  protected getDrawingStreetHeight(): number {
    return this.STREET_WIDTH;
  }
  protected getDrawingStreetWidth(): number {
    return this.w;
  }
  protected drawIntersectionLimits(p: p5) {
    p.fill(this.COLOR_CONFIG.INTERSECTIONS_COLOR);
    p.rect(
      this.FIRST_CROSSWALK_START_OFFSET,
      this.h / 2 +
        this.centerOffset +
        this.STEET_WIDTH_OFFSET_TO_MIDDLE -
        10 / 2 -
        15,
      this.CROSSWALK_HEIGHT,
      this.STREET_WIDTH
    );
    p.rect(
      this.SECOND_CROSSWALK_START_OFFSET,
      this.h / 2 +
        this.centerOffset +
        this.STEET_WIDTH_OFFSET_TO_MIDDLE -
        10 / 2 -
        15,
      this.CROSSWALK_HEIGHT,
      this.STREET_WIDTH
    );
  }
  protected drawStreetLines(p: p5) {
    for (const chunk of sliceIntoEqualChuncks(range(1, 501), 50)) {
      const STREET_LINE_HEIGHT = 20;
      const streetPaintWidth = 10;
      p.fill(this.COLOR_CONFIG.STREET_LINES_COLOR);
      p.rect(
        this.SECOND_CROSSWALK_START_OFFSET + STREET_LINE_HEIGHT + chunk[0],
        this.w / 2 +
          this.centerOffset +
          this.STEET_WIDTH_OFFSET_TO_MIDDLE -
          streetPaintWidth / 2,
        STREET_LINE_HEIGHT,
        streetPaintWidth
      );
      p.rect(
        this.FIRST_CROSSWALK_START_OFFSET -
          STREET_LINE_HEIGHT -
          this.CROSSWALK_HEIGHT -
          chunk[0],
        this.w / 2 +
          this.centerOffset +
          this.STEET_WIDTH_OFFSET_TO_MIDDLE -
          streetPaintWidth / 2,
        STREET_LINE_HEIGHT,
        streetPaintWidth
      );
    }
  }
  protected drawTrafficLight(p: p5) {
    console.log(p);
  }
}
