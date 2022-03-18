import kWByVehicle from './data/avg-kw-per-vehicle.json';

// Mock service
class ChartService {
  // eslint-disable-next-line class-methods-use-this
  getPowerByVehicle(usePromise?: boolean) {
    return usePromise
      ? new Promise((resolve) => {
          resolve(kWByVehicle);
        })
      : kWByVehicle;
  }
}

export default new ChartService();
