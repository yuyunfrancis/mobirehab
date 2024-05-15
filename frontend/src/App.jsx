import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    profession: "",
    bio: "",
    licenseNumber: "",
    password: "",
    profilePicture: null,
    cv: null,
    licenseDocument: null,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "file") {
      value = e.target.files.length > 0 ? e.target.files[0] : null;
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log("====================================");
    console.log(data);
    console.log("====================================");

    // Append files
    if (formData.profilePicture) {
      data.append(
        "profilePicture",
        formData.profilePicture,
        formData.profilePicture.name
      );
    }
    if (formData.cv) {
      data.append("cv", formData.cv, formData.cv.name);
    }
    if (formData.licenseDocument) {
      data.append(
        "licenseDocument",
        formData.licenseDocument,
        formData.licenseDocument.name
      );
    }

    // Append other form data
    Object.keys(formData).forEach((key) => {
      if (["profilePicture", "cv", "licenseDocument"].includes(key)) return;
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/therapist/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phoneNumber"
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="gender"
        onChange={handleChange}
        placeholder="Gender"
      />
      <input
        type="text"
        name="address"
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="profession"
        onChange={handleChange}
        placeholder="Profession"
      />
      <textarea name="bio" onChange={handleChange} placeholder="Bio" />
      <input
        type="text"
        name="licenseNumber"
        onChange={handleChange}
        placeholder="License Number"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <input type="file" name="profilePicture" onChange={handleChange} />
      <input type="file" name="cv" onChange={handleChange} />
      <input type="file" name="licenseDocument" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default App;
