import React from 'react'
import { Routes, Route } from 'react-router-dom';
import WinesApp from './WinesApp';
import ShowWines from './Components/ShowWines.component';
import StoreWines from './Components/StoreWines.component';
import CreateAccount from './Components/CreateAccount.component';

function App (){
    return (
          <div className='container-routes'>
            <Routes>
              <Route path='/' element={<WinesApp />} />
              <Route path='/show_wines' element={<ShowWines />}/> 
              <Route path='/store' element={<StoreWines />}/>
            </Routes>
          </div>
    );
  }

export default App;
