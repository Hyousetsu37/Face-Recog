/* eslint-disable react/prop-types */

function Navigation({ onRouteChange, isSignedIn, onSignOut }) {
  if (isSignedIn === "_home_") {
    return (
      <>
        <nav className="flex justify-end">
          <button
            className="m-2 w-24 h-auto font-semibold bg-violet-500 border p-1 rounded shadow-xl shadow-teal-900/50 transition ease-in-out hover:scale-105 hover:text-white duration-300 active:translate-y-1 "
            onClick={() => {
              onRouteChange("_signin_");
              onSignOut();
            }}
          >
            Sign out
          </button>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="flex justify-end">
          <ul>
            <button
              className="m-2 w-24 h-auto font-semibold bg-violet-500 border p-1 rounded shadow-xl shadow-teal-900/50 transition ease-in-out hover:scale-105 hover:text-white duration-300 active:translate-y-1 "
              onClick={() => onRouteChange("_signin_")}
            >
              Sign in
            </button>
            <button
              className="m-2 w-24 h-auto font-semibold bg-violet-500 border p-1 rounded shadow-xl shadow-teal-900/50 transition ease-in-out hover:scale-105 hover:text-white duration-300 active:translate-y-1 "
              onClick={() => onRouteChange("_register_")}
            >
              Register
            </button>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navigation;
