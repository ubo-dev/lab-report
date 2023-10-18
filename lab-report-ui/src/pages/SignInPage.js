import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../services/UserService";

export default function SignInPage() {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (signUp) navigate("/register");
  });

  const [userCredentials, setUserCredentials] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUserCredentials({ ...userCredentials, [e.target.name]: value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log(userCredentials);
    UserService.loginUser(userCredentials)
      .then((response) => {
        console.log(response.data);
        navigate("/report/all");
        // Handle data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={userCredentials.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={userCredentials.password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button
                  onClick={loginUser}
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? 
                  <button 
                  onClick={setSignUp}
                  className="grid justify-items-end bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Sign up</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
