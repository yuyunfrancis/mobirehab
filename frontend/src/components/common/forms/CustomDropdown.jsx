const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white";

export default function CustomDropdown({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  isRequired = false,
  options,
  customClass,
}) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <select
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        required={isRequired}
        className={fixedInputClass + customClass}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
