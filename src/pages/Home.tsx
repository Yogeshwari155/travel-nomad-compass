import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DestinationCard from '@/components/DestinationCard';
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import { Destination } from '@/types';
import { mockData } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In real app, this would call destinationsApi.getFeatured()
    setFeaturedDestinations(mockData.destinations);
  }, []);

  const stats = [
    { icon: MapPin, label: 'Destinations', value: '500+' },
    { icon: Users, label: 'Nomads', value: '10k+' },
    { icon: Calendar, label: 'Trips Planned', value: '50k+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-ocean text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plan Your Next
            <br />
            <span className="text-secondary">Digital Nomad</span> Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Discover amazing destinations, find coworking spaces, and plan the perfect nomadic lifestyle
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations, countries, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white/95 border-0 shadow-lg"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90"
              onClick={() => navigate('/destinations')}
            >
              Explore Destinations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/trips')}
            >
              Plan a Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked locations perfect for digital nomads seeking adventure and productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={() => navigate(`/destinations/${destination.id}`)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/destinations')}
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-sunset text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of digital nomads who have planned their perfect trips with NomadPlan
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate('/trips')}
          >
            Start Planning Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;