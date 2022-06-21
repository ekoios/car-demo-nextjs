import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import withServerSideProps from 'hoc/withServerSideProps';
import { uniq } from 'utils';
import { ALL_CAR, CarModel, car_model, car_payment, car_type } from 'constants/car';
import CardType from '@components//CarType';
import Car from '@components//ListCar';
import { useCar } from 'hooks/useCar';

function Home() {
  const { listCar } = useCar() as any;
  const [filterParams, setFilterParams] = useState<{
    type: string | number;
    model: string | number;
    payment: string | number;
  }>({
    model: ALL_CAR,
    type: ALL_CAR,
    payment: ALL_CAR,
  });

  const [categoryModel, setCategoryModel] = useState(car_model);

  const [categoryType, setCategoryType] = useState(car_type);

  const [categoryPayment, setCategoryPayment] = useState(car_payment);

  const setListCategory = async (listCar: any) => {
    const model = uniq(listCar.map((item: CarModel) => item.model));
    const type = uniq(listCar.map((item: CarModel) => item.type));
    const payment = uniq(listCar.map((item: CarModel) => item.payment));

    setCategoryModel((prevState) => ({
      ...prevState,
      options: model,
    }));

    setCategoryType((prevState) => ({
      ...prevState,
      options: type,
    }));

    setCategoryPayment((prevState) => ({
      ...prevState,
      options: payment,
    }));
  };

  const onFilterCar = (name: string, value: string) => {
    setFilterParams((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setListCategory(listCar);
  }, [listCar]);

  return (
    <div className="home">
      <h1>Cars</h1>
      {[categoryModel, categoryType, categoryPayment].map((category) => (
        <CardType {...category} key={category.key} name={category.key} onChange={onFilterCar} />
      ))}
      <Car title="Results" listCar={listCar} filterParams={filterParams} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default Home;
