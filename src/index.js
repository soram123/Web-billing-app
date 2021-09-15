import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './Store/configureStore' 


const store = configureStore()

store.subscribe(()=>{
   //console.log('state update', store.getState())
})

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
  
  ,
   document.getElementById('root')
)