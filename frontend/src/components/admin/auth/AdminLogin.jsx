import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/forms/Input";
import { loginFields } from "../../../constants/formFields";
import { login } from "../../../services/AuthServices";
import toast from "react-hot-toast";
import Button from "../../common/Button";
import { UserContext } from "../../../context/UserContext";
import FormAction from "../../common/forms/FormAction";
import axios from "axios";
import { adminBaseURL } from "../../../utils/adminApi";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

// const adminBaseLocalURL = "http://localhost:5000/api/admin";
// const adminBaseURL = "https://mobirehab.onrender.com/api/admin";

export default function AdminLogin() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await axios.post(
        `${adminBaseURL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;

      if (token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log("Token stored:", token);
      } else {
        throw new Error("User not found or Invalid credentials");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await loginAdmin(
        loginState["email-address"],
        loginState["password"]
      );
      setCurrentUser(userData);
      console.log("Admin User", currentUser);

      toast.success("Logged in successfully");
      navigate("/admin/", { replace: true });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("====================================");
        console.log(error.response.data.message);
        console.log("====================================");
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/path-to-your-logo.svg"
            alt="Your Company Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {fields.map((field) => (
              <Input
                customClass="mb-5"
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>

          {/* <FormExtra goTo={place} /> */}
          <FormAction
            handleSubmit={handleSubmit}
            text={loading ? "Loading..." : "Login"}
            disabled={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
