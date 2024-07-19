import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home/Home"
import About from "./components/pages/About/About"
import SinglePost from "./components/pages/SinglePost/SinglePost"
import UserSettings from "./components/pages/UserSettings/UserSettings"
import Profile from "./components/pages/Profile/Profile"
import Signup from "./components/pages/Signup/Signup"
import Login from "./components/pages/Login/Login"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { AppProvider } from "./providers/AppProvider"
import "../reset.css";



function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="bodycontent">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usersettings" element={<UserSettings />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/thought/:id" element={<SinglePost />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App