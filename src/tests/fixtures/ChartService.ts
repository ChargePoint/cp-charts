import kWByVehicle from "./data/avg-kw-per-vehicle.json";

class ChartService {
  getPowerByVehicle(usePromise) {
    return usePromise
      ? new Promise((resolve) => {
          resolve(kWByVehicle);
        })
      : kWByVehicle;
  }
}

export default new ChartService();
