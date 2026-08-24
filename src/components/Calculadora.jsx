import React, { useState,  useEffect  } from 'react'
import Display from './Display'
import Teclado from './Teclado'

const Calculadora = () => {

  const [expressao, setExpressao] = useState('');
  const [displayEXP, setDisplayEXP] = useState('');
  const [resultado, setResultado] = useState('0');
  const [erro, setErro] = useState(false);

  const Teclas_cientificas = {

    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",

  };
  useEffect(() => {
    function handleKeyDown(event) {
        const key = event.key;

        // Números
        if (key >= "0" && key <= "9") {
            clickButton(key);
        }

        // Operadores
        else if (["+", "-", "*", "/"].includes(key)) {
            clickButton(key);
        }

        // Enter ou =
        else if (key === "Enter" || key === "=") {
            clickButton("=");
        }

        // Backspace
        else if (key === "Backspace") {
            clickButton("DEL");
        }

        // Escape
        else if (key === "Escape") {
            clickButton("AC");
        }

        // Ponto
        else if (key === ".") {
            clickButton(".");
        }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, [expressao, displayEXP, erro]);
  // Execução de Calculo
  function calcResultado() {
    if (expressao.length !== 0) {
      try {

        let calcule = eval(expressao);

        calcule = parseFloat(calcule.toFixed(4));
        setResultado(calcule);

      } catch (error) {

        setResultado("Ocorreu um erro");
        setErro(true);

      }
    }
    else {

      setResultado("Ocorreu um erro");

    }
  }
  function clickButton(value) {
    // Limpa o display, após erro
     if (erro) {  
        setExpressao(value);
        setDisplayEXP(value);
        setResultado("0");
        setErro(false);
        return;
    }
    // Limpa o display
    else if (value === "AC") {

      setExpressao("");
      setDisplayEXP("");
      setResultado("0");
    }
    // Apaga ultimo item do Display
    else if (value === "DEL") {

      setDisplayEXP(displayEXP.slice(0, -1));
      setExpressao(expressao.slice(0, -1));

    }
    //
    else if (Teclas_cientificas.hasOwnProperty(value)) {

      setDisplayEXP(displayEXP + value);
      setExpressao(expressao + Teclas_cientificas[value]);

    }
    //Extrai o ultimo valor
    else if (value === "!") {

      const ultimoNum = extrairUltimoNum(expressao);

      if (ultimoNum != null) {

        const num = parseFloat(ultimoNum);
        
        setDisplayEXP(displayEXP + value);
        setExpressao(expressao.replace(ultimoNum,
        fatorial(num)));
      }
    }
    //Chama a função de calculo
    else if (value === "=") calcResultado();

    //Filtro de operador / Imprime resultado no Display
    else {

      const operadores = ["+", "-", "*", "/"];

      const ultimoCaractere = expressao.slice(-1);

      if (
        operadores.includes(value) &&
        operadores.includes(ultimoCaractere)
      ) {
        return;
      }

      setExpressao(expressao + value);
      setDisplayEXP(displayEXP + value);
    }

    // Calcula o fatorial
    function fatorial(n) {

      let resultado = 1;

      for (let i = 1; i <= n; i++) resultado *= i;

      return resultado;
    }

    // Extrai ultimo numero
    function extrairUltimoNum(exp) {

      const numeros = exp.match(/\d+/g);

      return numeros ? numeros[numeros.length - 1] :

      null;
    }

  }
  return (
    <div className='Calculadora'>

      <Display expressao={displayEXP} resultado={resultado} />
      <Teclado clickButton={clickButton} />

    </div>
  )
}

export default Calculadora;