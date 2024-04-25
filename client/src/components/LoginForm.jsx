const LoginForm = ({ inputValue, handleInputChange }) => {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={inputValue.email}
        onChange={(event) => handleInputChange("email", event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={inputValue.password}
        onChange={(event) => handleInputChange("password", event.target.value)}
      />
    </>
  );
};

export default LoginForm;
