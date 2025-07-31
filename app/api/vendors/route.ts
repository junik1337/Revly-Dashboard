import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    const allVendors = await db.query.vendors.findMany({
      with: {
        chain: {
          columns: {
            name: true,
          },
        },
      },
    });

    const result = allVendors.map((v) => ({
      ...v,
      chainName: v.chain?.name,
      // Manually remove the chain object if you don't want it in the final output
      chain: undefined,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}
