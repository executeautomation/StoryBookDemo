import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../styles/login.module.css";

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginFormValues>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // State to track submission message
  const [message, setMessage] = useState<string | null>(null);

  // Handle form submission
  const handleFormSubmit: SubmitHandler<LoginFormValues> = (data) => {
    if (data.remember) {
      setMessage("Form Submitted. User has clicked Remember me.");
    } else {
      setMessage("Form Submitted without Remember me.");
    }
    onSubmit(data); // Call the parent's onSubmit handler
  };

  return (
    <div>
      {message ? (
        <div className={styles.successMessage}>
          <h2>{message}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <h2 className={styles.header}>Login</h2>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className={`${styles.input} ${
                errors.username ? styles.errorInput : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className={styles.errorMessage}>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`${styles.input} ${
                errors.password ? styles.errorInput : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className={styles.rememberMe}>
            <input id="remember" type="checkbox" {...register("remember")} />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;