import React, { useState, useEffect } from 'react';

import QuickItem from './home/QuickItem/QuickItem';
import Wallpaper from './home/Wallpaper'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay for demonstration purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className='m-5 text-center '>Loading...</div> // You can replace this with your loader component
      ) : (
        <>
          <Wallpaper />
          <QuickItem />
        </>
      )}
    </>
  );
}
