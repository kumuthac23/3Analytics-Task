import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { paths } from "../../paths/paths";
import { authenticate } from "../../authservice";
import toast from "react-hot-toast";
import {
  ContactFormInitialValue,
  IContactFormResolver,
} from "../../interface/types";

import { NavigateFunction } from "react-router-dom";

// Interface defining the props for the Login component
interface ILoginProps {
  navigate: NavigateFunction;
}

// Yup validation schema for the login form
const schema = yup.object().shape({
  username: yup.string().required("UserName Required"),
  password: yup.string().required("Password Required"),
});

// LoginForm component for rendering the login form
const LoginForm: React.FC<{
  onSubmit: (data: IContactFormResolver) => void;
}> = ({ onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IContactFormResolver>({
    resolver: yupResolver(schema),
    defaultValues: ContactFormInitialValue,
  });

  return (
    <form style={{ width: "300px" }} onSubmit={handleSubmit(onSubmit)}>
      <div className="login-form-input-container">
        <label htmlFor="username" className="py-1">
          UserName
        </label>
        <input
          type="text"
          id="username"
          required
          className={`form-control border border-black ${
            errors.username ? "is-invalid" : ""
          }`}
          {...register("username")}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>
      <div className="login-form-input-container">
        <label htmlFor="password" className="py-1">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          className={`form-control border border-black ${
            errors.password ? "is-invalid" : ""
          }`}
          {...register("password")}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
      <button type="submit" className="btn btn-danger w-100 mt-2">
        Login
      </button>
    </form>
  );
};

// Class component representing the Login page
class Login extends React.Component<ILoginProps> {
  handleLogin = async (data: IContactFormResolver) => {
    const generatedToken = await authenticate(data.username, data.password);

    // If authentication is successful, show success toast and navigate to the root page
    if (generatedToken) {
      toast.success("Login Successfully");
      this.props.navigate(paths.ROOT); // Call the navigate function
    }
  };

  // Render method for the Login component
  render() {
    return (
      <div>
        <div
          className="form-container border border-danger rounded mx-auto"
          style={{ height: "370px", width: "350px" }}
        >
          <h3>Login</h3>
          <LoginForm onSubmit={this.handleLogin} />
        </div>
      </div>
    );
  }
}

// Functional component that provides the Login component with the useNavigate hook
export default function () {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}
