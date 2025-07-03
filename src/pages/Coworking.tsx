import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Wifi, 
  DollarSign, 
  Clock,
  Coffee,
  Users,
  Zap
} from 'lucide-react';
import { CoworkingSpace } from '@/types';
import { mockData } from '@/lib/api';

const Coworking = () => {
  const [coworkingSpaces, setCoworkingSpaces] = useState<CoworkingSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<CoworkingSpace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    // In real app, this would call coworkingApi.getAll()
    const mockSpaces: CoworkingSpace[] = [
      ...mockData.coworkingSpaces,
      {
        id: '2',
        name: 'Dojo Bali',
        destinationId: '2',
        address: 'Jl. Batu Mejan, Canggu',
        description: 'Legendary coworking space in the heart of Canggu with incredible community.',
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        rating: 4.8,
        pricePerDay: 15,
        pricePerMonth: 120,
        amenities: ['High-speed WiFi', 'Pool', 'Cafe', 'Events', 'Motorcycle Parking'],
        internetSpeed: 100,
        openingHours: '8:00 - 22:00',
        coordinates: { lat: -8.6481, lng: 115.1353 }
      },
      {
        id: '3',
        name: 'Second Home Lisboa',
        destinationId: '1',
        address: 'Cais do Sodré, Lisboa',
        description: 'Beautiful workspace with Portuguese design and international community.',
        imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
        rating: 4.6,
        pricePerDay: 30,
        pricePerMonth: 250,
        amenities: ['High-speed WiFi', 'Meeting Rooms', 'Kitchen', 'Terrace'],
        internetSpeed: 150,
        openingHours: '9:00 - 19:00',
        coordinates: { lat: 38.7223, lng: -9.1393 }
      }
    ];
    
    setCoworkingSpaces(mockSpaces);
    setFilteredSpaces(mockSpaces);
  }, []);

  useEffect(() => {
    let filtered = [...coworkingSpaces];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(space =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(space => {
        switch (priceRange) {
          case 'budget':
            return space.pricePerDay <= 20;
          case 'mid':
            return space.pricePerDay > 20 && space.pricePerDay <= 40;
          case 'premium':
            return space.pricePerDay > 40;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.pricePerDay - b.pricePerDay;
        case 'internet':
          return b.internetSpeed - a.internetSpeed;
        default:
          return 0;
      }
    });

    setFilteredSpaces(filtered);
  }, [coworkingSpaces, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-sunset text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coworking Spaces</h1>
          <p className="text-xl text-white/90">
            Find the perfect workspace for your nomadic lifestyle
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search coworking spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full lg:w-48">
                <DollarSign className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (≤$20/day)</SelectItem>
                <SelectItem value="mid">Mid-range ($21-40/day)</SelectItem>
                <SelectItem value="premium">Premium (&gt;$40/day)</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="internet">Best Internet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {filteredSpaces.length} coworking space{filteredSpaces.length !== 1 ? 's' : ''} found
            </h2>
          </div>

          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredSpaces.map((space) => (
                <Card key={space.id} className="overflow-hidden hover:shadow-travel transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={space.imageUrl}
                      alt={space.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{space.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        ${space.pricePerDay}/day
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{space.address}</span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {space.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{space.internetSpeed} Mbps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{space.openingHours}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">${space.pricePerMonth}/mo</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {space.amenities.slice(0, 4).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {space.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{space.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-gradient-sunset">
                          Book Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No coworking spaces found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Amenities */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Wifi, label: 'High-Speed WiFi', description: 'Reliable internet for productivity' },
              { icon: Coffee, label: 'Coffee & Kitchen', description: 'Fuel for your workday' },
              { icon: Users, label: 'Community Events', description: 'Network with other nomads' },
              { icon: Zap, label: '24/7 Access', description: 'Work on your schedule' }
            ].map((amenity) => (
              <div key={amenity.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{amenity.label}</h3>
                <p className="text-muted-foreground text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coworking;