import prisma from "@/app/libs/prismadb"

import getCurrectUser from "./getCurrentUser"

export default async function getFavoriteListings(){
    try{
        const currentUser = await getCurrectUser();

        if(!currentUser) return [];

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });
        
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;
    }catch(error: any){
        throw new Error(error);
    }
}