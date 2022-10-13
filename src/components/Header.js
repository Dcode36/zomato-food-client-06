import React, { useEffect, useState } from "react";
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

function Header(props) {
  let [userLogin, setUserLogin] = useState(null);
  let { bgColor } = props;
  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("auth_token", token);
    Swal.fire({
      icon: "success",
      title: "Login Successfully",
    }).then(() => {
      window.location.reload();
    });
  };
  let onError = () => {
    alert("Something went wrong try again...");
  };

  let logout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token");
        window.location.reload();
      }
    });

    //  }
  };

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token) {
      var decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="176941409974-9g8cd6hm17tk8aehntrilrmbobkbo2in.apps.googleusercontent.com">
        <Login success={onSuccess} error={onError} />
        <SignUp />
        <header className={"col-12 py-2  bg-danger"}>
          <div className="container d-lg-flex justify-content-between ">
            <p className="m-0 brand">e!</p>

            {userLogin === null ? (
              <div>
                <button
                  className="btn text-white me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  Login
                </button>
                <button
                  className="btn text-white border border-white"
                  data-bs-toggle="modal"
                  data-bs-target="#sign-up"
                >
                  Create an account
                </button>
              </div>
            ) : (
              <div>
                <span className=" text-white me-3">
                  Welcome,{userLogin.name}
                </span>
                <button className="btn btn-warning" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;
