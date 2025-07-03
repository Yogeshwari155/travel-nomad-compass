import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { Trip } from '@/types';

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In real app, this would call tripsApi.getAll(userId)
    const mockTrips: Trip[] = [
      {
        id: '1',
        userId: 'user1',
        title: 'European Adventure',
        description: 'A 3-month journey through Portugal, Spain, and France',
        startDate: '2024-03-01',
        endDate: '2024-06-01',
        destinations: [],
        budget: 5000,
        status: 'planning',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        userId: 'user1',
        title: 'Southeast Asia Explorer',
        description: 'Digital nomad journey through Thailand, Vietnam, and Indonesia',
        startDate: '2024-07-15',
        endDate: '2024-10-15',
        destinations: [],
        budget: 3000,
        status: 'active',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-20'
      }
    ];
    
    setTrips(mockTrips);
    setLoading(false);
  }, []);

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    
    if (months > 0) {
      return `${months}m ${days}d`;
    }
    return `${days} days`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-ocean text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Trips</h1>
              <p className="text-xl text-white/90">
                Plan, track, and manage your digital nomad adventures
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90"
              onClick={() => navigate('/trips/new')}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Trips List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {trips.map((trip) => (
                <Card 
                  key={trip.id} 
                  className="hover:shadow-travel transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{trip.title}</CardTitle>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{trip.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(trip.startDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{calculateDuration(trip.startDate, trip.endDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${trip.budget.toLocaleString()} budget</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{trip.destinations.length} destinations</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/trips/${trip.id}/edit`);
                          }}
                        >
                          Edit Trip
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/trips/${trip.id}/itinerary`);
                          }}
                        >
                          View Itinerary
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">No trips planned yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start planning your first digital nomad adventure! Create a trip and add destinations to get started.
              </p>
              <Button
                size="lg"
                className="bg-gradient-ocean"
                onClick={() => navigate('/trips/new')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Plan Your First Trip
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-card transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Plan New Trip</h3>
                <p className="text-muted-foreground text-sm">
                  Start planning your next adventure
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Explore Destinations</h3>
                <p className="text-muted-foreground text-sm">
                  Find your next perfect location
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">View Calendar</h3>
                <p className="text-muted-foreground text-sm">
                  See all your upcoming trips
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trips;