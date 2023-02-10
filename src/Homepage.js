import React, { useState, useEffect } from "react";
// import userContext from "./UserContext";
import ShareBnBApi from "./api";
import ListingCard from "./ListingCard";

/**Shows homepage
 *
 * useContext= user
 * props=none
 * state=none
 *
 * Routes --> Homepage
 */

function Homepage() {
  console.log("homepage");
  const [listings, setListings] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(function getListingsOnMount() {
    console.log("getListingsOnMount");
    async function fetchListings() {
      const response = await ShareBnBApi.getListings();
      setListings({ data: response, isLoading: false });
    }
    fetchListings();
  }, []);

  if(listings.isLoading === true) {
      return <p>Loading...</p>
  }

  return (
    <div className="Homepage">
      {listings.data.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

export default Homepage;
