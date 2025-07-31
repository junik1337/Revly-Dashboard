import { Chain, User, Vendor } from "@/types";

export async function getVendors(): Promise<Vendor[]> {
  const response = await fetch("/api/vendors");
  return response.json();
}

export async function getChains(): Promise<Chain[]> {
  const response = await fetch("/api/chains");
  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export async function updateUser(userId: string, isActive: boolean) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ userId, isActive }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}

export async function updateUserDisplayName(
  userId: string,
  displayName: string
) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ displayName, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update user display name:", error);
    throw error;
  }
}
