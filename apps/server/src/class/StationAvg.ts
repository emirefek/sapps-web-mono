import { prisma } from "@/lib/prisma";

export class StationAvg {
  //   getAvg: (device_id: string) => number;

  constructor() {
    // this.get = () => {
    //   return 0;
    // };
  }

  public async getAvg(device_id: string): Promise<{
    temp: number;
    humidity: number;
    airq: number;
  }> {
    const data = await prisma.stationData.findMany({
      where: {
        stationId: parseInt(device_id),
      },
    });

    // calculate avg of temp, humidity, airq
    let tempSum = 0;
    let humiditySum = 0;
    let airqSum = 0;
    let count = 0;
    data.forEach((element) => {
      tempSum += element.temp;
      humiditySum += element.humidity;
      airqSum += element.airq;
      count++;
    });
    const tempAvg = tempSum / count;
    const humidityAvg = humiditySum / count;
    const airqAvg = airqSum / count;

    return {
      temp: tempAvg,
      humidity: humidityAvg,
      airq: airqAvg,
    };
  }
}
