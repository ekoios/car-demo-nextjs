import { GetServerSideProps } from 'next';

import withServerSideProps from 'hoc/withServerSideProps';
import { useEffect, useState } from 'react';
import { getAllCars } from 'services/car';
import CardType from '@components//CarType';
import { uniq } from 'utils';

function Home() {
  const [data, setData] = useState([]);
  const [filterParams, setFilterParams] = useState({
    model: -1,
    type: -1,
    payment: -1,
  }) as any;

  const [categories, setCategories] = useState({
    model: {
      key: 'model',
      label: 'Model',
      options: [],
    },
    type: {
      key: 'type',
      label: 'Type',
      options: [],
    },
    payment: {
      key: 'payment',
      label: 'Payment',
      options: [],
    },
  });

  const getData = async () => {
    const data = (await getAllCars()) as any;
    setData(data);

    const model = uniq(data.map((item: any) => item.model));
    const type = uniq(data.map((item: any) => item.type));
    const payment = uniq(data.map((item: any) => item.payment));

    setCategories((prevState) => ({
      model: {
        ...prevState.model,
        options: model,
      },
      type: {
        ...prevState.type,
        options: type,
      },
      payment: {
        ...prevState.payment,
        options: payment,
      },
    }));
  };

  const onFilterCar = (name: string, value: string) => {
    setFilterParams((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  const renderData = (data: any, filterParams: any) => {
    const newFilterParams = {} as any;

    for (const key in filterParams) {
      if (filterParams[key] !== -1) {
        newFilterParams[key] = filterParams[key];
      }
    }
    console.log(data, newFilterParams);

    const newData = data.filter((item: any) => {
      return (
        (filterParams.model !== -1 ? item.model === filterParams.model : true) &&
        (filterParams.type !== -1 ? item.type === filterParams.type : true) &&
        (filterParams.payment !== -1 ? item.payment === filterParams.payment : true)
      );
    });

    return newData;
  };

  return (
    <div className="home">
      <h1>Cars</h1>
      {Object.values(categories).map((category) => (
        <CardType {...category} key={category.key} name={category.key} onChange={onFilterCar} />
      ))}
      <h2 className="title">List Cars</h2>
      <div className="list-car">
        {renderData(data, filterParams).map((item: any, index: number) => (
          <div key={index} className="car">
            <h4>{item.name}</h4>
            <div>{item.type}</div>
            <div>{item.model}</div>
            <div>{item.payment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default Home;
