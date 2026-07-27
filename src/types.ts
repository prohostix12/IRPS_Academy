export type NavTab = 'home' | 'universities' | 'programs' | 'admissions' | 'about' | 'contact' | 'process';

export interface University {
  id: string;
  name: string;
  code: string;
  tagline: string;
  location: string;
  established: number;
  type: 'Public State' | 'Private Ivy' | 'Institute of Technology' | 'Specialized College';
  ranking: string;
  acceptanceRate: string;
  totalStudents: string;
  campusSize: string;
  image: string;
  gallery: string[];
  description: string;
  topPrograms: string[];
  tuitionRange: string;
  features: string[];
  contactEmail: string;
}

export interface Program {
  id: string;
  title: string;
  universityId: string;
  universityName: string;
  degreeLevel: 'PhD' | 'EdD' | 'DBA' | 'EngD' | 'DSc / ScD' | 'DPhil';
  category: 'Engineering & Tech' | 'Business & Management' | 'Medicine & Health' | 'Arts & Humanities' | 'Law & Public Policy' | 'Natural Sciences';
  duration: string;
  credits: number;
  tuitionPerYear: number;
  applicationDeadline: string;
  format: 'Full-time On Campus' | 'Hybrid' | 'Online Distance';
  description: string;
  curriculumHighlights: string[];
  careerOutcomes: string[];
  prerequisites: string;
  featured?: boolean;
}

export interface ApplicationRecord {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  universityName: string;
  programTitle: string;
  degreeLevel: string;
  gpa: string;
  status: 'Received' | 'Under Review' | 'Documents Verified' | 'Interview Scheduled' | 'Accepted' | 'Scholarship Awarded';
  appliedDate: string;
  documentsUploaded: string[];
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  university: string;
  graduationYear: string;
  quote: string;
  avatar: string;
  achievement: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Scholarships' | 'International Students' | 'Campus Life';
}
