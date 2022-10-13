import React from 'react'
import Pagiganation from './Pagiganation'
import SearchItem from './SearchItem'

export default function SearchResult(props) {

  let {searchList }= props;

  return (
    <>
      <div className="col-12 mt-4 search-result-border ">
        {
          searchList.map((item,index)=>{
            return <SearchItem key={index} item ={item}/>
          })
       

}
       
      </div>

    </>
  )
}
