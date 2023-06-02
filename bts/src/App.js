import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import {Home} from './components/Home';  /// export default kullanmadığımızdan {Home} şeklinde kullandık
import {Department} from './components/Departments'; 
import {Employee} from './components/Employee'; 
import {Navigation} from './components/Navigation';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div className='container' >
      <Router>
      <h3 className='m-3 d-flex justify-content-center'>
        React Js With Bootstrap
      </h3>
      <h5 className='m-3 d-flex justify-content-center'>
        Employee Mangement Portal
      </h5>
      <Navigation />
    <Routes>
      <Route path='/' element={<Home/>} exact />  {/* path kök anlamında exact ise sadece bu kök e eşit olunca ve companentlerin iç içe girmemesi için*/}
      <Route path='/department' element={<Department />} exact />  {/* path kök anlamında exact ise sadece bu kök e eşit olunca ve companentlerin iç içe girmemesi için*/}
      <Route path='/employee' element={<Employee />} exact />  {/* path kök anlamında exact ise sadece bu kök e eşit olunca ve companentlerin iç içe girmemesi için*/}
    </Routes>
    </Router>
    </div>
  );
}

export default App;
