import React from 'react'

export default function Button({children, onClick, className, style}) {
  return (
    <div>
        <button onClick={onClick} className={className} style={style}>
            {children}
        </button>
    </div>
  )
}