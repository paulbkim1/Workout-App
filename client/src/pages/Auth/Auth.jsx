import { NavLink, useNavigate, useParams } from "react-router-dom";

import classes from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../services/internalApiServices";
import weightLifting from "../../assets/weight-lifting.jpg";
import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
import useAuthForm from "../../hooks/useAuthForm";

const Auth = () => {
  const params = useParams();
  const authType = params.authType;

  const { inputValue, setInputValue, didEdit, setDidEdit } =
    useAuthForm(authType);

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
    onError: (error) => {
      if (error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
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

  return (
    <>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={weightLifting} />
        </div>
        <div className={classes.formContainer}>
          <div>
            <NavLink to="/" className={classes.navLink}>
              &larr; Home
            </NavLink>
            <h1>{authType === "login" ? "Log in" : "Create Account"}</h1>
          </div>

          <form method="post" className={classes.form} onSubmit={handleSubmit}>
            {authType === "login" ? (
              <LoginForm
                inputValue={inputValue}
                handleInputChange={handleInputChange}
              />
            ) : (
              <SignupForm
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                didEdit={didEdit}
                isEmailValid={isEmailValid}
                isPasswordValid={isPasswordValid}
                invalid={classes.invalid}
                invalidText={classes.invalidText}
              />
            )}
            <p>
              {authType === "login"
                ? "Need an account?"
                : "Already have an account?"}{" "}
              <span>
                <NavLink
                  to={`/auth/${authType === "login" ? "signup" : "login"}`}
                  className={classes.navLink}
                >
                  {authType === "login" ? "Create an account" : "Log in"}
                </NavLink>
              </span>
            </p>
            <button
              disabled={isButtonDisabled()}
              className={
                isButtonDisabled() ? classes.disableButton : classes.button
              }
            >
              {authType === "login" ? "Log in" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
