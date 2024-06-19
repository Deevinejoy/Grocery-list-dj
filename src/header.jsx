import React from 'react'

const Header = (props) => {
  const headerStyle = {
      backgroundColor: ' #533023',
      color: 'white',
      height: '50px',
      textAlign: 'center'
  }
  return (
    <header style={headerStyle}>
      <h1>
        {props.title}
     </h1>
      
    </header>
  )
}

export default Header