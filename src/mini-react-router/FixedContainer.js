import React, { useContext } from 'react'

export default function (component, show) {
  return function (props) {
    return (
      <div style={
        {
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          background: '#fff',
          display: show ? 'black' : 'none'
        }
      }>{component}</div>
    )
  }
}