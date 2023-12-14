import React from 'react'
import { Routes, Route } from 'react-router-dom';
import WinesApp from './WinesApp';
import ShowWines from './Components/ShowWines.component';
import StoreWines from './Components/StoreWines.component';
import ShowCart from './Components/ShowCart.component';

function App (){
    return (
          <div className='container-routes'>
            <Routes>
              <Route path='/' element={<WinesApp />} />
              <Route path='/show_wines' element={<ShowWines />}/> 
              <Route path='/store' element={<StoreWines />}/>
              <Route path='/cart' element={<ShowCart />}/>
            </Routes>
          </div>
    );
  }

export default App;
