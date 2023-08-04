import EmptyState from "../components/EmptyState";

import getCurrectUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const listingPage = async() => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrectUser();

    if(listings.length === 0){
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        )
    }
    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default listingPage;