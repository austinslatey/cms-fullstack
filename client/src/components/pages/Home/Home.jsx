import { useEffect, useState } from "react";
import ThoughtContainer from "../../Thoughts/ThoughtContainer/ThoughtContainer";
import ThoughtList from "../../Thoughts/ThoughtList/ThoughtList";
import LoginBlocker from "../Login/LoginBlocked";
import { useAppContext } from "../../../providers/AppProvider"
import "./Home.css";

export default function Home() {
  const [thoughts, setThoughts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const { currentUser } = useAppContext();

  useEffect(() => {
    async function fetchThoughts() {
      try {
        const response = await fetch("http://localhost:3001/api/thoughts");
        if (!response.ok) {
          throw new Error("Failed to fetch thoughts.");
        }
        const data = await response.json();
        if (data.status === "success") {
          setThoughts(data.payload);
        } else {
          throw new Error("Failed to fetch thoughts.");
        }
      } catch (error) {
        console.error("Error fetching thoughts:", error);
      }
    }

    fetchThoughts();
  }, []);

  useEffect(() => {
    // console.log(currentUser)
    currentUser && setLoggedIn(true)
  }, [currentUser])

  return (
    <>
      <div className="bg-secondary">
        {/* if else for displaying post creation*/}
        {(!loggedIn) ? (
          <>
            <LoginBlocker />
          </>
        ) : (
          <>
            <ThoughtContainer />
          </>
        )}



        <div className="container">
          <ThoughtList thoughts={thoughts} />
        </div>

      </div>
    </>
  )
}