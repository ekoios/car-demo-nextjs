import { CarModel } from 'constants/car';
import carsData from 'mockData';

export const getAllCars = async (isError?: boolean): Promise<CarModel[]> => {
  return new Promise((resolve, reject) => {
    if (isError) {
      reject('Error');
    }

    resolve(carsData);
  });
};
