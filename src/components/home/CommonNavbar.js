import React from 'react'
import { useNavigate } from 'react-router-dom' 
export default function CommonNavbar() {
  let navigate = useNavigate();
  let gotoHome =()=>{
    navigate('/')
  }
  return (
    <>
    <div className="row">
        <div className="common-navbar d-lg-flex justify-content-lg-around  d-md-flex d-sm-block d-xs-block col-12">
            <div className="navbar-logo d-flex justify-content-center align-item-center mx-3 mt-2  "onClick={gotoHome}>
                <p className='fs-2 fw-bold '>e!</p>
            </div>
            <div className="nav-btn col-xs-12  d-lg- d-md-block d-sm-block d-xs-none">
                <a className='text-white text-decoration-none'data-bs-toggle="modal" href='/login' data-bs-target="#login">Login</a>
                <a className='text-white text-decoration-none border border-white ' href='/signup' data-bs-toggle="modal" data-bs-target="#signup">Create An Account</a>
            </div>
        </div>

        
    </div>
    </>
  )
}
