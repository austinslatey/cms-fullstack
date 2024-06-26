import React from "react"
import { Link } from "react-router-dom"
import Nav from '../Nav/Nav'
import './Header.css'


export default function Header() {

    return (
        <header>
            <Link to='/'></Link>
            <Nav />
        </header>
    )
}