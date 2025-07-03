import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  DollarSign, 
  Wifi, 
  Shield, 
  Sun, 
  MapPin, 
  Clock,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { Destination, CoworkingSpace } from '@/types';
import { mockData } from '@/lib/api';

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [coworkingSpaces, setCoworkingSpaces] = useState<CoworkingSpace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In real app, this would call destinationsApi.getById(id) and coworkingApi.getByDestination(id)
      const dest = mockData.destinations.find(d => d.id === id);
      const spaces = mockData.coworkingSpaces.filter(s => s.destinationId === id);
      
      setDestination(dest || null);
      setCoworkingSpaces(spaces);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Button onClick={() => navigate('/destinations')}>
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/destinations')}
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {destination.country}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{destination.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{destination.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <div className="font-semibold">${destination.costOfLiving}/mo</div>
                    <div className="text-sm text-muted-foreground">Cost of Living</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Wifi className="h-8 w-8 text-primary" />
                    </div>
                    <div className="font-semibold">{destination.internetSpeed} Mbps</div>
                    <div className="text-sm text-muted-foreground">Internet Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div className="font-semibold">{destination.safetyScore}/10</div>
                    <div className="text-sm text-muted-foreground">Safety Score</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Sun className="h-8 w-8 text-primary" />
                    </div>
                    <div className="font-semibold">{destination.weatherScore}/10</div>
                    <div className="text-sm text-muted-foreground">Weather</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>What makes this place special</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coworking Spaces */}
            <Card>
              <CardHeader>
                <CardTitle>Coworking Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                {coworkingSpaces.length > 0 ? (
                  <div className="space-y-4">
                    {coworkingSpaces.map((space) => (
                      <div key={space.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{space.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{space.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{space.address}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{space.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">${space.pricePerDay}/day</span>
                            <span className="text-muted-foreground"> • </span>
                            <span className="font-medium">${space.pricePerMonth}/month</span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No coworking spaces available yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{destination.timezone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button 
                  className="w-full bg-gradient-ocean"
                  onClick={() => navigate('/trips/new', { state: { destinationId: destination.id } })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Trip
                </Button>
                <Button variant="outline" className="w-full">
                  Save for Later
                </Button>
                <Button variant="outline" className="w-full">
                  Share Destination
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;