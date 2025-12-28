
export enum UserRole {
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  SUSPENDED = 'SUSPENDED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  role: UserRole;
  avatar: string;
  status: VerificationStatus;
  bio?: string;
  portfolio?: string[];
  agencyName?: string;
  chargeRate?: string;
}

export interface Property {
  id: string;
  ownerId: string; // Landlord or Agent
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  type: 'HOUSE' | 'APARTMENT' | 'OFFICE' | 'LAND';
  images: string[];
  videos?: string[];
  amenities: string[];
  isVerified: boolean;
  createdAt: string;
}

export interface VisitRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  date: string;
}
