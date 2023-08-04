import EmptyState from "../components/EmptyState";
import getCurrectUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationClient";


const ReservationPage = async() => {
    const currentUser = await getCurrectUser();

    if(!currentUser){
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please Login"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationPage