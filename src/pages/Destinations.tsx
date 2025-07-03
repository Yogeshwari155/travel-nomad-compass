import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DestinationCard from '@/components/DestinationCard';
import { Search, Filter } from 'lucide-react';
import { Destination } from '@/types';
import { mockData } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // In real app, this would call destinationsApi.getAll()
    setDestinations(mockData.destinations);
    setFilteredDestinations(mockData.destinations);
  }, []);

  useEffect(() => {
    let filtered = [...destinations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(dest => dest.tags.includes(filterBy));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'cost':
          return a.costOfLiving - b.costOfLiving;
        case 'internet':
          return b.internetSpeed - a.internetSpeed;
        case 'safety':
          return b.safetyScore - a.safetyScore;
        default:
          return 0;
      }
    });

    setFilteredDestinations(filtered);
  }, [destinations, searchQuery, sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-ocean text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl text-white/90">
            Discover the perfect location for your digital nomad journey
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
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by Category */}
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="affordable">Affordable</SelectItem>
                <SelectItem value="startup-friendly">Startup Friendly</SelectItem>
                <SelectItem value="tropical">Tropical</SelectItem>
                <SelectItem value="history">Historical</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="cost">Lowest Cost</SelectItem>
                <SelectItem value="internet">Best Internet</SelectItem>
                <SelectItem value="safety">Safest</SelectItem>
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
              {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
            </h2>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onViewDetails={() => navigate(`/destinations/${destination.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No destinations found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setFilterBy('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;