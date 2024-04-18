import { NavLink, useNavigate, useParams } from "react-router-dom";

import classes from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../services/internalApiServices";
import weights from "../../assets/weights.jpg";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

const Auth = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const params = useParams();
  const authType = params.authType;

  useEffect(() => {
    setInputValue({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
    setDidEdit({
      email: false,
      password: false,
    });
  }, [authType]);

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: auth,
    onSuccess: (data) => {
      const userName = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      const userNameString = JSON.stringify(userName);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", userNameString);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      navigate("/user/dashboard");
    },
  });

  const isEmailValid =
    inputValue.email.includes("@") && inputValue.email.includes(".com");

  const isPasswordValid = inputValue.password.trim().length > 7;

  function isButtonDisabled() {
    if (authType === "login") {
      return !inputValue.email || !inputValue.password;
    } else if (authType === "signup") {
      return (
        !isEmailValid ||
        !isPasswordValid ||
        !inputValue.firstName ||
        !inputValue.lastName
      );
    }
    return false;
  }

  function handleInputChange(identifier, value) {
    setInputValue((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const authData = Object.fromEntries(formData);
    console.log(authData);
    mutate({ authType, authData });
  }

  let content;

  if (authType === "login") {
    content = (
      <>
        <NavLink to="/" className={classes.navLink}>
          &larr; Home
        </NavLink>
        <h1>Log in</h1>
        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={inputValue.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
            className={classes.input}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={inputValue.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            className={classes.input}
          />
        </div>
        <p>
          Need an account?{" "}
          <span>
            <NavLink to="/auth/signup" className={classes.navLink}>
              Create an account
            </NavLink>
          </span>
        </p>
        <button
          disabled={isButtonDisabled()}
          className={
            isButtonDisabled() ? classes.disableButton : classes.button
          }
        >
          Log in
        </button>
      </>
    );
  } else if (authType === "signup") {
    content = (
      <>
        <NavLink to="/" className={classes.navLink}>
          &larr; Home
        </NavLink>
        <h1>Create Account</h1>
        <div className={classes.inputContainer}>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            className={classes.input}
            value={inputValue.firstName}
            onChange={(event) =>
              handleInputChange("firstName", event.target.value)
            }
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            className={classes.input}
            value={inputValue.lastName}
            onChange={(event) =>
              handleInputChange("lastName", event.target.value)
            }
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={inputValue.email}
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            className={`${classes.input} ${
              didEdit.email && !isEmailValid && classes.invalid
            }`}
          />
          {didEdit.email && !isEmailValid && (
            <p className={classes.invalidText}>
              Please enter a valid email address
            </p>
          )}
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password must be at least 8 characters"
            value={inputValue.password}
            onBlur={() => handleInputBlur("password")}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            className={`${classes.input} ${
              didEdit.password && !isPasswordValid && classes.invalid
            }`}
          />
          {didEdit.password && !isPasswordValid && (
            <p className={classes.invalidText}>
              Password must be at least 8 characters long
            </p>
          )}
        </div>
        <p>
          Already have an account?{" "}
          <span>
            <NavLink to="/auth/login" className={classes.navLink}>
              Log in
            </NavLink>
          </span>
        </p>
        <button
          disabled={isButtonDisabled()}
          className={
            isButtonDisabled() ? classes.disableButton : classes.button
          }
        >
          Create Account
        </button>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <img src={weights} />
        <div className={classes.formContainer}>
          <form method="post" className={classes.form} onSubmit={handleSubmit}>
            {content}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
