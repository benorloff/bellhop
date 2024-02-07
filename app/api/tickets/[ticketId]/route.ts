import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { ticketId: string } }
) {
    
}