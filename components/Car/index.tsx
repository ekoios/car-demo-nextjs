import { FC } from 'react';

interface CarType {
  name: string;
  type: string;
  model: string;
  payment: string;
}

const Car: FC<CarType> = ({ name, type, model, payment }) => {
  return (
    <div className="car">
      <h4>{name}</h4>
      <div>{type}</div>
      <div>{model}</div>
      <div>{payment}</div>
    </div>
  );
};

export default Car;
