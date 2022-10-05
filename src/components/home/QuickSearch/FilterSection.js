import React from 'react'
import Pagiganation from './Pagiganation'

export default function FilterSection(props) {
    let { locationList ,  filterData } = props
    console.log(locationList)
    return (
        <>
            <div className="col-lg-8 filter-border  m-4 ">
                <div className="m-4 pt-3">
                    <p className='fw-bold fs-5'>Filters</p>
                    <div className="d-lg-block d-md-block d-sm-none d-xs-none">

                        <p >Select Location</p>
                        <select name="cuisine" id="cusine" className='pe-5 py-1 fw-lighter ms-1'
                     
                            onChange={(event)=> filterData(event, 'location')}>

                            <option value="" >Select Location</option>
                            {locationList.map((location, index) => {
                                return <option key={index}
                                    value={location.location_id}
                                    className='fw-lighter'>
                                    {location.name},{location.city}
                                </option>
                            })}

                        </select>
{/* 
                        <p className='mt-3'>Cusines</p>
                        <div className="cusine1">
                            <label htmlFor="">
                                <input type="checkbox" className='me-2' onChange={(event)=> filterData(event, "cuisine")} />
                                North Indian
                            </label>
                        </div>
                        <div className="cusine1">
                            <label htmlFor="Cusine">
                                <input type="checkbox" className='me-2' onChange={(event)=> filterData(event, "cuisine")}  />
                                South Indian
                            </label>
                        </div>
                        <div className="cusine1">
                            <label htmlFor="">
                                <input type="checkbox" className='me-2 bg-danger' onChange={(event)=> filterData(event, "cuisine")}  />
                                Chinese
                            </label>
                        </div>
                        <div className="cusine1">
                            <label htmlFor="">
                                <input type="checkbox" className='me-2' onChange={(event)=> filterData(event, "cuisine")} />
                                Fast Food
                            </label>
                        </div>
                        <div className="cusine1">
                            <label htmlFor="">
                                <input type="checkbox" className='me-2' onChange={(event)=> filterData(event, "cuisine")} />
                                Street Food
                            </label>
                        </div> */}


                        <p className='mt-3'>Cost for two</p>

                        <div className="cost ">
                            <div className="cost-1 ">
                                <input type="radio" name='costforTwo' className='me-2' value="0-500"    onChange={(event)=> filterData(event, "cost")} />
                                Less than ` 500
                            </div>
                            <div className="cost-1">
                                <input type="radio" name='costforTwo' className='me-2' value="500-1000"  onChange={(event)=> filterData(event, "cost")}/>` 500 to ` 1000
                            </div>
                            <div className="cost-1">
                                <input type="radio" name='costforTwo' className='me-2'  value="1000-1500"  onChange={(event)=> filterData(event, "cost")}/>` 1000 to ` 1500
                            </div>
                            <div className="cost-1">
                                <input type="radio" name='costforTwo' className='me-2' value="1500-2000"  onChange={(event)=> filterData(event, "cost")}/>` 1500 to ` 2000
                            </div>
                            <div className="cost-1">
                                <input type="radio" name='costforTwo' className='me-2' value="2000-200000"  onChange={(event)=> filterData(event, "cost")}/>` 2000+
                            </div>

                        </div>

                        <div className="sort pb-3">
                            <p className='fw-bold mt-3'>Sort</p>
                            <div className="cost-1">
                                <input type="radio" value="1" name="sortByPrices" 
                                onChange={(event)=> filterData(event, "sort")}
                                
                                className='me-2' />Price low to high
                            </div>
                            <div className="cost-1">
                                <input type="radio" value = "-1" name= "sortByPrices"
                                  onChange={(event)=> filterData(event, "sort")}
                                   className='me-2' />Price high to low
                            </div>
                        </div>
                        <div className="pagi py-4 ">
                        <Pagiganation/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
