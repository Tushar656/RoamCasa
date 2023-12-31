import { NextResponse } from "next/server";

import getCurrectUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string,
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrectUser();

    if(!currentUser) return NextResponse.error();

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        return new Error('Invalid Id');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}