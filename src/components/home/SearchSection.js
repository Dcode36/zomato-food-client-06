import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
export default function SearchSection() {
    let navigate = useNavigate();
    let locationRef = useRef();
    let [locList, setLocList] = useState([]);
    let [restaurantList, setRestaurantList] = useState([]);
    let [selectLoc, setSelectLoc] = useState(null);
    let [restsDisable, setRestDisabled] = useState(true);
    let getLocationList = async (event) => {
        let city = event.target.value;
        setSelectLoc(null);
        setRestDisabled(true);
        if (city === "" || city.length < 2) {
            setLocList([])
            return false;
        }


        let URL = "http://localhost:8900/api/get-location-by-city?city=" + city;

        try {
            let responce = await axios.get(URL);

            let { location } = responce.data;
            setLocList([...location])
        } catch (error) {
            alert(error)
            console.log(error)
        }


    }
    let selectLocation = (location) => {
        location = JSON.parse(location)
        setSelectLoc({ ...location });
        setRestDisabled(false);
        setLocList([]);
        locationRef.current.value = `${location.name},${location.city}`;

    }

    let getRestaurantDetails = async (event) => {
        let restaurant = event.target.value;
        if (restaurant === "" || restaurant.length < 2) {
            setLocList([]);
            return false;
        }

        let URL = `http://localhost:8900/api/get-restaurnat-by-location-id?lid=${selectLoc.location_id}&rest=${restaurant}`;

        try {
            let response = await axios.get(URL);
            let { result } = response.data;
            setRestaurantList([...result]);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            // Update state or UI to indicate error to the user
        }
    }


    let gotoRestaurant = (id) => {
        navigate('/restaurant/' + id);

    }


    return (
        <>
            <div className=" d-flex justify-content-center align-items-center  flex-column w-100">

                <div>
                    <div className="logo d-flex justify-content-center align-items-center rounded-circle">
                        <p className='text-danger text-align-center  fw-bold '>e!</p>
                    </div>
                </div>
                <div className="col-12">
                    <p className='fs-2 text-white fw-bold text-center py-2'>Find the best restaurants, cafés, and bars</p>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-1 flex-wrap'>
                    <div >
                        <input
                            type="text"
                            placeholder='Please type a location'
                            className='py-2 px-2 '
                            onChange={getLocationList}
                            ref={locationRef}
                            style={{ width: "300px" }}
                        />
                        <ul className="list-group  position-absolute mt-1 ">
                            {locList.map((location) => {
                                return <li className="list-group-item list1" key={location._id}
                                    onClick={() => selectLocation(`${JSON.stringify(location)}`)}>
                                    {location.name},{location.city}
                                </li>
                            })
                            }
                        </ul>
                    </div>
                    <div width="50%">
                        <input
                            type="text"
                            placeholder='Please type a location'
                            className='py-2 px-2'
                            onChange={getRestaurantDetails}
                            disabled={restsDisable}
                            style={{ width: "500px" }}
                        />
                        <ul className="list-group  position-absolute mt-1 ">
                            {restaurantList.map((restaurant) => {
                                return <li
                                    className="list-group-item"
                                    key={restaurant._id}
                                    onClick={() => gotoRestaurant(restaurant._id)}
                                >

                                    <div className="d-flex ">
                                        <img src={"/images/" + restaurant.image} alt="" className='search-image' />
                                        <div className="restaurant ms-3">
                                            <p className='fw-bold '>
                                                {restaurant.name}
                                                <br />
                                                <span className='small fw-lighter'>
                                                    {restaurant.locality},{restaurant.city}
                                                </span>
                                            </p>

                                        </div>
                                    </div>
                                </li>
                            })
                            }
                        </ul>
                    </div>
                </div>

                <div className="py-5 "></div>


            </div>
        </>
    )
}
