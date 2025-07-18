import React from 'react';
import { Button } from '@/components/ui/button';
import { SparklesIcon, ArrowRightIcon } from 'lucide-react';
import heroImage from '@/assets/hero-event-planning.jpg';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/90"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <SparklesIcon className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Event Planner
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-white/90">
              for College Clubs
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your event ideas into comprehensive plans with our intelligent AI assistant. 
            From seminars to hackathons, we've got you covered.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="px-8 py-4 text-lg font-semibold"
          >
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-sm">Intelligent recommendations based on your event requirements</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRightIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Complete Solutions</h3>
            <p className="text-sm">From schedules to budgets, get everything you need in minutes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready to Use</h3>
            <p className="text-sm">Download PDFs, checklists, and permission letters instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;