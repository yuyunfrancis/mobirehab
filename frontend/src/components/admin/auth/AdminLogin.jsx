import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/forms/Input";
import { loginFields } from "../../../constants/formFields";
import { login } from "../../../services/AuthServices";
import toast from "react-hot-toast";
import Button from "../../common/Button";
import { UserContext } from "../../../context/UserContext";
import FormAction from "../../common/forms/FormAction";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function AdminLogin({ API_ENDPOINT }) {
  const [loginState, setLoginState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await authenticateUser();
    // console.log(loginState);
    setLoading(false);
  };

  // Handle Login API Integration here
  const authenticateUser = async () => {
    let loginFields = {
      email: loginState["email-address"],
      password: loginState["password"],
    };

    // console.log("Fields", loginFields.email, loginFields.password);

    try {
      const userData = await login(
        loginFields.email,
        loginFields.password,
        API_ENDPOINT
      );
      if (userData) {
        setCurrentUser(userData);
        toast.success("Logged in successfully");

        if (userData.data.user.userType === "patient") {
          navigate("/patient/", { replace: true });
        }
        if (userData.data.user.userType === "therapist") {
          navigate("/therapist/", { replace: true });
        }
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      if (!err.message || !err.message.includes("Login failed")) {
        if (err.response) {
          toast.error(`Login failed: ${err.response.data.message}`);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    }
  };
  const isFormValid = () => {
    return loginState["email-address"] && loginState["password"];
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
