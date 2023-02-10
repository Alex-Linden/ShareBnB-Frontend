// import logo from './logo.svg';
import './App.css';
import UserContext from "./UserContext";
import decode from "jwt-decode";
import ShareBnBApi from './api';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import RouteList from './RouteList';

/** App - wrapper
 * 
 * Props:
 * -None
 * 
 * State:
 * -Current User
 * 
 * App -> { Navigation, RouteList }
 */
function App() {
  const [currUser, setCurrUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useState(ShareBnBApi.token)

  async function login(loginData) {
    let response = await ShareBnBApi.login(loginData)
    setToken(response.token)
    setCurrUser({data: response.user, infoLoaded: true});

  }

  async function signup(signupData) {
    let response = await ShareBnBApi.signup(signupData)
    setToken(response.token)
    setCurrUser({data: response.user, infoLoaded: true})
  }

  async function create(listingData) {
    let response = await ShareBnBApi.createListing(listingData)
    return response.listing
  }

  
  return (
    <div className="App">
    <UserContext.Provider value={{ currUser, token }}>
      <BrowserRouter>
      <Navigation />
      <RouteList login={login} signup={signup} create={create} />
      </BrowserRouter>
     </UserContext.Provider>
    </div>
  );
}

export default App;
