import carsData from 'mockData';

export const getAllCars = async (isError?: boolean) => {
  return new Promise((resolve, reject) => {
    if (isError) {
      reject('Error');
    }

    resolve(carsData);
  });
};
