import React from 'react';
import './App.css';
import Login from './Login';

const Init = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if(user) {
    return <div>
          <span>
          Welcome back{user.name}!!
          </span>
          <button onClick={(e) => window.location.href='/menu'}>Entrar!</button>
        </div>
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
