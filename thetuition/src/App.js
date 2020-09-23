import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <MainComponent />
        </div>
    </BrowserRouter>
  );
}

export default App;
