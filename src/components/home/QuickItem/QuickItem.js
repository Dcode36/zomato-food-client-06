import React, { useEffect, useState } from 'react'

import axios from 'axios'
import QuickSearchItem from './QuickSearchItem'

export default function QuickItem(props) {
    let [mealType, setMealType] = useState([]);
    let getQuickSerachData = async () => {
        let URL = "http://localhost:8900/api/get-meal-type";

        try {
            let responce = await axios.get(URL);
            let { status, meal_type } = responce.data;
            if (status) {
                setMealType([...meal_type]);
            }
            setLoading(false)
        } catch (error) {
            alert(error);
            console.log(error)
        }
    }
    useEffect(() => {
        getQuickSerachData()
    }, [])
    const [loading, setLoading] = useState(true);
    return (
        <>
            <div className="container">
                <div className="item-info mt-3">
                    <p className='fs-3 fw-bold '><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-search-heart" viewBox="0 0 16 16">
                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                        <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
                    </svg>
                        Quick Searches </p>
                    <p><span>Discover restaurants by type of meal</span> </p>
                </div>



                <div className="row d-flex gap-3">
                    {
                        loading ?
                            <>
                                <div>Loading.....</div>
                            </>
                            :
                            <>
                                {
                                    mealType.map((meal) => {
                                        return <QuickSearchItem meal={meal} key={meal._id} />;
                                    })

                                }
                            </>

                    }

                </div>
                <div className='py-5'>

                </div>
            </div>

        </>
    )
}
