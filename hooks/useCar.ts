import { CarModel } from 'constants/car';
import { useEffect, useState } from 'react';
import { getAllCars } from 'services/car';

function useCar() {
  const [listCar, setListCar] = useState<CarModel[]>([]);

  const getListCar = async () => {
    try {
      const newListCar = await getAllCars();
      setListCar(newListCar || []);
    } catch (error) {
      // Handle Error
      console.error(error);
    }
  };
  useEffect(() => {
    getListCar();
  }, []);

  return { listCar };
}

export { useCar };
