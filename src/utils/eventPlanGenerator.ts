import { EventFormData } from '@/components/EventPlannerForm';
import { EventPlan } from '@/components/EventPlanResults';

export const generateEventPlan = async (formData: EventFormData): Promise<EventPlan> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 3000));

  const eventType = formData.eventType.toLowerCase();
  const budget = parseInt(formData.budget);
  const duration = parseInt(formData.duration);

  // Generate event title
  const titleTemplates = {
    seminar: [`${formData.theme} Seminar`, `Knowledge Exchange: ${formData.theme}`, `${formData.theme} Insights`],
    fest: [`${formData.theme} Fest`, `${formData.theme} Celebration`, `Grand ${formData.theme} Festival`],
    hackathon: [`${formData.theme} Hackathon`, `Code for ${formData.theme}`, `${formData.theme} Innovation Challenge`],
    workshop: [`${formData.theme} Workshop`, `Hands-on ${formData.theme}`, `${formData.theme} Masterclass`],
    conference: [`${formData.theme} Conference`, `${formData.theme} Summit`, `Future of ${formData.theme}`],
  };

  const titles = titleTemplates[eventType as keyof typeof titleTemplates] || [`${formData.theme} Event`];
  const title = titles[Math.floor(Math.random() * titles.length)];

  // Generate description
  const description = `Join us for an exciting ${formData.eventType.toLowerCase()} focused on ${formData.theme}. This ${duration}-hour event is designed for ${formData.audience} and promises to deliver engaging content, networking opportunities, and practical insights. Whether you're a beginner or expert, this event will provide valuable learning experiences and connections within the ${formData.theme} community.`;

  // Generate schedule based on duration
  const generateSchedule = () => {
    const baseSchedule = [
      { time: '09:00 AM', activity: 'Registration & Welcome', duration: '30 mins' },
      { time: '09:30 AM', activity: 'Opening Ceremony', duration: '30 mins' },
    ];

    if (eventType === 'hackathon') {
      return [
        ...baseSchedule,
        { time: '10:00 AM', activity: 'Problem Statement Reveal', duration: '1 hour' },
        { time: '11:00 AM', activity: 'Team Formation & Ideation', duration: '2 hours' },
        { time: '01:00 PM', activity: 'Lunch Break', duration: '1 hour' },
        { time: '02:00 PM', activity: 'Development Phase', duration: '4 hours' },
        { time: '06:00 PM', activity: 'Final Presentations', duration: '2 hours' },
        { time: '08:00 PM', activity: 'Awards & Closing', duration: '1 hour' }
      ];
    } else if (eventType === 'seminar') {
      return [
        ...baseSchedule,
        { time: '10:00 AM', activity: `Keynote: Introduction to ${formData.theme}`, duration: '1 hour' },
        { time: '11:00 AM', activity: 'Tea Break', duration: '15 mins' },
        { time: '11:15 AM', activity: `Panel Discussion on ${formData.theme}`, duration: '1.5 hours' },
        { time: '12:45 PM', activity: 'Q&A Session', duration: '30 mins' },
        { time: '01:15 PM', activity: 'Networking & Closing', duration: '45 mins' }
      ];
    } else {
      return [
        ...baseSchedule,
        { time: '10:00 AM', activity: 'Main Event Activities', duration: `${duration - 2} hours` },
        { time: '12:00 PM', activity: 'Lunch & Networking', duration: '1 hour' },
        { time: '01:00 PM', activity: 'Closing Ceremony', duration: '1 hour' }
      ];
    }
  };

  // Generate poster ideas
  const posterIdeas = [
    {
      concept: 'Modern Gradient Design',
      description: `Use purple and teal gradients with bold typography featuring "${title}" as the main headline. Include geometric patterns and student silhouettes.`
    },
    {
      concept: 'Minimalist Typography',
      description: `Clean white background with large, bold text in brand colors. Focus on readability with essential event details prominently displayed.`
    },
    {
      concept: 'Illustrated Theme',
      description: `Custom illustrations related to ${formData.theme} with event details overlaid on colorful backgrounds. Include icons representing the event activities.`
    }
  ];

  // Generate social media content
  const socialMedia = {
    caption: `🚀 Get ready for ${title}! Join us for an incredible ${formData.eventType.toLowerCase()} focused on ${formData.theme}. Perfect for ${formData.audience} looking to learn, network, and grow! 📅 Date: ${formData.date?.toDateString()} ⏰ Duration: ${duration} hours 💡 Don't miss this opportunity to connect with like-minded individuals and industry experts!`,
    hashtags: [
      formData.theme.replace(/\s+/g, ''),
      formData.eventType,
      'CollegeEvent',
      'StudentLife',
      'Learning',
      'Networking',
      'Innovation',
      'TechEvent'
    ]
  };

  // Generate committees based on event type
  const generateCommittees = () => {
    const baseCommittees = [
      {
        name: 'Event Management',
        volunteers: 5,
        responsibilities: ['Overall event coordination', 'Timeline management', 'Communication hub']
      },
      {
        name: 'Registration & Hospitality',
        volunteers: 4,
        responsibilities: ['Check-in process', 'Guest assistance', 'Refreshment coordination']
      },
      {
        name: 'Technical Support',
        volunteers: 3,
        responsibilities: ['AV equipment setup', 'Technical troubleshooting', 'Live streaming support']
      },
      {
        name: 'Marketing & Publicity',
        volunteers: 4,
        responsibilities: ['Social media promotion', 'Poster distribution', 'Press coverage']
      }
    ];

    if (eventType === 'hackathon') {
      baseCommittees.push({
        name: 'Judging & Mentorship',
        volunteers: 6,
        responsibilities: ['Mentor coordination', 'Judging process', 'Prize distribution']
      });
    }

    if (formData.mode === 'Offline') {
      baseCommittees.push({
        name: 'Logistics & Security',
        volunteers: 3,
        responsibilities: ['Venue setup', 'Security coordination', 'Equipment management']
      });
    }

    return baseCommittees;
  };

  // Generate budget breakdown
  const generateBudgetBreakdown = () => {
    const categories = formData.mode === 'Online' 
      ? [
          { category: 'Platform & Technology', percentage: 25 },
          { category: 'Speaker Fees', percentage: 30 },
          { category: 'Marketing & Promotion', percentage: 15 },
          { category: 'Prizes & Certificates', percentage: 20 },
          { category: 'Miscellaneous', percentage: 10 }
        ]
      : [
          { category: 'Venue & Facilities', percentage: 30 },
          { category: 'Food & Refreshments', percentage: 25 },
          { category: 'Speaker Fees', percentage: 20 },
          { category: 'Decoration & Setup', percentage: 10 },
          { category: 'Marketing & Promotion', percentage: 8 },
          { category: 'Prizes & Certificates', percentage: 5 },
          { category: 'Miscellaneous', percentage: 2 }
        ];

    return categories.map(cat => ({
      category: cat.category,
      amount: Math.round((budget * cat.percentage) / 100),
      percentage: cat.percentage
    }));
  };

  // Generate decoration suggestions
  const decorationSuggestions = [
    `${formData.theme}-themed banners and posters in brand colors`,
    'LED strip lighting in purple and teal to match the brand theme',
    'Photo booth area with event hashtag backdrop',
    'Welcome arch with event title and sponsor logos',
    'Table centerpieces featuring miniature ${formData.theme} elements',
    'Balloon arrangements in gradient colors',
    'Digital displays showing event schedule and announcements',
    'Registration desk with branded tablecloth and signage'
  ];

  // Generate permission letter
  const permissionLetter = `
Date: ${new Date().toDateString()}

To,
The Principal/Dean
[College Name]
[College Address]

Subject: Request for Permission to Organize "${title}"

Respected Sir/Madam,

We, the members of [Club Name], would like to seek your permission to organize "${title}" on ${formData.date?.toDateString()}.

Event Details:
- Event Name: ${title}
- Date: ${formData.date?.toDateString()}
- Duration: ${duration} hours
- Mode: ${formData.mode}
${formData.venue ? `- Venue: ${formData.venue}` : ''}
- Expected Participants: ${formData.audience}
- Estimated Budget: ₹${budget.toLocaleString()}

This event aims to provide valuable learning opportunities for students in ${formData.theme}. We have planned comprehensive activities including expert sessions, interactive workshops, and networking opportunities.

We assure you that all college guidelines will be strictly followed, and we will take full responsibility for the smooth conduct of the event. We have also planned adequate security and safety measures.

We would be grateful if you could grant us permission for this event. We are available for any further clarification or discussion regarding this proposal.

Thank you for your consideration.

Yours sincerely,

[Your Name]
[Club President/Secretary]
[Club Name]
[Contact Information]

Attachments:
- Detailed event proposal
- Budget breakdown
- List of organizing committee members
  `;

  return {
    title,
    description,
    schedule: generateSchedule(),
    posterIdeas,
    socialMedia,
    committees: generateCommittees(),
    budgetBreakdown: generateBudgetBreakdown(),
    decorationSuggestions,
    permissionLetter: permissionLetter.trim()
  };
};