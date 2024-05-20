import React, { useState } from "react";
import Header from "../../common/Header";
import Input from "../../common/forms/Input";
import FormAction from "../../common/forms/FormAction";
import CustomPhoneInput from "../../common/forms/PhoneInput";
import CustomDropdown from "../../common/forms/CustomDropdown";

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    guardianPhoneNumber: "",
    gender: "",
    address: {
      country: "",
      city: "",
      district: "",
    },
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "country" || name === "city" || name === "district") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        address: {
          ...prevInputs.address,
          [name]: value,
        },
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.firstName}
            labelText="First Name"
            labelFor="firstName"
            id="firstName"
            name="firstName"
            type="text"
            isRequired={true}
            placeholder="First Name"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <Input
            handleChange={handleChange}
            value={inputs.lastName}
            labelText="Last Name"
            labelFor="lastName"
            id="lastName"
            name="lastName"
            type="text"
            isRequired={true}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.email}
            labelText="Email Address"
            labelFor="email"
            id="email"
            name="email"
            type="email"
            isRequired={true}
            placeholder="example@email.com"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <CustomDropdown
            handleChange={handleChange}
            value={inputs.gender}
            labelText="Gender"
            labelFor="gender"
            id="gender"
            name="gender"
            isRequired={true}
            options={["Male", "Female"]}
            placeholder="Gender"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 my-5">
          <CustomPhoneInput
            country={"us"}
            value={inputs.phoneNumber}
            onChange={(phone) =>
              handleChange({
                target: { name: "phoneNumber", value: phone },
              })
            }
            placeholder="Phone Number"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 my-5">
          <CustomPhoneInput
            country={"us"}
            value={inputs.guardianPhoneNumber}
            onChange={(phone) =>
              handleChange({
                target: { name: "guardianPhoneNumber", value: phone },
              })
            }
            placeholder="Guardian's Phone Number"
          />
        </div>
      </div>

      {/* Add more input fields here */}
      <FormAction handleSubmit={handleSubmit} text="Register" />
    </form>
  );
};

export default SignupForm;
