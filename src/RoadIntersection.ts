import { Street } from "./Street";
import { TrafficLightColor } from "./TrafficLight";
import { sleep } from "./helpers/sleep";
export class RoadIntersection {
  constructor(private streets: Street[]) {}
  async chooseNextStreet() {
    const activeStreet = this.streets.find(
      (street) => street.trafficLight.color === TrafficLightColor.GREEN
    );
    const streetWithMostCars = this.streets.reduce(
      (_streetWithMostCars, currentStreetToCompare) =>
        currentStreetToCompare.carsBeforeTrafficLight.length >
        _streetWithMostCars.carsBeforeTrafficLight.length
          ? currentStreetToCompare
          : _streetWithMostCars,
      this.streets[0]
    );
    if (activeStreet && activeStreet.id !== streetWithMostCars.id) {
      activeStreet.trafficLight.turnYellow();
      await sleep(3000);
      activeStreet.trafficLight.turnRed();
    }
    streetWithMostCars.trafficLight.turnGreen();
  }
}
