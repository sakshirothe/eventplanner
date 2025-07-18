import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, InfoIcon, LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EventFormData {
  eventType: string;
  audience: string;
  theme: string;
  date: Date | undefined;
  duration: string;
  mode: string;
  venue: string;
  budget: string;
}

interface EventPlannerFormProps {
  onSubmit: (data: EventFormData) => void;
  isGenerating: boolean;
}

const EventPlannerForm: React.FC<EventPlannerFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<EventFormData>({
    eventType: '',
    audience: '',
    theme: '',
    date: undefined,
    duration: '',
    mode: '',
    venue: '',
    budget: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const eventTypes = [
    'Seminar',
    'Fest',
    'Hackathon',
    'Workshop',
    'Conference',
    'Cultural Event',
    'Sports Event',
    'Tech Talk',
    'Panel Discussion',
    'Networking Event'
  ];

  const modes = ['Online', 'Offline', 'Hybrid'];

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.eventType) newErrors.eventType = true;
    if (!formData.audience.trim()) newErrors.audience = true;
    if (!formData.theme.trim()) newErrors.theme = true;
    if (!formData.date) newErrors.date = true;
    if (!formData.duration.trim()) newErrors.duration = true;
    if (!formData.mode) newErrors.mode = true;
    if (formData.mode === 'Offline' && !formData.venue.trim()) newErrors.venue = true;
    if (!formData.budget.trim()) newErrors.budget = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsRequestingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock venue suggestions based on location
        const mockVenues = [
          'Main Auditorium - College Campus',
          'Conference Hall - Block A',
          'Open Air Theater',
          'Library Seminar Room',
          'Student Activity Center'
        ];
        
        const randomVenue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
        setFormData(prev => ({ ...prev, venue: randomVenue }));
        setIsRequestingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please enter venue manually.');
        setIsRequestingLocation(false);
      }
    );
  };

  const updateFormData = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            AI Event Planner
          </CardTitle>
          <CardDescription className="text-lg">
            Let AI help you plan the perfect event for your college club
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Type */}
              <div className="space-y-2">
                <Label htmlFor="eventType" className="flex items-center gap-2">
                  Event Type
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the type of event you want to organize</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select 
                  value={formData.eventType} 
                  onValueChange={(value) => updateFormData('eventType', value)}
                >
                  <SelectTrigger className={cn(
                    "w-full",
                    errors.eventType && "border-destructive focus:border-destructive"
                  )}>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Audience */}
              <div className="space-y-2">
                <Label htmlFor="audience" className="flex items-center gap-2">
                  Target Audience
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Who is this event for? (e.g., Computer Science students, All departments)</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="audience"
                  placeholder="e.g., Computer Science students, All departments"
                  value={formData.audience}
                  onChange={(e) => updateFormData('audience', e.target.value)}
                  className={cn(
                    errors.audience && "border-destructive focus:border-destructive"
                  )}
                />
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <Label htmlFor="theme">Event Theme</Label>
                <Input
                  id="theme"
                  placeholder="e.g., Innovation, Sustainability, Future Tech"
                  value={formData.theme}
                  onChange={(e) => updateFormData('theme', e.target.value)}
                  className={cn(
                    errors.theme && "border-destructive focus:border-destructive"
                  )}
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Event Date
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the date for your event</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                        errors.date && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => updateFormData('date', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  Duration (hours)
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How long will the event last? (in hours)</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 2, 4, 8"
                  value={formData.duration}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                  className={cn(
                    errors.duration && "border-destructive focus:border-destructive"
                  )}
                />
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <Label htmlFor="mode">Event Mode</Label>
                <Select 
                  value={formData.mode} 
                  onValueChange={(value) => updateFormData('mode', value)}
                >
                  <SelectTrigger className={cn(
                    "w-full",
                    errors.mode && "border-destructive focus:border-destructive"
                  )}>
                    <SelectValue placeholder="Select event mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {modes.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Venue - Show only for Offline events */}
            {formData.mode === 'Offline' && (
              <div className="space-y-2">
                <Label htmlFor="venue" className="flex items-center gap-2">
                  Venue
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Where will the event take place?</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="venue"
                    placeholder="Enter venue or use location services"
                    value={formData.venue}
                    onChange={(e) => updateFormData('venue', e.target.value)}
                    className={cn(
                      "flex-1",
                      errors.venue && "border-destructive focus:border-destructive"
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={requestLocation}
                    disabled={isRequestingLocation}
                    className="px-3"
                  >
                    {isRequestingLocation ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPinIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                Budget Limit (INR)
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Maximum budget for the event in Indian Rupees</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 50000"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                className={cn(
                  errors.budget && "border-destructive focus:border-destructive"
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Event Plan'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default EventPlannerForm;