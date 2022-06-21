import { FC } from 'react';

interface CardTypeProps {
  label: string;
  options: any[];
  name: string;
  value?: string;
  onChange?: any;
}

const CardType: FC<CardTypeProps> = ({ label, options, name, value, onChange }) => {
  const handleChange = (event: any) => {
    const { value, name } = event.target;

    if (!onChange) {
      return;
    }

    onChange(name, value);
  };

  return (
    <div className="card-type">
      <div className="card-type__name">{label}</div>
      {options.map((option, index) => (
        <div key={index} className="card-type__radio">
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            className="card-type__option"
            defaultChecked={option === value}
            onChange={handleChange}
          />
          <label htmlFor={option} className="card-type__label">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CardType;
