import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarIcon, 
  UsersIcon, 
  MapPinIcon, 
  CreditCardIcon,
  DownloadIcon,
  EditIcon,
  RefreshCwIcon,
  ClockIcon,
  PaletteIcon,
  MegaphoneIcon,
  CheckIcon,
  FileTextIcon
} from 'lucide-react';
import jsPDF from 'jspdf';
import { EventFormData } from './EventPlannerForm';

export interface EventPlan {
  title: string;
  description: string;
  schedule: Array<{
    time: string;
    activity: string;
    duration: string;
  }>;
  posterIdeas: Array<{
    concept: string;
    description: string;
  }>;
  socialMedia: {
    caption: string;
    hashtags: string[];
  };
  committees: Array<{
    name: string;
    volunteers: number;
    responsibilities: string[];
  }>;
  budgetBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  decorationSuggestions: string[];
  permissionLetter: string;
}

interface EventPlanResultsProps {
  formData: EventFormData;
  eventPlan: EventPlan;
  onEdit: () => void;
  onStartNew: () => void;
}

const EventPlanResults: React.FC<EventPlanResultsProps> = ({
  formData,
  eventPlan,
  onEdit,
  onStartNew
}) => {
  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(102, 51, 153); // Primary color
    pdf.text(eventPlan.title, margin, yPosition);
    yPosition += 15;

    // Event Details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Event Type: ${formData.eventType}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Date: ${formData.date?.toDateString()}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Duration: ${formData.duration} hours`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Mode: ${formData.mode}`, margin, yPosition);
    yPosition += 10;
    if (formData.venue) {
      pdf.text(`Venue: ${formData.venue}`, margin, yPosition);
      yPosition += 10;
    }
    pdf.text(`Budget: ₹${formData.budget}`, margin, yPosition);
    yPosition += 15;

    // Description
    pdf.setFontSize(14);
    pdf.setTextColor(102, 51, 153);
    pdf.text('Event Description', margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const splitDescription = pdf.splitTextToSize(eventPlan.description, pageWidth - 2 * margin);
    pdf.text(splitDescription, margin, yPosition);
    yPosition += splitDescription.length * 5 + 10;

    // Schedule
    pdf.setFontSize(14);
    pdf.setTextColor(102, 51, 153);
    pdf.text('Event Schedule', margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    eventPlan.schedule.forEach((item) => {
      pdf.text(`${item.time} - ${item.activity} (${item.duration})`, margin, yPosition);
      yPosition += 8;
    });

    // Budget Breakdown
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setTextColor(102, 51, 153);
    pdf.text('Budget Breakdown', margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    eventPlan.budgetBreakdown.forEach((item) => {
      pdf.text(`${item.category}: ₹${item.amount} (${item.percentage}%)`, margin, yPosition);
      yPosition += 8;
    });

    // Permission Letter (New Page)
    pdf.addPage();
    yPosition = margin;
    pdf.setFontSize(16);
    pdf.setTextColor(102, 51, 153);
    pdf.text('Permission Letter Template', margin, yPosition);
    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const splitLetter = pdf.splitTextToSize(eventPlan.permissionLetter, pageWidth - 2 * margin);
    pdf.text(splitLetter, margin, yPosition);

    pdf.save(`${eventPlan.title.replace(/\s+/g, '_')}_Event_Plan.pdf`);
  };

  const downloadChecklist = () => {
    const checklist = `
EVENT PLANNING CHECKLIST - ${eventPlan.title}

□ Venue Booking
□ Permission Letters Submitted
□ Budget Approval
□ Committee Formation
□ Volunteer Recruitment
□ Marketing Materials
□ Registration Setup
□ Technical Requirements
□ Catering Arrangements
□ Decoration Setup
□ Sound/AV Equipment
□ Photography/Videography
□ Emergency Contacts
□ Feedback Forms
□ Post-event Cleanup

COMMITTEE DETAILS:
${eventPlan.committees.map(committee => 
  `${committee.name}: ${committee.volunteers} volunteers\n- ${committee.responsibilities.join('\n- ')}`
).join('\n\n')}

DECORATION SUGGESTIONS:
${eventPlan.decorationSuggestions.map(suggestion => `- ${suggestion}`).join('\n')}
    `;

    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventPlan.title.replace(/\s+/g, '_')}_Checklist.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            {eventPlan.title}
          </h2>
          <p className="text-muted-foreground">AI-generated event plan ready for execution</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onEdit} className="gap-2">
            <EditIcon className="h-4 w-4" />
            Edit Plan
          </Button>
          <Button variant="outline" onClick={onStartNew} className="gap-2">
            <RefreshCwIcon className="h-4 w-4" />
            Start New
          </Button>
        </div>
      </div>

      {/* Event Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Event Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">{eventPlan.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.duration} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.audience}</span>
            </div>
            {formData.venue && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formData.venue}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-primary" />
            Event Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Time</th>
                  <th className="text-left p-3 font-semibold">Activity</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {eventPlan.schedule.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{item.time}</td>
                    <td className="p-3">{item.activity}</td>
                    <td className="p-3 text-muted-foreground">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Poster Ideas */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PaletteIcon className="h-5 w-5 text-primary" />
              Poster Design Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {eventPlan.posterIdeas.map((idea, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">{idea.concept}</h4>
                <p className="text-sm text-muted-foreground">{idea.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MegaphoneIcon className="h-5 w-5 text-primary" />
              Social Media Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Caption</h4>
                <p className="text-sm bg-muted p-3 rounded-lg">{eventPlan.socialMedia.caption}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {eventPlan.socialMedia.hashtags.map((tag, index) => (
                    <Badge key={index} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Committees */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            Required Committees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventPlan.committees.map((committee, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">{committee.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {committee.volunteers} volunteers needed
                </p>
                <ul className="text-sm space-y-1">
                  {committee.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5 text-primary" />
            Budget Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventPlan.budgetBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">{item.category}</span>
                <div className="text-right">
                  <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg font-semibold">
              <span>Total Budget</span>
              <span>₹{parseInt(formData.budget).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decoration Suggestions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PaletteIcon className="h-5 w-5 text-primary" />
            Decoration Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {eventPlan.decorationSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <span className="text-primary mt-1">✨</span>
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Letter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5 text-primary" />
            Permission Letter Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {eventPlan.permissionLetter}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Download Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DownloadIcon className="h-5 w-5 text-primary" />
            Download Resources
          </CardTitle>
          <CardDescription>
            Get your event planning documents and checklists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={downloadPDF} variant="gradient" className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Download Full Plan (PDF)
            </Button>
            <Button onClick={downloadChecklist} variant="outline" className="gap-2">
              <CheckIcon className="h-4 w-4" />
              Download Checklist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPlanResults;