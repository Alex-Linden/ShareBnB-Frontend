import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ListingForm from "./ListingForm";
import userContext from "./UserContext";

/**Routes for browser
 *
 * props=functions to be called in parent: login, signup, logout
 * state=none
 *
 * App --> RouterList --> { Homepage, CompanyList, CompanyDetail, JobList, LoginForm,
 * SignupForm, ProfileForm, Logout}
 */
function RouteList({ login, signup, create }) {
  const { currUser } = useContext(userContext);
  console.log("RouteList");
  return (
    <div>
      {currUser.data === null ? (

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/createlisting" element={<ListingForm create={create} />} />
        </Routes>
      )}
    </div>
  );
}

export default RouteList;



//<Route path="/profile" element={<ProfileForm />} />
//<Route path="/logout" element={<Logout logout={logout} />} />