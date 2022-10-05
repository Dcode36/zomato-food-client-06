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


        let URL = "https://zomato-food-06.herokuapp.com/api/get-location-by-city?city=" + city;

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
            setLocList([])
            return false;
        }


        let URL = `https://zomato-food-06.herokuapp.com/api/get-restaurnat-by-location-id?lid=${selectLoc.location_id}&rest=${restaurant}`;

        try {
            let response = await axios.get(URL);
            let { result } = response.data;
            setRestaurantList([...result])


        } catch (error) {
            alert(error)
            console.log(error)
        }
    }
    
    let gotoRestaurant = (id)=>{
        navigate('/restaurant/' + id);
       
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center ">
                <div className="logo d-flex justify-content-center align-items-center rounded-circle">
                    <p className='text-danger text-align-center  fw-bold '>e!</p>
                </div>

            </div>
            <div className="col-12">
                <p className='fs-2 text-white fw-bold text-center py-2'>Find the best restaurants, cafés, and bars</p>
            </div>


            <div className=" d-lg-flex justify-content-lg-center   d-sm-block justify-content-sm-center  inputes">
                <div className="d-flex flex-column postion-relative col-lg-2 col-md-4 mx-sm-2 col-sm-8 col-xs-12">
                    <input type="text"
                        className=' py-2 inputes1 '
                        placeholder='Please type a location'
                        onChange={getLocationList}
                        ref={locationRef}
                    />
                    <ul className="list-group  position-absolute mt-5  ">
                        {locList.map((location) => {
                            return <li className="list-group-item list1" key={location._id}
                                onClick={() => selectLocation(`${JSON.stringify(location)}`)}>
                                {location.name},{location.city}
                            </li>
                        })
                        }

                    </ul>
                </div>
                <div className="d-flex flex-column  postion-relative col-lg-9 col-md-4 mx-sm-2 col-sm-8 col-xs-12">
                    <div className="col-lg-5 col-md-7 mx-sm-2 my-sm-1  col-sm-8 col-xs-12 py-2 ">
                        <input type="text" className='py-2 col-12 inputes2'
                            placeholder='Search for restaurants'
                            onChange={getRestaurantDetails}
                            disabled={restsDisable}
                        />
                        <ul className="list-group  position-absolute  " style={{ width: " 31%" }}>
                            {restaurantList.map((restaurant) => {
                                return <li
                                    className="list-group-item"
                                    key={restaurant._id}
                                    onClick={()=>gotoRestaurant(restaurant._id)}
                                >

                                    <div className="d-flex ">
                                        <img src={"/images/" + restaurant.image} alt="" className='search-image' />
                                        <div className="restaurant ms-3">
                                            <p className='fw-bold '>
                                                {restaurant.name}
                                                <br />
                                                <span className='small fw-lighter'>
                                                    {restaurant.locality},{ restaurant.city}
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

            </div >
        </>
    )
}
