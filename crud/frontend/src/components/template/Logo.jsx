import React from 'react'
import logo from '../../assets/images/logo512.png'
import './Logo.css'

export default props => 
    <aside className='logo'>
        <a href='/' className='logo'>
        <img src={logo} alt='logo' />
        </a>
    </aside>