import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import withServerSideProps from 'hoc/withServerSideProps';
import { getAllCars } from 'services/car';
import { uniq } from 'utils';
import { ALL_CAR } from 'constants/car';
import CardType from '@components//CarType';
import Car from '@components//ListCar';

function Home() {
  const [listCar, setListCar] = useState([]);
  const [filterParams, setFilterParams] = useState({
    model: ALL_CAR,
    type: ALL_CAR,
    payment: ALL_CAR,
  }) as any;

  const [categoryModel, setCategoryModel] = useState({
    key: 'model',
    label: 'Model',
    options: [],
  });

  const [categoryType, setCategoryType] = useState({
    key: 'type',
    label: 'Type',
    options: [],
  });

  const [categoryPayment, setCategoryPayment] = useState({
    key: 'payment',
    label: 'Payment',
    options: [],
  });

  const getListCar = async () => {
    let listCar;

    try {
      listCar = (await getAllCars()) as any;
      setListCar(listCar);
    } catch (error) {
      // Handle Error
      console.error(error);
    }

    const model = uniq(listCar.map((item: any) => item.model));
    const type = uniq(listCar.map((item: any) => item.type));
    const payment = uniq(listCar.map((item: any) => item.payment));

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
    getListCar();
  }, []);

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
