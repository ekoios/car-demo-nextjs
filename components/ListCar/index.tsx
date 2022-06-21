import { FC } from 'react';
import { ALL_CAR, CarModel } from 'constants/car';

interface ListCar {
  title: string;
  filterParams: any;
  listCar: CarModel[];
}

const ListCar: FC<ListCar> = ({ title, filterParams, listCar }) => {
  const renderData = (data: CarModel[], filterParams: any) => {
    if (!data) {
      return [];
    }

    const newData = data.filter((item: CarModel) => {
      return (
        (ALL_CAR !== filterParams.model ? filterParams.model === item?.model : true) &&
        (ALL_CAR !== filterParams.type ? filterParams.type === item?.type : true) &&
        (ALL_CAR !== filterParams.payment ? filterParams.payment === item?.payment : true)
      );
    });

    return newData;
  };

  return (
    <>
      <h2 className="title">{title}</h2>
      <div className="list-car">
        {renderData(listCar, filterParams).map((item: CarModel, index: number) => (
          <div className="car" key={index}>
            <h4>{item.name}</h4>
            <div>{item.type}</div>
            <div>{item.model}</div>
            <div>{item.payment}</div>
          </div>
        ))}
        {!renderData(listCar, filterParams).length && <div>Not found</div>}
      </div>
    </>
  );
};

export default ListCar;
