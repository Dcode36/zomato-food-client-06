import React, { useEffect, useState, useRef } from 'react'

import CommonNavbar from '../CommonNavbar'
import FilterSection from './FilterSection'
import SearchResult from './SearchResult'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
export default function QuickSearch() {
    let _filter =  {};
    let [searchParams] = useSearchParams();
    let [ filter , setFilter ] = useState({});
    let [mealType, setMealType] = useState(null);
    let [filterObj, setFilterObj] = useState({});
    let [locationList, setLocationList] = useState([]);

    let [searchList, setSearchList] = useState([]);
    let getFilterDetails = async (_filter) => {
        _filter = { ..._filter}
        let URL = "http://localhost:4000/api/filter";
        // filter

        if (searchParams.get("meal_type"))
        _filter['mealtype'] = searchParams.get("meal_type")

        try {
            let response = await axios.post(URL, _filter);
            let data = response.data;
            setSearchList([...data.result]);
        } catch (error) {
            alert("error");
            console.log(error)

        }
    }
    let getLocationList = async () => {
        let URL = "http://localhost:4000/api/get-location";

        try {
            let response = await axios.get(URL);
            let data = response.data;
            setLocationList([...data.location]);
        } catch (error) {
            alert("error");
            console.log(error)

        }
    }
    let filterData = (event, option) => {
        let { value } = event.target;
        let _filter =  {};
        

        switch (option) {
            case 'location':
                _filter['location'] = value;

                break; 

            case "sort":
                _filter["sort"] = value;
                break;
            case "cost":
                let cost = value.split('-')
                _filter["lcost"] = cost[0];
                _filter["hcost"] = cost[1];
                break;
                case "cuisine":
                    let checked = event.target.checked;
                    // console.log(checked);
            
                    let cuisine =
                      filterObj.cuisine == undefined ? [] : [...filterObj.cuisine];
                    if (checked) {
                      let isAvailable = cuisine.includes(Number(value));
                      if (isAvailable === false) cuisine.push(Number(value));
                    } else {
                      let position = cuisine.indexOf(Number(value));
                      cuisine.splice(position, 1);
                    }
                    if (cuisine.length > 0) {
                      _filter["cuisine"] = cuisine;
                    }
            
                    break;

        }
        setFilter({...filter, ..._filter})

        getFilterDetails(_filter);
       
    }
    useEffect(() => {
        getFilterDetails(filter);
        getLocationList();
    }, []);

    useEffect(()=>{
        getFilterDetails(filter)

    },[filter])

    return (
        <>
            <CommonNavbar />
            <div className=" row mt-3">
                <h2 className='fw-bold text-1 '>Breakfast Places in Mumbai</h2>
            </div>

            <div className=" search-result">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-lg-flex ">
                <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                    <FilterSection
                        locationList={locationList}
                        filterData={filterData}
                    />
                </div>
                <div className="col-lg-7 col-md-8 col-sm-12 col-xs-12">
                    <SearchResult searchList={searchList} />
                </div>
                </div>
            </div>
        </>
    )
}
