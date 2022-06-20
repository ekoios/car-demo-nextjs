import carsData from 'mockData';

export const getAllCars = async () => {
  return new Promise((resolve, reject) => resolve(carsData));
};
