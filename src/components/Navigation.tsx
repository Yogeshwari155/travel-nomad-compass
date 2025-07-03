import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Map, Home, Calendar, User } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Destinations', href: '/destinations', icon: Map },
    { name: 'My Trips', href: '/trips', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Map className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                NomadPlan
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Button variant="default" size="sm" className="bg-gradient-ocean">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="px-3 py-2">
              <Button variant="default" size="sm" className="w-full bg-gradient-ocean">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;