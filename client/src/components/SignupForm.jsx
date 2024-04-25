const SignupForm = ({
  inputValue,
  handleInputChange,
  handleInputBlur,
  didEdit,
  isEmailValid,
  isPasswordValid,
  invalid,
  invalidText,
}) => {
  return (
    <>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        value={inputValue.firstName}
        onChange={(event) => handleInputChange("firstName", event.target.value)}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        value={inputValue.lastName}
        onChange={(event) => handleInputChange("lastName", event.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="example@email.com"
        value={inputValue.email}
        onBlur={() => handleInputBlur("email")}
        onChange={(event) => handleInputChange("email", event.target.value)}
        className={`${didEdit.email && !isEmailValid && invalid}`}
      />
      {didEdit.email && !isEmailValid && (
        <p className={invalidText}>Please enter a valid email address</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password must be at least 8 characters"
        value={inputValue.password}
        onBlur={() => handleInputBlur("password")}
        onChange={(event) => handleInputChange("password", event.target.value)}
        className={`${didEdit.password && !isPasswordValid && invalid}`}
      />
      {didEdit.password && !isPasswordValid && (
        <p className={invalidText}>
          Password must be at least 8 characters long
        </p>
      )}
    </>
  );
};

export default SignupForm;
