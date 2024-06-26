import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {

  return (
    <footer>
      <Link className='about' to='/about'>About</Link>
    </footer>
  )
}