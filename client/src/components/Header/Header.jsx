import Nav from '../Nav/Nav'
import './Header.css'
import { useAppContext } from "../../providers/AppProvider";


export default function Header() {
  const { currentUser } = useAppContext();
  return (
    <header>
      <Nav avatar={currentUser?.avatar || {}} />
    </header>
  )
}