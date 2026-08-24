import React from 'react'

const Teclado = ({ clickButton }) => {
    const Citeclas = ["sin", "cos", "lan", "log", "tan", "π", "e", "^", "!", "√"];
    const teclas = ["7", "8", "9", "*", "/", "4", "5", "6", "-", "(", "1", "2", "3", "+", ")", ".", "0", "DEL", "AC", "=",]; 
    return (
        <div className="Teclas_Dysplay">
            <div className="Teclas_cientificas">
                {Citeclas.map((item, index) => (
                    <button key={index}     
                            onClick={() => clickButton(item)}>{item}</button>
                ))}
            </div>
            <line className='Linha'></line>
            <div className="Teclas_basicas">
                {teclas.map((item, index) => (
                    <button key={index}     
                            className={`${item >= "0" && item <= "9" ? "number" : ""} ${item === "=" && "equal"}`} 
                            onClick={() => clickButton(item)}>{item}</button>
                ))}
            </div>
        </div>
    )
}

export default Teclado