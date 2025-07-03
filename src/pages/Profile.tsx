import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Briefcase, DollarSign, Edit3, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '',
    bio: 'Digital nomad and software developer passionate about exploring the world while building amazing products.',
    location: 'Currently in Lisbon, Portugal',
    workType: 'Software Developer',
    budget: 2000,
    preferences: {
      climate: ['warm', 'mild'],
      activities: ['surfing', 'hiking', 'coworking'],
      workingStyle: ['quiet', 'collaborative']
    }
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    // In real app, this would call usersApi.update()
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const addPreference = (category: keyof typeof profile.preferences, value: string) => {
    if (value && !editForm.preferences[category].includes(value)) {
      setEditForm({
        ...editForm,
        preferences: {
          ...editForm.preferences,
          [category]: [...editForm.preferences[category], value]
        }
      });
    }
  };

  const removePreference = (category: keyof typeof profile.preferences, value: string) => {
    setEditForm({
      ...editForm,
      preferences: {
        ...editForm.preferences,
        [category]: editForm.preferences[category].filter(item => item !== value)
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-ocean text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-white/20">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center space-x-2 text-white/90 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Briefcase className="h-4 w-4" />
                  <span>{profile.workType}</span>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Current Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="workType">Work Type</Label>
                      <Select
                        value={editForm.workType}
                        onValueChange={(value) => setEditForm({ ...editForm, workType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software Developer">Software Developer</SelectItem>
                          <SelectItem value="Designer">Designer</SelectItem>
                          <SelectItem value="Content Creator">Content Creator</SelectItem>
                          <SelectItem value="Consultant">Consultant</SelectItem>
                          <SelectItem value="Freelancer">Freelancer</SelectItem>
                          <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <p className="text-foreground">{profile.email}</p>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <p className="text-foreground">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Climate Preferences */}
                <div>
                  <Label className="text-base font-medium">Climate</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isEditing ? editForm : profile).preferences.climate.map((climate) => (
                      <Badge key={climate} variant="secondary" className="capitalize">
                        {climate}
                        {isEditing && (
                          <button
                            onClick={() => removePreference('climate', climate)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Select onValueChange={(value) => addPreference('climate', value)}>
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Add climate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tropical">Tropical</SelectItem>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="cool">Cool</SelectItem>
                          <SelectItem value="cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Activity Preferences */}
                <div>
                  <Label className="text-base font-medium">Activities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isEditing ? editForm : profile).preferences.activities.map((activity) => (
                      <Badge key={activity} variant="secondary" className="capitalize">
                        {activity}
                        {isEditing && (
                          <button
                            onClick={() => removePreference('activities', activity)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Select onValueChange={(value) => addPreference('activities', value)}>
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Add activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="surfing">Surfing</SelectItem>
                          <SelectItem value="hiking">Hiking</SelectItem>
                          <SelectItem value="coworking">Coworking</SelectItem>
                          <SelectItem value="nightlife">Nightlife</SelectItem>
                          <SelectItem value="culture">Culture</SelectItem>
                          <SelectItem value="food">Food & Dining</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Working Style */}
                <div>
                  <Label className="text-base font-medium">Working Style</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isEditing ? editForm : profile).preferences.workingStyle.map((style) => (
                      <Badge key={style} variant="secondary" className="capitalize">
                        {style}
                        {isEditing && (
                          <button
                            onClick={() => removePreference('workingStyle', style)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Select onValueChange={(value) => addPreference('workingStyle', value)}>
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Add style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiet">Quiet</SelectItem>
                          <SelectItem value="collaborative">Collaborative</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                          <SelectItem value="structured">Structured</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={editForm.budget}
                      onChange={(e) => setEditForm({ ...editForm, budget: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold">${profile.budget.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries Visited</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Trips</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Traveling</span>
                  <span className="font-semibold">365</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <div className="space-y-3">
                <Button onClick={handleSave} className="w-full bg-gradient-ocean">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;