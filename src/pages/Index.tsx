import React, { useState } from 'react';
import Hero from '@/components/Hero';
import EventPlannerForm, { EventFormData } from '@/components/EventPlannerForm';
import EventPlanResults, { EventPlan } from '@/components/EventPlanResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateEventPlan } from '@/utils/eventPlanGenerator';

type AppState = 'hero' | 'form' | 'generating' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<EventFormData | null>(null);
  const [eventPlan, setEventPlan] = useState<EventPlan | null>(null);

  const handleGetStarted = () => {
    setCurrentState('form');
  };

  const handleFormSubmit = async (data: EventFormData) => {
    setFormData(data);
    setCurrentState('generating');
    
    try {
      const plan = await generateEventPlan(data);
      setEventPlan(plan);
      setCurrentState('results');
    } catch (error) {
      console.error('Error generating event plan:', error);
      // Handle error - could show error state
      setCurrentState('form');
    }
  };

  const handleEditPlan = () => {
    setCurrentState('form');
  };

  const handleStartNew = () => {
    setFormData(null);
    setEventPlan(null);
    setCurrentState('hero');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentState === 'hero' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'form' && (
        <div className="container mx-auto px-4 py-12">
          <EventPlannerForm 
            onSubmit={handleFormSubmit} 
            isGenerating={false}
          />
        </div>
      )}
      
      {currentState === 'generating' && (
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      )}
      
      {currentState === 'results' && formData && eventPlan && (
        <div className="container mx-auto px-4 py-12">
          <EventPlanResults 
            formData={formData}
            eventPlan={eventPlan}
            onEdit={handleEditPlan}
            onStartNew={handleStartNew}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
