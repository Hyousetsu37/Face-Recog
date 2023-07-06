/* eslint-disable react/prop-types */
import { useState } from "react";

export function SignIn({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onEmailChange(event) {
    setEmail(event.target.value);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }
  function onSubmitChange() {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("_home_");
        }
      });
  }
  return (
    <div className="flex flex-col items-center place-content-center min-h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div className="w-full flex flex-col items-center">
              <h1 className="text-2xl font-semibold italic">Sign In</h1>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={onEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-900 focus:text-white"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={onPasswordChange}
              className="shadow bg-black-300 appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-900 focus:text-white"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmitChange}
            >
              Sign In
            </button>
            <p
              className="hover:text-white cursor-pointer"
              onClick={() => onRouteChange("_register_")}
            >
              Register
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
