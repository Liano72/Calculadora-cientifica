import React from 'react'

const Display = ({expressao, resultado}) => {
  return (
    <div className='Display'>
        <p className="expressao">{expressao}</p>
        <p className="resultado">{resultado}</p>
    </div>
  )
}

export default Display