import React from 'react'
import { Routes, Route } from 'react-router-dom';
import WinesApp from './WinesApp';
import ShowWines from './Components/ShowWines';
import StoreWines from './Components/StoreWines';
import ShowCart from './Components/ShowCart';
import WinesDescr from './Components/WinesDescr';

function App (){
    return (
          <div className='container-routes'>
            <Routes>
              <Route path='/' element={<WinesApp />} />
              <Route path='/show_wines' element={<ShowWines />}/> 
              <Route path='/store' element={<StoreWines />}/>
              <Route path='/cart' element={<ShowCart />}/>
              <Route path='/store/description' element={<WinesDescr />}/>
            </Routes>
          </div>
    );
  }

export default App;
