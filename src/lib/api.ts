// API service for Digital Nomad Travel Planner
// Placeholder implementation for future backend integration

import { Destination, CoworkingSpace, Trip, User, Itinerary } from '@/types';
import lisbonHero from '@/assets/lisbon-hero.jpg';
import cangguHero from '@/assets/canggu-hero.jpg';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic API client
async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}

// Destinations API
export const destinationsApi = {
  getAll: (): Promise<Destination[]> => 
    apiClient<Destination[]>('/destinations'),
  
  getById: (id: string): Promise<Destination> => 
    apiClient<Destination>(`/destinations/${id}`),
  
  search: (query: string, filters?: Record<string, any>): Promise<Destination[]> => 
    apiClient<Destination[]>(`/destinations/search?q=${query}&${new URLSearchParams(filters)}`),
  
  getFeatured: (): Promise<Destination[]> => 
    apiClient<Destination[]>('/destinations/featured'),
};

// Coworking Spaces API
export const coworkingApi = {
  getByDestination: (destinationId: string): Promise<CoworkingSpace[]> => 
    apiClient<CoworkingSpace[]>(`/coworking?destinationId=${destinationId}`),
  
  getById: (id: string): Promise<CoworkingSpace> => 
    apiClient<CoworkingSpace>(`/coworking/${id}`),
  
  search: (query: string, destinationId?: string): Promise<CoworkingSpace[]> => 
    apiClient<CoworkingSpace[]>(`/coworking/search?q=${query}${destinationId ? `&destinationId=${destinationId}` : ''}`),
};

// Trips API
export const tripsApi = {
  getAll: (userId: string): Promise<Trip[]> => 
    apiClient<Trip[]>(`/trips?userId=${userId}`),
  
  getById: (id: string): Promise<Trip> => 
    apiClient<Trip>(`/trips/${id}`),
  
  create: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> => 
    apiClient<Trip>('/trips', {
      method: 'POST',
      body: JSON.stringify(trip),
    }),
  
  update: (id: string, trip: Partial<Trip>): Promise<Trip> => 
    apiClient<Trip>(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trip),
    }),
  
  delete: (id: string): Promise<void> => 
    apiClient<void>(`/trips/${id}`, {
      method: 'DELETE',
    }),
};

// Users API
export const usersApi = {
  getById: (id: string): Promise<User> => 
    apiClient<User>(`/users/${id}`),
  
  update: (id: string, user: Partial<User>): Promise<User> => 
    apiClient<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
  
  create: (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => 
    apiClient<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
};

// Itinerary API
export const itineraryApi = {
  getByTrip: (tripId: string): Promise<Itinerary[]> => 
    apiClient<Itinerary[]>(`/itineraries?tripId=${tripId}`),
  
  create: (itinerary: Omit<Itinerary, 'id'>): Promise<Itinerary> => 
    apiClient<Itinerary>('/itineraries', {
      method: 'POST',
      body: JSON.stringify(itinerary),
    }),
  
  update: (id: string, itinerary: Partial<Itinerary>): Promise<Itinerary> => 
    apiClient<Itinerary>(`/itineraries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itinerary),
    }),
  
  delete: (id: string): Promise<void> => 
    apiClient<void>(`/itineraries/${id}`, {
      method: 'DELETE',
    }),
};

// Mock data for development
export const mockData = {
  destinations: [
    {
      id: '1',
      name: 'Lisbon',
      country: 'Portugal',
      description: 'Perfect blend of old-world charm and modern amenities for digital nomads.',
      imageUrl: lisbonHero,
      rating: 4.8,
      costOfLiving: 1200,
      internetSpeed: 100,
      weatherScore: 8,
      safetyScore: 9,
      timezone: 'GMT+0',
      coordinates: { lat: 38.7223, lng: -9.1393 },
      tags: ['beach', 'history', 'affordable', 'startup-friendly']
    },
    {
      id: '2',
      name: 'Canggu',
      country: 'Indonesia',
      description: 'Tropical paradise with a thriving digital nomad community.',
      imageUrl: cangguHero,
      rating: 4.6,
      costOfLiving: 800,
      internetSpeed: 50,
      weatherScore: 9,
      safetyScore: 7,
      timezone: 'GMT+8',
      coordinates: { lat: -8.6481, lng: 115.1353 },
      tags: ['beach', 'surfing', 'tropical', 'affordable']
    }
  ] as Destination[],
  
  coworkingSpaces: [
    {
      id: '1',
      name: 'Outsite Lisbon',
      destinationId: '1',
      address: 'R. Rodrigues Sampaio 50, Lisboa',
      description: 'Modern coworking space with rooftop terrace in the heart of Lisbon.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      rating: 4.7,
      pricePerDay: 25,
      pricePerMonth: 200,
      amenities: ['High-speed WiFi', '24/7 Access', 'Meeting Rooms', 'Coffee'],
      internetSpeed: 200,
      openingHours: '24/7',
      coordinates: { lat: 38.7223, lng: -9.1393 }
    }
  ] as CoworkingSpace[]
};