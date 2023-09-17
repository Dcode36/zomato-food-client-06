import React, { useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../user/Login';
import SignUp from '../user/SignUp'
import 'bootstrap/dist/css/bootstrap.css';
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode";



export default function Navbar(props) {
  let [userLogin, setUserLogin] = useState(null)

  let onSuccess = async (response) => {
    let token = response.credential;
    localStorage.setItem('auth_token', token)
    await Swal.fire({
      icon: 'success',
      title: 'Login Successfully',

    }).then(() => {
      window.location.reload();
    })

  }
  let onError = () => {
    alert("something went wrong try again");
  }

  let logout = () => {
    Swal.fire({
      title: 'Are you sure You want Logout?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token")
        window.location.reload();
      }
    })



  }

  useEffect(() => {
    let token = localStorage.getItem("auth_token")

    if (token) {
      var decoded = jwt_decode(token);
      setUserLogin(decoded)

    } else {
      setUserLogin(null)
    }


  }, [])


  return (
    <>
      <GoogleOAuthProvider clientId='384451565383-l2ki9ltq8k28vg1h7b5l5er814jbi9dv.apps.googleusercontent.com'>
        <Login success={onSuccess} error={onError} />
        <SignUp />
        <div className="d-flex justify-content-end">

          <div className="m-5 ">

            {
              userLogin === null ? (<div><a href="/" className='m-3 border border-white p-3 text-decoration-none text-white fs-6 rounded' data-bs-toggle="modal" data-bs-target="#login"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle mx-2" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                Login
              </a>
              </div>
              )
                :

                <div> <span href="#" className='px-4 text-decoration-none text-white fs-5   fw-bold' >
                  <i> Hey! {userLogin.name}</i>
                </span>
                  <a href="#" className='border border-white px-3 py-2 text-decoration-none text-white fs-6 rounded btn btn-outline-warning' onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle mx-2 " viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    Logout
                  </a>
                </div>

            }
          </div>
        </div>
      </GoogleOAuthProvider>


    </>
  )
}
