import React, { useState } from 'react';

import QuickItem from './home/QuickItem/QuickItem';
import Wallpaper from './home/Wallpaper'

export default function Home() {
  const [loading, setLoading] = useState(true)
  return (
    <>

      <Wallpaper />
  
      <QuickItem />


    </>
  );
}
