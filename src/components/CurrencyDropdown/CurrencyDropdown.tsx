import React from "react";
import "./CurrencyDropdown.css";

interface CurrencyDropdownProps {
  onChange: (value: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ onChange }) => {
  return (
    <div className="currency-dropdown">
      <label htmlFor="currency">Currency Type:</label>
      <select
        className="currency-select"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
        defaultValue="USD"
        id="currency"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
};

export default CurrencyDropdown;
