import React from "react";
import { CountryDropdown } from "react-country-region-selector";

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white";

const CustomCountryDropdown = ({
  value,
  handleChange,
  labelText,
  labelFor,
  customStyle,
  ...props
}) => {
  return (
    <div className={`${customStyle}`}>
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
      </label>
      <CountryDropdown
        value={value}
        onChange={handleChange}
        className={fixedInputClass}
        {...props}
      />
    </div>
  );
};

export default CustomCountryDropdown;
