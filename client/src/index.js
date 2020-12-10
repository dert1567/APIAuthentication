import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'


import App from './components/App'
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers'
import reportWebVitals from './reportWebVitals';


 const jwtToken = localStorage.getItem('JWT_TOKEN')

ReactDOM.render(
  <Provider store ={createStore(reducers,  {
    auth:{
      token: jwtToken,
      isAuthenticated: jwtToken ? true: false
    }
  }, applyMiddleware(reduxThunk))}>
  <BrowserRouter> 
    <App>
      <Route exact path="/" component={Home} />
      <Route  exact path="/signup" component={SignUp} />
      <Route  exact path="/signin" component={SignIn} />
      <Route  exact path="/dashboard" component={Dashboard} />
    </App>
 </BrowserRouter>
 </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
