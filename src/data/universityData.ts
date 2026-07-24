import { University, Program, Testimonial, FAQItem } from '../types';

export const HERO_CAMPUS_IMAGE = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2000&q=80";

export const UNIVERSITIES: University[] = [
  {
    id: 'uni-heritage',
    name: 'Heritage State University',
    code: 'HSU-MAIN',
    tagline: 'Centuries of Academic Distinction & Research Excellence',
    location: 'Cambridge, MA, USA',
    established: 1888,
    type: 'Public State',
    ranking: '#12 National University',
    acceptanceRate: '18%',
    totalStudents: '28,500+',
    campusSize: '350 Acres',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heritage State University is a world-renowned flagship institution celebrated for landmark scientific research, classical architecture, state-of-the-art innovation hubs, and a vibrant diverse student body.',
    topPrograms: ['B.Sc Computer Science', 'MBA Business Strategy', 'M.Sc Biotechnology', 'LL.B Constitutional Law'],
    tuitionRange: '$14,500 - $32,000 / year',
    features: ['R1 Top Research Facility', '100% Need-Based Aid', '400+ Global Partners', 'Ivy-League Heritage Library'],
    contactEmail: 'admissions@heritage.edu'
  },
  {
    id: 'uni-tech',
    name: 'Veritas Institute of Technology',
    code: 'VIT-TECH',
    tagline: 'Engineering the Next Frontier of Human Innovation',
    location: 'Silicon Valley, CA, USA',
    established: 1962,
    type: 'Institute of Technology',
    ranking: '#4 Global Tech University',
    acceptanceRate: '12%',
    totalStudents: '16,200+',
    campusSize: '210 Acres',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Leading the global artificial intelligence, robotics, and aerospace engineering revolutions with hands-on lab access, industry incubators, and direct tech recruiter pipelines.',
    topPrograms: ['B.S. Artificial Intelligence', 'M.S. Quantum Computing', 'B.S. Robotics Engineering', 'Ph.D. Data Science'],
    tuitionRange: '$18,000 - $38,500 / year',
    features: ['AI Supercomputer Center', 'Silicon Valley Co-op Internships', '99.2% Tech Placement Rate', 'Venture Capital Startup Fund'],
    contactEmail: 'admissions@veritastech.edu'
  },
  {
    id: 'uni-health',
    name: 'St. Jude College of Health Sciences',
    code: 'SJCHS-MED',
    tagline: 'Compassionate Care Powered by Advanced Medical Science',
    location: 'Chicago, IL, USA',
    established: 1910,
    type: 'Specialized College',
    ranking: '#8 Medical & Health College',
    acceptanceRate: '14%',
    totalStudents: '9,800+',
    campusSize: '120 Acres',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pioneering healthcare education with Level-1 Trauma teaching hospitals, simulated surgical suites, genomics labs, and elite clinical residency rotations.',
    topPrograms: ['Doctor of Medicine (MD)', 'Bachelor of Science in Nursing', 'M.Sc Public Health', 'Doctor of Pharmacy'],
    tuitionRange: '$22,000 - $44,000 / year',
    features: ['On-Campus Teaching Hospital', 'Global Health Brigades', 'Simulation Surgery Center', '100% Residency Board Pass Rate'],
    contactEmail: 'admissions@stjudehealth.edu'
  },
  {
    id: 'uni-business',
    name: 'Global Business & Economics Academy',
    code: 'GBEA-BIZ',
    tagline: 'Empowering Global Leaders, Financial Strategists & Entrepreneurs',
    location: 'New York City, NY, USA',
    established: 1948,
    type: 'Private Ivy',
    ranking: '#5 Business School Worldwide',
    acceptanceRate: '15%',
    totalStudents: '12,400+',
    campusSize: 'Metropolitan Campus',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Located in the heart of Wall Street, offering unmatched exposure to Fortune 500 executive mentorship, real-money trading floors, and international consulting projects.',
    topPrograms: ['Executive MBA', 'B.B.A Financial Engineering', 'M.Sc FinTech & Blockchain', 'Ph.D. Economics'],
    tuitionRange: '$25,000 - $48,000 / year',
    features: ['Bloomberg Live Terminal Floor', 'Wall Street Internship Guarantee', 'Global Exchange in London & Zurich', 'Angel Investor Pitch Forum'],
    contactEmail: 'admissions@gbea.edu'
  },
  {
    id: 'uni-law',
    name: 'Veritas School of Law & Public Policy',
    code: 'VSLPP-LAW',
    tagline: 'Defending Justice, Shaping Legislation, & Leading Governance',
    location: 'Washington, D.C., USA',
    established: 1925,
    type: 'Private Ivy',
    ranking: '#6 Law & Policy School',
    acceptanceRate: '16%',
    totalStudents: '7,500+',
    campusSize: '85 Acres',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Adjacent to Capitol Hill, offering supreme moot courtrooms, constitutional policy centers, and direct clerkships with supreme court justices and international bodies.',
    topPrograms: ['Juris Doctor (J.D.)', 'Master of Laws (LL.M.)', 'Master of International Relations', 'B.A. Political Science'],
    tuitionRange: '$20,000 - $42,000 / year',
    features: ['Federal Court Clerkship Network', 'Capitol Hill Internship Program', 'Human Rights Legal Clinic', 'Moot Court World Champions'],
    contactEmail: 'admissions@veritaslaw.edu'
  },
  {
    id: 'uni-arts',
    name: 'Aura College of Creative Arts & Design',
    code: 'ACCAD-ARTS',
    tagline: 'Nurturing Visionaries, Designers & Cultural Innovators',
    location: 'Los Angeles, CA, USA',
    established: 1975,
    type: 'Specialized College',
    ranking: '#3 Visual & Performing Arts',
    acceptanceRate: '22%',
    totalStudents: '6,100+',
    campusSize: '65 Acres',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immersive soundstages, digital animation suites, sculpture foundries, and fashion design ateliers mentored by Hollywood directors and renowned artists.',
    topPrograms: ['B.F.A Animation & VFX', 'M.A. Industrial Design', 'B.F.A Film Production', 'Bachelor of Architecture'],
    tuitionRange: '$16,000 - $34,000 / year',
    features: ['Hollywood Studio Soundstages', 'AR/VR Immersive Media Lab', 'Annual LA Gallery Showcase', 'Disney & Pixar Partner Pipeline'],
    contactEmail: 'admissions@auracreative.edu'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-cs-bs',
    title: 'Ph.D. in Computer Science & Software Engineering',
    universityId: 'uni-heritage',
    universityName: 'Heritage State University',
    degreeLevel: 'PhD',
    category: 'Engineering & Tech',
    duration: '4-5 Years',
    credits: 72,
    tuitionPerYear: 18500,
    applicationDeadline: 'Nov 30, 2026 (Early) / Jan 15, 2027 (Regular)',
    format: 'Full-time On Campus',
    featured: true,
    description: 'A rigorous doctoral research program focused on algorithm analysis, distributed cloud systems, cybersecurity, full-stack architecture, and machine learning principles with industry capstones.',
    curriculumHighlights: ['Advanced Algorithms & Complexity', 'Distributed Cloud Architecture', 'Post-Quantum Cryptography', 'AI & Machine Learning Research'],
    careerOutcomes: ['Software Architect', 'Principal Research Scientist', 'University Professor', 'R&D Director'],
    prerequisites: 'Master\'s or Bachelor\'s degree in Computer Science, Math, or related field. Minimum GPA 3.5/4.0.'
  },
  {
    id: 'prog-ai-ms',
    title: 'DSc in Artificial Intelligence & Neural Networks',
    universityId: 'uni-tech',
    universityName: 'Veritas Institute of Technology',
    degreeLevel: 'DSc / ScD',
    category: 'Engineering & Tech',
    duration: '3-4 Years',
    credits: 60,
    tuitionPerYear: 28000,
    applicationDeadline: 'Dec 15, 2026',
    format: 'Full-time On Campus',
    featured: true,
    description: 'Advanced doctoral program delving into generative AI, transformer models, reinforcement learning, computer vision, and autonomous robotics ethics.',
    curriculumHighlights: ['Deep Learning & Transformers', 'Computer Vision & Spatial Computing', 'Natural Language Processing', 'Autonomous Systems & Robotics'],
    careerOutcomes: ['AI Research Scientist', 'Machine Learning Engineer', 'Computer Vision Specialist', 'Generative AI Tech Lead'],
    prerequisites: 'Master\'s degree in Computer Science, Applied Math, or Electrical Engineering. GRE Quantitative score 165+.'
  },
  {
    id: 'prog-mba-exec',
    title: 'DBA in Global Strategic Leadership & Innovation',
    universityId: 'uni-business',
    universityName: 'Global Business & Economics Academy',
    degreeLevel: 'DBA',
    category: 'Business & Management',
    duration: '3 Years',
    credits: 54,
    tuitionPerYear: 36000,
    applicationDeadline: 'Rolling Admissions',
    format: 'Hybrid',
    featured: true,
    description: 'Designed for high-potential executives seeking to master corporate finance, digital business transformation, global supply chains, and venture leadership through a Doctor of Business Administration.',
    curriculumHighlights: ['Corporate Valuation & Mergers', 'Strategic Leadership in Tech', 'Global Supply Chain Management', 'Venture Capital & Private Equity'],
    careerOutcomes: ['Chief Executive Officer (CEO)', 'Management Consultant', 'VP of Operations', 'Investment Partner'],
    prerequisites: 'MBA or Master\'s degree with minimum 5 years of senior professional management experience.'
  },
  {
    id: 'prog-med-md',
    title: 'DSc in Clinical Medicine & Pathology',
    universityId: 'uni-health',
    universityName: 'St. Jude College of Health Sciences',
    degreeLevel: 'DSc / ScD',
    category: 'Medicine & Health',
    duration: '4 Years',
    credits: 120,
    tuitionPerYear: 42000,
    applicationDeadline: 'Oct 15, 2026',
    format: 'Full-time On Campus',
    featured: true,
    description: 'Comprehensive medical research training combining advanced clinical pathology, genomics, simulated surgical suites, and elite clinical residency rotations.',
    curriculumHighlights: ['Advanced Pathology & Histology', 'Pathophysiology & Pharmacology', 'Clinical Research Methodology', 'Surgical & Emergency Medicine Rotations'],
    careerOutcomes: ['Clinical Director', 'Medical Researcher', 'Pathologist', 'Attending Physician'],
    prerequisites: 'Bachelor\'s or Master\'s in Biomedical Sciences or Pre-Med. MCAT/GRE scores and 200+ hours of clinical shadow experience.'
  },
  {
    id: 'prog-law-jd',
    title: 'DPhil in Constitutional Law & Public Policy',
    universityId: 'uni-law',
    universityName: 'Veritas School of Law & Public Policy',
    degreeLevel: 'DPhil',
    category: 'Law & Public Policy',
    duration: '3-4 Years',
    credits: 90,
    tuitionPerYear: 34000,
    applicationDeadline: 'Feb 01, 2027',
    format: 'Full-time On Campus',
    featured: false,
    description: 'Equipping legal scholars to advocate in federal courts, draft emerging cyber legislation, and master constitutional law, intellectual property, and international human rights.',
    curriculumHighlights: ['Advanced Constitutional Theory', 'Intellectual Property & AI Regulation', 'Federal Appellate Advocacy', 'International Trade & Human Rights'],
    careerOutcomes: ['Trial Attorney', 'Judicial Law Clerk', 'Corporate General Counsel', 'Legislative Policy Advisor'],
    prerequisites: 'Master of Laws (LL.M.) or equivalent legal degree. Strong research proposal.'
  },
  {
    id: 'prog-vfx-bfa',
    title: 'EdD in Creative Media & Educational Technology',
    universityId: 'uni-arts',
    universityName: 'Aura College of Creative Arts & Design',
    degreeLevel: 'EdD',
    category: 'Arts & Humanities',
    duration: '3 Years',
    credits: 60,
    tuitionPerYear: 21000,
    applicationDeadline: 'Jan 31, 2027',
    format: 'Full-time On Campus',
    featured: false,
    description: 'A doctoral program in education focused on immersive soundstages, digital animation suites, Unreal Engine 5 real-time graphics, and educational design pipeline.',
    curriculumHighlights: ['3D Modeling & Sculpting', 'Unreal Engine 5 Real-Time Production', 'Digital Curriculum & Pedagogy', 'Virtual Production & Motion Capture'],
    careerOutcomes: ['Lead 3D Artist', 'VFX Supervisor', 'Unreal Technical Director', 'Media Arts Professor'],
    prerequisites: 'Master\'s degree in Arts, Media, Education or related fields. Portfolio submission.'
  },
  {
    id: 'prog-fintech-msc',
    title: 'DBA in Financial Technology & Quantitative Finance',
    universityId: 'uni-business',
    universityName: 'Global Business & Economics Academy',
    degreeLevel: 'DBA',
    category: 'Business & Management',
    duration: '3 Years',
    credits: 45,
    tuitionPerYear: 29500,
    applicationDeadline: 'Jan 15, 2027',
    format: 'Full-time On Campus',
    featured: false,
    description: 'Master algorithmic trading, blockchain protocols, machine learning risk models, and quantitative asset pricing on live trading floors at a doctoral research level.',
    curriculumHighlights: ['Algorithmic Trading & Python', 'Blockchain Architecture & Smart Contracts', 'Quantitative Risk Modeling', 'Financial Machine Learning'],
    careerOutcomes: ['Quantitative Analyst (Quant)', 'FinTech Product Lead', 'Risk Manager', 'Algorithmic Trader'],
    prerequisites: 'Master\'s degree in Finance, Economics, or Quantitative Science.'
  },
  {
    id: 'prog-biotech-msc',
    title: 'EngD in Molecular Biotechnology & Bioengineering',
    universityId: 'uni-heritage',
    universityName: 'Heritage State University',
    degreeLevel: 'EngD',
    category: 'Natural Sciences',
    duration: '4 Years',
    credits: 80,
    tuitionPerYear: 22000,
    applicationDeadline: 'Dec 01, 2026',
    format: 'Full-time On Campus',
    featured: false,
    description: 'Hands-on doctoral research with CRISPR gene therapy, synthetic biology, biopharmaceutical manufacturing, and clinical trial design in cutting-edge cleanrooms.',
    curriculumHighlights: ['CRISPR-Cas9 Gene Editing', 'Recombinant DNA Technology', 'Biopharmaceutical Process Engineering', 'Bioinformatics & Proteomics'],
    careerOutcomes: ['Biotech Research Scientist', 'Genomics Project Manager', 'Bio-Process Engineer', 'Clinical Trial Director'],
    prerequisites: 'Master\'s or Bachelor\'s in Bioengineering, Biochemistry, or related field.'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'ADM-2026-8842',
    applicantName: 'Sophia Lin',
    email: 'sophia.lin@example.com',
    phone: '+1 (555) 234-5678',
    universityName: 'Heritage State University',
    programTitle: 'Ph.D. in Computer Science & Software Engineering',
    degreeLevel: 'PhD',
    gpa: '3.92',
    status: 'Accepted' as const,
    appliedDate: '2026-06-12',
    documentsUploaded: ['University Transcript.pdf', 'GRE Scores (330).pdf', 'Research Proposal.pdf', 'Recommendation Letter.pdf'],
    notes: 'Accepted with Merit Dean Fellowship ($10,000/yr).'
  },
  {
    id: 'ADM-2026-9120',
    applicantName: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (555) 987-6543',
    universityName: 'Veritas Institute of Technology',
    programTitle: 'DSc in Artificial Intelligence & Neural Networks',
    degreeLevel: 'DSc / ScD',
    gpa: '3.85',
    status: 'Under Review' as const,
    appliedDate: '2026-07-04',
    documentsUploaded: ['M.S. Transcript.pdf', 'GRE Official Report.pdf', 'Research Proposal.pdf'],
    notes: 'Faculty committee evaluation in progress.'
  },
  {
    id: 'ADM-2026-4411',
    applicantName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    universityName: 'Global Business & Economics Academy',
    programTitle: 'DBA in Global Strategic Leadership & Innovation',
    degreeLevel: 'DBA',
    gpa: '3.70',
    status: 'Interview Scheduled' as const,
    appliedDate: '2026-07-10',
    documentsUploaded: ['Resume_Executive.pdf', 'Transcripts.pdf', 'Employer Sponsorship.pdf'],
    notes: 'Virtual interview scheduled for August 2, 2026.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'David K. O\'Connor',
    program: 'DSc in Artificial Intelligence',
    university: 'Veritas Institute of Technology',
    graduationYear: 'Class of 2025',
    quote: 'The seamless admission portal made applying effortless. Within 3 months of graduating, I secured my dream role as an AI Research Scientist at OpenAI.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    achievement: 'Lead AI Researcher at OpenAI'
  },
  {
    id: 't2',
    name: 'Amara Patel',
    program: 'DSc in Clinical Medicine',
    university: 'St. Jude College of Health Sciences',
    graduationYear: 'Class of 2024',
    quote: 'Thanks to the university scholarship calculator, I received an 80% tuition merit grant! The clinical hospital access here is unrivaled.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    achievement: 'Surgical Resident at Johns Hopkins'
  },
  {
    id: 't3',
    name: 'Julian Thorne',
    program: 'DBA in Global Strategic Leadership',
    university: 'Global Business & Economics Academy',
    graduationYear: 'Class of 2026',
    quote: 'Studying in D.C. and New York opened doors directly to Wall Street partners. The campus community and faculty mentorship are top tier.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    achievement: 'Managing Director, Fintech Ventures'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do I apply for doctoral admissions through this portal?',
    answer: 'Select your target university or doctoral program from our directory, click "Apply Now", or go directly to the Admissions Portal navlink. You can fill in your academic profile, upload transcripts, and track your application in real-time using your tracking ID.'
  },
  {
    id: 'faq-2',
    category: 'Scholarships',
    question: 'Are scholarships available for international and domestic students?',
    answer: 'Yes! Over 85% of accepted students receive merit-based or need-based financial aid. You can use our built-in Scholarship Calculator on the Admissions Portal tab to estimate your grant eligibility based on GPA and standardized test scores.'
  },
  {
    id: 'faq-3',
    category: 'International Students',
    question: 'Do you offer F-1 Visa sponsorship and English proficiency assistance?',
    answer: 'All participating universities issue I-20 documentation for F-1 student visas upon admission. We accept TOEFL, IELTS (6.5+), and Duolingo English Tests (115+).'
  },
  {
    id: 'faq-4',
    category: 'Campus Life',
    question: 'Can I schedule a physical or virtual campus tour before applying?',
    answer: 'Absolutely! Click on any university card under the "Universities" tab to launch an interactive 360-degree virtual tour or book a personalized in-person campus walk with a student ambassador.'
  }
];
