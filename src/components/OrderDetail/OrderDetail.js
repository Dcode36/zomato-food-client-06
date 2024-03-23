import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import CommonNavbar from '../home/CommonNavbar'
import { modal } from 'bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import Swal from 'sweetalert2';
import 'react-multi-carousel/lib/styles.css';

export default function OrderDetail() {
    let navigate = useNavigate();
    let emailRef = useRef();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    };
    let params = useParams();
    let initRest = {
        aggregate_rating: 0,
        city: "",
        city_id: 0,
        contact_number: 0,
        cuisine: [],
        cuisine_id: [],
        image: "",
        locality: "",
        location_id: 0,
        mealtype_id: 0,
        min_price: 0,
        name: "",
        rating_text: "",
        thumb: [],
        _id: ""
    }
    let [rDetails, setRDetails] = useState({ ...initRest });
    let [isContact, setIsContact] = useState(false);
    let [subTotal, setSubTotal] = useState(0);
    let [menuItem, setMenuItem] = useState([]);
    let getRestaurantDetails = async () => {
        let URL = "http://localhost:8900/api/get-restaurant-by-id/" + params.id;
        try {
            let response = await axios.get(URL);
            let data = response.data;
            if (data.status === true) {
                setRDetails({ ...data.result })
            } else {
                setRDetails({ ...initRest })
            }

        } catch (error) {
            alert(error)
            console.log(error)
        }



    };
    let loadScript = async () => {

        const scriptElement = document.createElement('script')
        scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js"
        scriptElement.onload = () => {
            return true
        }
        scriptElement.onerror = () => {
            return false
        }
        document.body.appendChild(scriptElement)

    }

    let makepayment = async () => {
        let isLoaded = await loadScript()
        if (isLoaded === false) {
            alert("unable to load payment sdk ")
            return false
        }
        let URL = "http://localhost:8900/api/payment";
        let sendData = {
            amount: subTotal,


        };
        let { data } = await axios.post(URL, sendData);
        let { order } = data

        console.log();
        var options = {
            key: "rzp_test_Wni9cy81wt5dpi",
            amount: order.amount,
            currency: "INR",
            name: "zomato clone payment",
            description: "This is food payment",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
            order_id: order.id,
            handler: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successfully',

                }).then(() => {
                    navigate('/')
                    window.location.reload();
                })
            },
            prefill: {
                "name": "Digvijay kadam",
                "email": "kadamdigvijay36@gmail.com",
                "contact": "7719964183"
            },

        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open();


    }

    let getMenuList = async () => {
        let URL = "http://localhost:8900/api/get-menu-item?rid=" + params.id;
        try {
            let response = await axios.get(URL);
            let data = response.data;
            if (data.status === true) {
                setMenuItem([...data.menu_items])
            } else {
                alert("no ");
            }

        } catch (error) {
            alert(error)
            console.log(error)
        }


    }

    let incMenuItemCount = (index) => {
        let _menuItem = [...menuItem]
        _menuItem[index].qty += 1;
        setMenuItem(_menuItem)

    };
    let decMenuItemCount = (index) => {
        let _menuItem = [...menuItem]
        _menuItem[index].qty -= 1;
        setMenuItem(_menuItem);

    };

    useEffect(() => {
        let subTotal = menuItem.reduce((pValue, cValue) => {
            return pValue + cValue.price * cValue.qty;
        }, 0);
        setSubTotal(subTotal);
    }, [menuItem])
    //on mounting
    useEffect(() => {
        getRestaurantDetails();
    }, []);



    return (
        <>
            <CommonNavbar />

            <div className="image-gallery  d-lg-flex justify-content-center  position-relative">
                <img src={"/images/" + rDetails.image} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" alt='breakfast' />
                {/* 
                <button
                    className='py-2 px-2 fw-bold border-0 w-100 position-absolute bottom-0 right-0'
                    style={{ width: "100px" }}
                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Click to see Image Gallery
                </button> */}
                <button className='py-2 px-2 border-0 fw-bold' data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Click to see Image Gallery
                </button>
            </div>

            <div className="product-detail  ">
                <div className="product-info">
                    <div className="">
                        <div className=" mt-5">
                            <p className='text-2 fw-bold fs-3' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-shop mx-3" viewBox="0 0 16 16">
                                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                                </svg>
                                {rDetails.name}</p>
                        </div>
                    </div>

                    <div className="product-navbar row">
                        <div className="col-3  border-bottom">
                            <div className="overview d-flex justify-content-between " >
                                <p className={
                                    isContact === false ? 'border-bottom fw-bold  border-3  border-danger'
                                        : null
                                }
                                    onClick={() => setIsContact(false)}>
                                    Overview
                                </p>
                                <p className={isContact === true ? 'border-bottom fw-bold  border-3  border-danger'
                                    : null
                                }
                                    onClick={() => setIsContact(true)}>
                                    Contact
                                </p>
                            </div>


                        </div>
                        <div className="col-9 border-bottom order-btn d-flex justify-content-end">
                            <button className='py-2 px-2 border-0 bg-danger text-white   fw-bold'
                                data-bs-toggle="modal" data-bs-target="#total"
                                onClick={getMenuList}
                            >
                                Place Online Order
                            </button>
                        </div>

                        {
                            isContact === false ? (

                                <div className="info-box">
                                    <p className='fs-4 fw-bold mt-3'>About this place</p>
                                    <p className='fw-bold'>Cuisine</p>
                                    <p className='small'>{rDetails.cuisine.reduce((pV, cV) => pV + ', ' + cV.name, '').substring(2)}</p>
                                    <p className='fw-bold'>Average Cost</p>
                                    <p className='small'>₹ {rDetails.min_price}</p>
                                </div>
                            ) : (
                                <div className="div">
                                    <p className='fs-4 fw-bold mt-3'>Place Information</p>
                                    <div className="contact-info mt-3">

                                        <p className='fw-bold'>Phone Number</p>
                                        <p className='call'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                            </svg>
                                            +{rDetails.contact_number}</p>

                                        <p className='fw-bold '>Ratings : {rDetails.aggregate_rating}, {rDetails.rating_text}</p>
                                        <p className='small'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                            {rDetails.locality},{rDetails.city}</p>
                                    </div>
                                </div>)}

                        <div className="div py-5">

                        </div>
                        {/* modal */}

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-fullscreen m-0">
                                <div className="modal-content bg-dark">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close btn btn-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <Carousel
                                            responsive={responsive}
                                            infinite={true}
                                            keyBoardControl={true}
                                        >
                                            {rDetails?.thumb?.map((value, index) => {
                                                return (
                                                    <div key={index}>
                                                        <img
                                                            src={"/images/" + value}
                                                            alt="restaurant"
                                                            className="rounded-4 caroimg "
                                                        />
                                                    </div>
                                                );
                                            })}

                                        </Carousel>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* total  */}
                    <div className="modal fade" id="total" aria-hidden="true" aria-labelledby="total" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="total">{rDetails.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {menuItem.map((item, index) => {
                                        return <div className="item-1 d-flex" key={index}>
                                            <div className="cart-item">
                                                <p className='fs-6 fw-bold'>{item.name}</p>
                                                <p className='fw-bold'>₹ {item.price}</p>
                                                <p className='small'> {item.description}</p>
                                            </div>
                                            <div className="add">
                                                <img src={"/images/" + item.image} alt='' />
                                                {item.qty === 0 ? (
                                                    <button className='btn btn-primary add-btn  position-absolute'
                                                        onClick={() => incMenuItemCount(index)}>
                                                        Add
                                                    </button>
                                                ) : (
                                                    <div className="inc-dic ">
                                                        <span className='px-1' onClick={() => decMenuItemCount(index)}>-</span>
                                                        <span className='px-1'>{item.qty}</span>
                                                        <span className='px-1 ' onClick={() => incMenuItemCount(index)} >+</span>
                                                    </div>
                                                )}
                                            </div>
                                            <hr />
                                        </div>

                                    })}

                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                    <p className='text-2 fs-3 me-5 fw-bold'>Subtotal<span className='me-5'> ₹ {subTotal}</span></p>
                                    <button className="btn btn-danger" data-bs-target="#exampleModalToggleLabel2" data-bs-toggle="modal" data-bs-dismiss="modal">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModalToggleLabel2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel2">{rDetails.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Name</label>
                                            <input type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                            <input type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Address</label>
                                            <textarea className="form-control" id="message-text"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={makepayment}>Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
