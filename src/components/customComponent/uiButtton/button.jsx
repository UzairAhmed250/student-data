import React from 'react'
import "./style.css"

export default function Button({children, onClick, className, style}) {
  return (
        <button onClick={onClick} className={ `custom-button  ${className}`} style={style}>
            {children}
        </button>
    
  )
}