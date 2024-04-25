import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isEnabled =
    !firstNameError &&
    !lastNameError &&
    !phoneError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    firstName &&
    lastName &&
    phone &&
    email &&
    password &&
    confirmPassword;

  const handleFirstNameChange = (e) => {
    const firstName = e.target.value;
    setFirstNameError(null);

    if (!/^[A-Za-zА-Яа-я]+$/.test(firstName) && firstName.length !== 0) {
      setFirstNameError("First name must contains letters only");
    }

    setFirstName(firstName);
  };

  const handleLastNameChange = (e) => {
    const lastName = e.target.value;
    setLastNameError(null);

    if (!/^[A-Za-zА-Яа-я]+$/.test(lastName) && lastName.length !== 0) {
      setLastNameError("Last name must contains letters only");
    }
    setLastName(lastName);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setPhoneError(null);

    if (!/\+\d{8,}$/.test(phone) && phone.length !== 0) {
      setPhoneError(
        "Phone must start with `+`, contains digits only and have length great than 7"
      );
    }
    setPhone(phone);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length !== 0) {
      setEmailError("Invalid email format");
    }
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordError(null);
    setConfirmPasswordError(null);
    if (password.length < 6) {
      setPasswordError("Password must have at least 6 characters");
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }
    setPassword(password);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPasswordError(null);
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }
    setConfirmPassword(confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpError(null);
    const signUpRequest = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      await axios.post(
        "http://localhost:8080/api/v1/auth/signUp",
        signUpRequest,
        { headers }
      );

      navigate("/signIn");
    } catch (error) {
      setSignUpError("An error occured. " + error.response.data.message);
      console.error("Помилка реєстрації:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center min-h-screen justify-center px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">
            Sign Up
          </h1>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                firstNameError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="First Name"
            />
          </div>
          {firstNameError && (
            <div className="text-red-500 text-xs italic">{firstNameError}</div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                lastNameError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="Last Name"
            />
          </div>
          {lastNameError && (
            <div className="text-red-500 text-xs italic">{lastNameError}</div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  fill="#d1d5db"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                phoneError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="Phone"
            />
          </div>
          {phoneError && (
            <div className="text-red-500 text-xs italic">{phoneError}</div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                emailError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="Email address"
            />
          </div>
          {emailError && (
            <div className="text-red-500 text-xs italic">{emailError}</div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                passwordError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="Password"
            />
          </div>
          {passwordError && (
            <div className="text-red-500 text-xs italic">{passwordError}</div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                confirmPasswordError
                  ? "border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                  : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
              }`}
              placeholder="Confirm Password"
            />
          </div>
          {confirmPasswordError && (
            <div className="text-red-500 text-xs italic">
              {confirmPasswordError}
            </div>
          )}

          <div className="mt-6">
            <button
              disabled={!isEnabled}
              className={`w-full px-6 py-3 text-xl font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                !isEnabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            {signUpError && (
              <div className="text-center text-red-500 text-lg italic">
                {signUpError}
              </div>
            )}
            <div className="mt-3 text-center ">
              <Link
                to="/signIn"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
