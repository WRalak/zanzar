
import React from 'react';
import { Property, User, UserRole, VerificationStatus } from './types';

export const EAST_AFRICA_CITIES = [
  'Nairobi', 'Mombasa', 'Dar es Salaam', 'Arusha', 'Kampala', 'Kigali', 'Addis Ababa', 'Djibouti City'
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'am', name: 'Amharic' }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    ownerId: 'a1',
    title: 'Modern Villa in Westlands',
    description: 'Luxury 5-bedroom villa with private pool and smart home features. Located in the heart of Nairobi.',
    price: 450000,
    currency: 'KES',
    location: {
      address: 'General Mathenge Rd',
      city: 'Nairobi',
      country: 'Kenya',
      coordinates: { lat: -1.258, lng: 36.804 }
    },
    type: 'HOUSE',
    images: [
      'https://picsum.photos/seed/real1/800/600',
      'https://picsum.photos/seed/real2/800/600',
      'https://picsum.photos/seed/real3/800/600'
    ],
    amenities: ['Pool', 'Gym', 'Security', 'Fibre'],
    isVerified: true,
    createdAt: '2023-10-01'
  },
  {
    id: '2',
    ownerId: 'a2',
    title: 'Ocean View Apartment Dar',
    description: 'Executive 3-bedroom apartment overlooking the Indian Ocean. Fully furnished with high-end finishes.',
    price: 280000000,
    currency: 'TZS',
    location: {
      address: 'Masaki Peninsula',
      city: 'Dar es Salaam',
      country: 'Tanzania',
      coordinates: { lat: -6.745, lng: 39.284 }
    },
    type: 'APARTMENT',
    images: [
      'https://picsum.photos/seed/real4/800/600',
      'https://picsum.photos/seed/real5/800/600'
    ],
    amenities: ['Ocean View', 'Balcony', 'Elevator'],
    isVerified: true,
    createdAt: '2023-10-05'
  }
];

export const MOCK_AGENTS: User[] = [
  {
    id: 'a1',
    name: 'Sarah Mwangi',
    email: 'sarah@zanzara.com',
    phone: '+254 712 345 678',
    whatsapp: '254712345678',
    role: UserRole.AGENT,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    status: VerificationStatus.VERIFIED,
    bio: 'Professional real estate agent with 10 years experience in Nairobi premium market.',
    agencyName: 'Nairobi Prime Estates',
    chargeRate: '2% commission'
  },
  {
    id: 'a2',
    name: 'Abebe Bekele',
    email: 'abebe@zanzara.com',
    phone: '+251 91 123 4567',
    role: UserRole.AGENT,
    avatar: 'https://i.pravatar.cc/150?u=abebe',
    status: VerificationStatus.VERIFIED,
    bio: 'Specializing in residential properties in Addis Ababa.',
    agencyName: 'Ethiopia Homes',
    chargeRate: 'Flat fee per viewing'
  }
];
