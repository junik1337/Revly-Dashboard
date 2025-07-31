export interface User {
  id: number;
  email: string;
  displayName: string;
  isActive: boolean;
  createdAt: string;
  vendors: UserVendor[];
}

interface UserVendor {
  id: number;
  displayName: string;
}

export interface Vendor {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  createdAt: string;
  chainId: number;
  chainName?: string;
}

export interface Chain {
  id: number;
  name: string;
  createdAt: string;
}

export type ChainRow = { chain_id: string; chain_name: string };

export type VendorRow = {
  vendor_id: string;
  vendor_name: string;
  longitude: string;
  latitude: string;
  chain_id: string;
};

export type UserRow = {
  user_id: string;
  display_name: string;
  email: string;
  is_active: string;
};
