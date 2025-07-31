import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allUsers = await db.query.users.findMany({
      with: {
        usersToVendors: {
          with: {
            vendor: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
          columns: {
            displayName: true,
          },
        },
      },
    });

    // Restructure the data to match the desired output
    const result = allUsers.map((user) => {
      const managedVendors = user.usersToVendors.map((uv) => ({
        id: uv.vendor.id,
        displayName: uv.displayName || uv.vendor.name, // Use custom display name if available
      }));

      return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isActive: user.isActive,
        createdAt: user.createdAt,
        vendors: managedVendors,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, isActive, displayName } = body;

    // Always require userId
    if (userId === undefined) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (displayName !== undefined) {
      // Validate display name
      if (typeof displayName !== "string" || displayName.trim() === "") {
        return NextResponse.json(
          { error: "displayName must be a non-empty string" },
          { status: 400 }
        );
      }

      // Update the user's display name
      const updatedUser = await db
        .update(users)
        .set({ displayName: displayName.trim() })
        .where(eq(users.id, userId))
        .returning();

      if (updatedUser.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: "Display name updated successfully",
        user: updatedUser[0],
      });
    }

    // Validate isActive is a boolean
    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "isActive must be a boolean value" },
        { status: 400 }
      );
    }

    // Update the user's isActive status
    const updatedUser = await db
      .update(users)
      .set({ isActive })
      .where(eq(users.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
