import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import ChangeUsername from "../../Settings/Username/Username";
import ChangeEmail from "../../Settings/Email/Email";
import DeleteAccount from "../../Settings/DeleteAccount/DeleteAccount";
import ChangeBio from "../../Settings/Bio/Bio";

export default function UserSettings() {
  const { currentUser } = useAppContext();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  return (
    <>
      <div className="profile-header bg-dark text-light text-center min-vh-100">
        <div className="container">
          <h1>{userData.username}'s Profile</h1>
          <div className="row">
            <nav className="col-md-3">
              <div className="list-group">
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Public Profile</li>
                </div>
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Appearance</li>
                </div>
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Accessibility</li>
                </div>
              </div>
            </nav>
            <div className="col-md-9">
              <div className="container public-profile border">
                <h2 className="text-light">Profile Settings</h2>

                {/* Profile settings content */}
                <ChangeUsername />
                <ChangeEmail />
                <ChangeBio />
                <DeleteAccount />

              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
