import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
    req: Request,
    { params }: { params: { ticketId: string } }
) {
    try {
        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // console.log(params.ticketId, "<-- params.ticketId");

        const url = `${process.env.NEXT_PUBLIC_FRESHDESK_API_URL!}/${params.ticketId}?include=conversations`;

        console.log(url, "<-- url");

        const res = await axios.get(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL!}/${params.ticketId}?include=conversations`)

        console.log(res, "<-- res from get Ticket");

        return NextResponse.json(res);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}