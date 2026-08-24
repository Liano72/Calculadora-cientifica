import React from 'react';
import Calculadora from './components/Calculadora';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/*Calculadora Científica</h1>*/}
      <Calculadora />
      <p className="Desenvolvedor">Desenvolvido por Lucas Liano <span>This Project</span></p>
    </div>
  );

};

export default App;