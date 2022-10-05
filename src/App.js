import React from 'react';
import './App.css';
import{ Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import QuickSearch from './components/home/QuickSearch/QuickSearch';
import OrderDetail from './components/OrderDetail/OrderDetail';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';

function App() {
  return <>
  <Login/>
  <SignUp/>
  <Routes>
    <Route path= "/" element ={<Home />}/>
    <Route path= "/quick-search" element ={<QuickSearch/> }/>
    <Route path= "/restaurant/:id" element ={ <OrderDetail/>}/>
    
    {/* <Route path= "/login" element={<Login/>}/> */}
  </Routes>


  </>
}

export default App;
