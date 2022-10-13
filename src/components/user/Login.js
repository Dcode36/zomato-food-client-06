import React, { useEffect, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


export default function Login(props) {

    let { success, error } = props;
    return (
        <>
            <GoogleOAuthProvider clientId='384451565383-l2ki9ltq8k28vg1h7b5l5er814jbi9dv.apps.googleusercontent.com'>

            <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center ms-5">
                                <div className="col-10 d-flex flex-column align-item-center justify-content-center ms-5 my-2">

                                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        success(credentialResponse);
                      }}
                      onError={() => {
                        error();
                      }}
                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer  ">
                            <p  className='me-5'>Don't Have an account <a href="" className='me-3'>create an account</a></p>
                        </div>
                    </div>
                </div>
            </div>
</GoogleOAuthProvider>
        </>
    )
}
