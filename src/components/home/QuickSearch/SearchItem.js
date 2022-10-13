import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchItem(props) {
    let { item } = props;
    let navigate = useNavigate();
    let gotorestaurant = (id) => {
        navigate("/restaurant/" + id);
    }
    return (
        <>
            <div
                className="col-lg-10 col-md-10 col-sm-11 col-xs-11  Serach-Item mt-3"
                onClick={() => gotorestaurant(item._id)}
            >
                <div className="row d-flex  ">
                    <div className="col-4 ">
                        <img src={process.env.PUBLIC_URL + "./images/" + item.image} />
                    </div>
                    <div className="col-8 ">
                        <p className='fs-3 fw-bold mt-4'>{item.name}</p>
                        <p className='fw-bold'>{item.locality}</p>
                        <p className='small '> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>{item.city}</p>
                    </div>
                    <div className="line col-11"></div>
                </div>

                <div className="price row">

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 w-lighte">
                        <p>Ratings: <span className='fw-bold mx-2' >{item.aggregate_rating} Stars</span> </p>
                        <p> COST FOR TWO: <span className='fw-bold mx-2' >₹ {item.min_price}</span> </p>
                    </div>



                </div>
            </div>
        </>
    )
}
