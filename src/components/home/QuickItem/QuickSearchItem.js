import React from 'react'
import { useNavigate} from 'react-router-dom'

export default function QuickSearchItem(props) {
    let { meal} = props;
    let navigate = useNavigate();
    let gotoQuickSearch = (id)=>{
        navigate("/quick-search?meal_type="+ id );
    }
    return (
    <>
            <div 
            className="QuickProduct mt-sm-1 col-lg-4  col-md-6  col-sm-10 col-xs-10 d-flex "
            onClick={()=>gotoQuickSearch(meal.meal_type)}
            >
                <img src={"/images/" + meal.image}/>
                <div className="item-info m-2">
                    <p className='fw-bold fs-5'>{meal.name}</p>
                    <p><span>{meal.content}</span></p>
                </div>
                </div>
            </>
            )
}
