import { useState, useEffect } from "react";

const useAuthForm = (authType) => {
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

  return {
    inputValue,
    setInputValue,
    didEdit,
    setDidEdit,
  };
};

export default useAuthForm;
