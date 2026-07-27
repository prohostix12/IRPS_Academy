export type ProcessRole = 
  | 'Student'
  | 'Admission Office'
  | 'University'
  | 'Supervisor / Guide'
  | 'RDC'
  | 'External Examiner'
  | 'Academic Council'
  | 'Examination Branch';

export interface ProcessStep {
  number: number;
  title: string;
  role: ProcessRole;
  stage: string;
  stageNumber: number;
  description: string;
  duration: string;
  deliverable: string;
  prerequisite: string;
}

export const STAGES = [
  { number: 1, name: 'Pre-Admission & Enrollment', color: 'from-[#00296b] to-[#003f9e]' },
  { number: 2, name: 'Course Work & Milestones', color: 'from-[#5a189a] to-[#7b2cbf]' },
  { number: 3, name: 'Research Design & Synopsis', color: 'from-[#007f5f] to-[#2b9348]' },
  { number: 4, name: 'Execution & Progression', color: 'from-[#d946ef] to-[#a21caf]' },
  { number: 5, name: 'Thesis & Evaluation', color: 'from-[#e65f2b] to-[#f3722c]' },
  { number: 6, name: 'Final Defense & Graduation', color: 'from-[#0f172a] to-[#1e293b]' }
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Student Registration',
    role: 'Student',
    stage: 'Pre-Admission & Enrollment',
    stageNumber: 1,
    description: 'Applicant registers on the official university portal, inputs their academic history, and creates a secure candidate profile.',
    duration: '1 - 3 Days',
    deliverable: 'Registered Student Account & Portal Profile ID',
    prerequisite: 'Valid email address, identification proof, and qualifying postgraduate records.'
  },
  {
    number: 2,
    title: 'Entrance Examination',
    role: 'Admission Office',
    stage: 'Pre-Admission & Enrollment',
    stageNumber: 1,
    description: 'A comprehensive written admission test evaluating subject domain knowledge, analytical capabilities, and research methodology aptitude.',
    duration: '1 Day (Scheduled Session)',
    deliverable: 'Entrance Exam Scorecard & Merit Ranking',
    prerequisite: 'Successful registration and examination fee submission.'
  },
  {
    number: 3,
    title: 'Personal Interview',
    role: 'University',
    stage: 'Pre-Admission & Enrollment',
    stageNumber: 1,
    description: 'A rigorous one-on-one evaluation before an academic panel to present and defend research interests and past accomplishments.',
    duration: '1 Day (Per Candidate)',
    deliverable: 'Interview Panel Assessment Score',
    prerequisite: 'Qualifying score in the Entrance Examination (or exemption status).'
  },
  {
    number: 4,
    title: 'Admission Offer Letter',
    role: 'Admission Office',
    stage: 'Pre-Admission & Enrollment',
    stageNumber: 1,
    description: 'Formal issuance of the admission offer by the research administration, containing enrollment guidelines, fees, and tentative advisor details.',
    duration: '3 - 5 Days post-interview',
    deliverable: 'Official Admission Offer Letter PDF',
    prerequisite: 'Clearance of interview round and validation by the University Admissions Board.'
  },
  {
    number: 5,
    title: 'Student Enrollment',
    role: 'Student',
    stage: 'Pre-Admission & Enrollment',
    stageNumber: 1,
    description: 'Finalization of admission through physical verification of original certificates, fee payment, and sign-off on rules and regulations.',
    duration: '1 - 2 Weeks',
    deliverable: 'Active Enrollment Status & Official Roll/ID Number',
    prerequisite: 'Signed admission offer acceptance and fee payment confirmation.'
  },
  {
    number: 6,
    title: 'Course Work (0-6 Months)',
    role: 'Student',
    stage: 'Course Work & Milestones',
    stageNumber: 2,
    description: 'Mandatory coursework involving academic lectures, assignments, and seminars on advanced Research Methodology, Quantitative tools, and specialized topics.',
    duration: '6 Months',
    deliverable: 'Course Work Attendance & Internal Performance Review',
    prerequisite: 'Successful university enrollment.'
  },
  {
    number: 7,
    title: 'Course Work Examination',
    role: 'Examination Branch',
    stage: 'Course Work & Milestones',
    stageNumber: 2,
    description: 'End-semester written examination to assess the candidate’s foundation and understanding of the coursework subjects.',
    duration: '1 - 2 Weeks',
    deliverable: 'Examination Answer Scripts and Grading Sheets',
    prerequisite: 'Minimum attendance percentage (75%) and submission of coursework assignments.'
  },
  {
    number: 8,
    title: 'Course Work Result',
    role: 'Examination Branch',
    stage: 'Course Work & Milestones',
    stageNumber: 2,
    description: 'Official calculation and publication of course work grades. Candidates must maintain the minimum required grade point average (usually B grade or 6.0 CGPA) to proceed.',
    duration: '2 - 3 Weeks',
    deliverable: 'Official Course Work Marksheet & Grade Transcript',
    prerequisite: 'Participation in the course work examinations.'
  },
  {
    number: 9,
    title: 'Supervisor / Guide Allotment',
    role: 'Supervisor / Guide',
    stage: 'Course Work & Milestones',
    stageNumber: 2,
    description: 'Official allocation of an approved academic supervisor (and co-supervisor if interdisciplinary) whose research field aligns with the student’s interest.',
    duration: '1 - 2 Weeks',
    deliverable: 'Official Guide Allocation Letter',
    prerequisite: 'Passing grades in the Course Work Examination.'
  },
  {
    number: 10,
    title: 'Research Development Committee (RDC)',
    role: 'RDC',
    stage: 'Course Work & Milestones',
    stageNumber: 2,
    description: 'First meeting with the newly-constituted Research Development Committee to review the broad research domain and assign the research advisory panel.',
    duration: '1 Day (Meeting)',
    deliverable: 'Minutes of RDC Approval & Advisory Panel Directive',
    prerequisite: 'Allotment of Supervisor.'
  },
  {
    number: 11,
    title: 'Research Topic Finalization',
    role: 'Student',
    stage: 'Research Design & Synopsis',
    stageNumber: 3,
    description: 'In-depth discussions with the Research Supervisor to narrow down the research problem, formulate objectives, and freeze the formal research title.',
    duration: '2 - 4 Weeks',
    deliverable: 'Approved Research Title & Problem Statement',
    prerequisite: 'Supervisor allotment and initial RDC feedback.'
  },
  {
    number: 12,
    title: 'Synopsis Preparation',
    role: 'Student',
    stage: 'Research Design & Synopsis',
    stageNumber: 3,
    description: 'Drafting a structured research proposal (synopsis) detailing: Introduction, Literature Review, Objectives, Research Methodology, expected outcomes, and Bibliography.',
    duration: '4 - 8 Weeks',
    deliverable: 'Draft Synopsis Document (typically 15-25 pages)',
    prerequisite: 'Finalized research topic and outline.'
  },
  {
    number: 13,
    title: 'Synopsis Submission',
    role: 'Student',
    stage: 'Research Design & Synopsis',
    stageNumber: 3,
    description: 'Submission of the final synopsis signed and certified by the supervisor to the research department for formal university registration.',
    duration: '1 - 2 Weeks',
    deliverable: 'Synopsis Submission Receipt & Official Research Registration No.',
    prerequisite: 'Supervisor approval and sign-off on the synopsis document.'
  },
  {
    number: 14,
    title: 'Research Work & Thesis',
    role: 'Student',
    stage: 'Execution & Progression',
    stageNumber: 4,
    description: 'The core research execution phase: performing experiments, field work, data collection, programming/simulations, mathematical derivations, and writing draft chapters.',
    duration: '2 - 4 Years (Continuous)',
    deliverable: 'Experimental Data, Simulation Outputs, and Draft Thesis Chapters',
    prerequisite: 'Approved Synopsis and active research registration.'
  },
  {
    number: 15,
    title: 'Half-Yearly Progress Report',
    role: 'Student',
    stage: 'Execution & Progression',
    stageNumber: 4,
    description: 'Submitting a detailed progress report signed by the Supervisor to the Research cell every 6 months to maintain active candidacy and report work milestones.',
    duration: 'Every 6 Months',
    deliverable: 'Signed Semiannual Progress Report and Presentation Review',
    prerequisite: 'Active research and ongoing guidance sessions with the Supervisor.'
  },
  {
    number: 16,
    title: 'Research Paper Publication (2 Papers)',
    role: 'Student',
    stage: 'Execution & Progression',
    stageNumber: 4,
    description: 'Authoring and publishing at least two original research papers in peer-reviewed journals indexed in Scopus, Web of Science, or equivalent high-impact indices.',
    duration: '6 - 12 Months',
    deliverable: 'Published Research Paper PDFs and Journal Indexing proof',
    prerequisite: 'Original research outcomes verified by the Supervisor.'
  },
  {
    number: 17,
    title: 'Conference Presentation Certificates (2)',
    role: 'Student',
    stage: 'Execution & Progression',
    stageNumber: 4,
    description: 'Presenting research findings at minimum two recognized national or international conferences and obtaining official presentation certificates.',
    duration: '1 - 3 Days per conference',
    deliverable: 'Official Conference Certificates & Proceeding Pages',
    prerequisite: 'Accepted abstracts/papers at accredited conferences.'
  },
  {
    number: 18,
    title: 'Plagiarism Check',
    role: 'University',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Submitting the complete thesis draft to the university library/research department for official plagiarism detection (similarity index must be < 10%).',
    duration: '3 - 5 Days',
    deliverable: 'Official Plagiarism Analysis Report',
    prerequisite: 'Completed and formatted thesis draft signed by the student and supervisor.'
  },
  {
    number: 19,
    title: 'Thesis Summary Submission',
    role: 'Student',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Submitting a detailed summary or abstract of the thesis (typically 10-15 pages) to facilitate selection of the external evaluation board.',
    duration: '1 - 2 Weeks',
    deliverable: 'Printed & Digital copies of the Thesis Summary',
    prerequisite: 'Clearance from the plagiarism check.'
  },
  {
    number: 20,
    title: 'Request for Pre-Ph.D. Presentation',
    role: 'Student',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Applying for permission to deliver the pre-PhD submission seminar, enclosing proof of publications, conference certificates, and progress report receipts.',
    duration: '1 Week',
    deliverable: 'Approved Seminar Date and Notification',
    prerequisite: 'Completed publications, conference presentations, and plagiarism clearance.'
  },
  {
    number: 21,
    title: 'Pre-Ph.D. Presentation',
    role: 'RDC',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Presenting the complete research outcomes before the RDC, departmental faculty, and fellow scholars. Incorporating constructive feedback into the final thesis.',
    duration: '1 Day',
    deliverable: 'Pre-Submission Seminar Approval Certificate & Feedback Report',
    prerequisite: 'Official scheduling and approval of the request.'
  },
  {
    number: 22,
    title: 'Thesis Sent to External Examiner for Evaluation',
    role: 'External Examiner',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Dispatch of the finalized and bound thesis to two or three external examiners (highly qualified national and international experts in the research domain) for blind review.',
    duration: '2 - 4 Months',
    deliverable: 'Examiner Acknowledgment and Evaluation Request Dispatch Logs',
    prerequisite: 'Submission of the final thesis incorporating all feedback from the Pre-PhD presentation.'
  },
  {
    number: 23,
    title: 'External Evaluation Report Received',
    role: 'University',
    stage: 'Thesis & Evaluation',
    stageNumber: 5,
    description: 'Receiving and checking evaluation reports from external examiners. Reports must state that the thesis is worthy of award and recommend scheduling the open defense.',
    duration: '1 - 2 Weeks post-reports',
    deliverable: 'Collated External Reports & Board Approval to conduct Viva-Voce',
    prerequisite: 'Completion of review by external examiners.'
  },
  {
    number: 24,
    title: 'Final Ph.D. Viva-Voce',
    role: 'RDC',
    stage: 'Final Defense & Graduation',
    stageNumber: 6,
    description: 'An open oral defense of the thesis, where the candidate presents their work and defends it in front of the external examiner, committee members, and public audience.',
    duration: '2 - 3 Hours',
    deliverable: 'Signed Viva-Voce Examination Report & Recommendation Sheet',
    prerequisite: 'Satisfactory reports from all external examiners.'
  },
  {
    number: 25,
    title: 'Approval by Academic Council',
    role: 'Academic Council',
    stage: 'Final Defense & Graduation',
    stageNumber: 6,
    description: 'Formal ratification of the candidate’s viva defense and thesis by the university’s Academic Council, declaring the candidate eligible for the degree.',
    duration: 'Monthly/Quarterly Meeting cycle',
    deliverable: 'Academic Council Notification & Provisional Degree Certificate',
    prerequisite: 'Successful recommendation from the Viva-Voce examination panel.'
  },
  {
    number: 26,
    title: 'Convocation',
    role: 'University',
    stage: 'Final Defense & Graduation',
    stageNumber: 6,
    description: 'Graduation ceremony where the candidate is officially called up to receive academic honors, hoods, and the doctoral degree scroll.',
    duration: '1 Day',
    deliverable: 'Conferral of Degree & Ceremonial Academic Hood',
    prerequisite: 'Academic Council approval and registration for convocation.'
  },
  {
    number: 27,
    title: 'Degree Awarded to the Candidate',
    role: 'University',
    stage: 'Final Defense & Graduation',
    stageNumber: 6,
    description: 'The final administrative closure. The official, printed Ph.D. Degree Certificate is presented or dispatched to the candidate, concluding their academic journey.',
    duration: '1 - 2 Weeks post-convocation',
    deliverable: 'Original Ph.D. Degree Certificate and Official Final Transcript',
    prerequisite: 'Clearance of all university departments (no-dues) and convocation completion.'
  }
];
