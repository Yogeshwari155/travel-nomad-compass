// Core data models for Digital Nomad Travel Planner

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  costOfLiving: number; // USD per month
  internetSpeed: number; // Mbps
  weatherScore: number; // 1-10
  safetyScore: number; // 1-10
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
}

export interface CoworkingSpace {
  id: string;
  name: string;
  destinationId: string;
  address: string;
  description: string;
  imageUrl: string;
  rating: number;
  pricePerDay: number;
  pricePerMonth: number;
  amenities: string[];
  internetSpeed: number;
  openingHours: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: TripDestination[];
  budget: number;
  status: 'planning' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TripDestination {
  destinationId: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  accommodation?: string;
  coworkingSpaces: string[];
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  workType: string;
  budget: number;
  preferences: {
    climate: string[];
    activities: string[];
    workingStyle: string[];
  };
  createdAt: string;
}

export interface Itinerary {
  id: string;
  tripId: string;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'work' | 'leisure' | 'travel' | 'meeting';
  cost?: number;
}