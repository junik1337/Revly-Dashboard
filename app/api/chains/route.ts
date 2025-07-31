import { NextResponse } from "next/server";
import { db } from "@/db";
import { chains } from "@/lib/schema";

export async function GET() {
  try {
    const allChains = await db.select().from(chains);
    return NextResponse.json(allChains);
  } catch (error) {
    console.error("Error fetching chains:", error);
    return NextResponse.json(
      { error: "Failed to fetch chains" },
      { status: 500 }
    );
  }
}
