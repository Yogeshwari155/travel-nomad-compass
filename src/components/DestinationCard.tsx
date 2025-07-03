import { Star, Wifi, DollarSign, Shield, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  onViewDetails?: () => void;
}

const DestinationCard = ({ destination, onViewDetails }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-travel transition-all duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {destination.country}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{destination.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {destination.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">${destination.costOfLiving}/mo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{destination.internetSpeed} Mbps</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Safety {destination.safetyScore}/10</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Weather {destination.weatherScore}/10</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {destination.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button 
            onClick={onViewDetails}
            className="w-full bg-gradient-ocean hover:opacity-90"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;