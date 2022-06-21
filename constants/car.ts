const ALL_CAR = -1;

const car_model = {
  key: 'model',
  label: 'Model',
  options: [],
};

const car_type = {
  key: 'type',
  label: 'Type',
  options: [],
};

const car_payment = {
  key: 'payment',
  label: 'Payment',
  options: [],
};

export interface CarModel {
  id: number;
  name: string;
  type: string;
  model: string;
  payment: string;
}

export { ALL_CAR, car_model, car_type, car_payment };
