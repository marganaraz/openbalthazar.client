import React from 'react';
import './App.css';
import Login from './auth/Login';

const Init = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  if(user) {
    window.location.href='/menu';
  }
  else {
    return <Login />
  }
}

function App() {
  
  return (
    <div className="App">
      <div>
       {Init()}
    </div>
    </div>
    
  );
}

export default App;
