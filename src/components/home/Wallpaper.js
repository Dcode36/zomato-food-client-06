import React from 'react'
import Navbar from './Navbar'
import SearchSection from './SearchSection'

export default function Wallpaper() {
  return (
    <div>
      <div className="wallpaper-section">
      <Navbar/>
      <SearchSection/>
      </div>
    </div>
  )
}
