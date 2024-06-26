import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home/Home"
import About from "./components/pages/About/About"
import Profile from "./components/pages/Profile/Profile"
import Signup from "./components/pages/Signup/Signup"
import Login from "./components/pages/Login/Login"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { AppProvider } from "./providers/AppProvider"



function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App