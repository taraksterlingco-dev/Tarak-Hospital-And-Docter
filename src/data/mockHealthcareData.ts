import tarakSterlingLogo from '../assets/logo/tarak-sterling-logo.png';
import tarakSterlingMark from '../assets/images/icons/tarak-sterling-mark.png';

import doctorLeadImg from '../assets/images/doctors/doctor-lead.jpg';
import doctorCardioImg from '../assets/images/doctors/doctor-cardio.jpg';
import doctorNeuroImg from '../assets/images/doctors/doctor-neuro.jpg';
import doctorOrthoImg from '../assets/images/doctors/doctor-ortho.jpg';
import doctorPedsImg from '../assets/images/doctors/doctor-peds.jpg';
import doctorGynImg from '../assets/images/doctors/doctor-gyn.jpg';

import hospitalBuildingImg from '../assets/images/hospital/hospital-building.jpg';
import clinicInteriorImg from '../assets/images/hospital/clinic-interior.jpg';
import facilityIcuImg from '../assets/images/hospital/facility-icu.jpg';
import facilityLabImg from '../assets/images/hospital/facility-lab.jpg';
import facilityAmbulanceImg from '../assets/images/hospital/facility-ambulance.jpg';
import facilityPharmacyImg from '../assets/images/hospital/facility-pharmacy.jpg';
import clinicLocationMapImg from '../assets/images/hospital/clinic-location-map.jpg';

import healthTipHeartImg from '../assets/images/services/health-tip-heart.jpg';
import healthTipCheckupImg from '../assets/images/services/health-tip-checkup.jpg';

import avatarPatient1Img from '../assets/images/avatars/avatar-patient-1.jpg';
import avatarPatient2Img from '../assets/images/avatars/avatar-patient-2.jpg';
import avatarPatient3Img from '../assets/images/avatars/avatar-patient-3.jpg';
import avatarPatient4Img from '../assets/images/avatars/avatar-patient-4.jpg';

import type { DoctorProfile } from '../utils/demoLogic';

export const BRAND_ASSETS = {
  logo: tarakSterlingLogo,
  mark: tarakSterlingMark,
};

export const DOCTOR_IMAGES = {
  lead: doctorLeadImg,
  clinicInterior: clinicInteriorImg,
  locationMap: clinicLocationMapImg,
};

export const HOSPITAL_IMAGES = {
  building: hospitalBuildingImg,
  clinicInterior: clinicInteriorImg,
  locationMap: clinicLocationMapImg,
};

export const TIME_SLOTS = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
];

export interface DoctorServiceItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  iconKey: 'consultation' | 'checkup' | 'followup' | 'online' | 'lab' | 'emergency';
}

export const DOCTOR_SERVICES: DoctorServiceItem[] = [
  {
    id: 'general-consultation',
    title: 'General Consultation',
    description:
      'Thorough 1-on-1 clinical evaluation covering symptoms, medical history, and an actionable treatment plan.',
    duration: '30 min visit',
    iconKey: 'consultation',
  },
  {
    id: 'health-checkup',
    title: 'Health Checkup',
    description:
      'Annual preventive screening panels tailored by age and risk factors to detect issues before symptoms start.',
    duration: '45 min panel',
    iconKey: 'checkup',
  },
  {
    id: 'follow-up-care',
    title: 'Follow-up Care',
    description:
      'Structured recovery monitoring, prescription calibration, and ongoing chronic-condition management.',
    duration: '20 min review',
    iconKey: 'followup',
  },
  {
    id: 'online-consultation',
    title: 'Online Consultation',
    description:
      'Secure HD video visits from home for lab report reviews, medication refills, and non-urgent medical advice.',
    duration: '25 min video',
    iconKey: 'online',
  },
  {
    id: 'lab-tests',
    title: 'Lab Tests',
    description:
      'On-site blood chemistry, ECG, lipid profile, and metabolic diagnostics with same-day digital reporting.',
    duration: 'Same-day reports',
    iconKey: 'lab',
  },
  {
    id: 'emergency-support',
    title: 'Emergency Support',
    description:
      'Priority same-day triage for acute fevers, blood pressure spikes, minor injuries, and urgent care needs.',
    duration: 'Priority triage',
    iconKey: 'emergency',
  },
];

export interface ReviewItem {
  id: string;
  patientName: string;
  context: string;
  rating: number;
  quote: string;
  avatar: string;
  visitDate: string;
}

export const DOCTOR_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    patientName: 'Meera Nair',
    context: 'Preventive Health Checkup',
    rating: 5,
    quote:
      'Every report was explained in plain language without rushing. My blood pressure stabilized within six weeks of starting the new care plan.',
    avatar: avatarPatient1Img,
    visitDate: 'October 2026',
  },
  {
    id: 'rev-2',
    patientName: 'Arjun Deshmukh',
    context: 'General Consultation',
    rating: 5,
    quote:
      'Booking took less than a minute and the wait time at the clinic was under five minutes. Warm staff and attentive follow-through.',
    avatar: avatarPatient2Img,
    visitDate: 'October 2026',
  },
  {
    id: 'rev-3',
    patientName: 'Suresh Kulkarni',
    context: 'Diabetes & Follow-up Care',
    rating: 5,
    quote:
      'Having both in-person visits and quick video follow-ups made managing my HbA1c effortless. Truly dependable care.',
    avatar: avatarPatient3Img,
    visitDate: 'September 2026',
  },
  {
    id: 'rev-4',
    patientName: 'Priya Menon',
    context: 'Online Consultation',
    rating: 5,
    quote:
      'My daughter had a high fever late afternoon and we got a same-day priority slot. Clear guidance and a follow-up check the next morning.',
    avatar: avatarPatient4Img,
    visitDate: 'September 2026',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const DOCTOR_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What should I bring to my first clinic appointment?',
    answer:
      'Please bring a valid photo ID, your current list of medications or supplements, and any recent lab reports or imaging scans from the past 12 months.',
  },
  {
    id: 'faq-2',
    question: 'Do you offer online video consultations for follow-ups?',
    answer:
      'Yes. Patients who have completed an initial checkup can book 25-minute secure video consultations for report reviews, dosage adjustments, and wellness check-ins.',
  },
  {
    id: 'faq-3',
    question: 'How soon are diagnostic lab test results available?',
    answer:
      'Most routine blood panels, thyroid screenings, and ECG interpretations are ready the same evening and shared directly with you alongside a doctor review note.',
  },
  {
    id: 'faq-4',
    question: 'Can I reschedule or cancel my appointment slot?',
    answer:
      'Yes. You can call the reception desk at least 4 hours prior to your scheduled slot to reschedule at no extra charge.',
  },
  {
    id: 'faq-5',
    question: 'Are walk-in urgent visits accommodated?',
    answer:
      'We reserve dedicated urgent triage slots each morning and afternoon for acute symptoms. Calling ahead helps us prepare your chart before you arrive.',
  },
];

export interface DepartmentItem {
  id: string;
  name: string;
  summary: string;
  specialistsCount: string;
  iconKey:
    | 'cardiology'
    | 'neurology'
    | 'orthopedics'
    | 'pediatrics'
    | 'gynecology'
    | 'oncology'
    | 'radiology'
    | 'emergency';
}

export const HOSPITAL_DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    summary: 'Non-invasive echo, interventional cath lab, and preventive heart care.',
    specialistsCount: '8 specialists',
    iconKey: 'cardiology',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    summary: 'Comprehensive stroke unit, epilepsy clinic, and neuro-rehabilitation.',
    specialistsCount: '6 specialists',
    iconKey: 'neurology',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    summary: 'Joint replacement, sports injury arthroscopy, and spine surgery.',
    specialistsCount: '7 specialists',
    iconKey: 'orthopedics',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    summary: 'Neonatal care, childhood immunizations, and adolescent health.',
    specialistsCount: '9 specialists',
    iconKey: 'pediatrics',
  },
  {
    id: 'gynecology',
    name: 'Gynecology',
    summary: 'Maternity suites, minimally invasive laparoscopy, and women wellness.',
    specialistsCount: '6 specialists',
    iconKey: 'gynecology',
  },
  {
    id: 'oncology',
    name: 'Oncology',
    summary: 'Targeted medical oncology, day-care infusion, and tumor boards.',
    specialistsCount: '5 specialists',
    iconKey: 'oncology',
  },
  {
    id: 'radiology',
    name: 'Radiology',
    summary: '3T MRI, 128-slice CT, digital mammography, and ultrasound imaging.',
    specialistsCount: '4 specialists',
    iconKey: 'radiology',
  },
  {
    id: 'emergency',
    name: 'Emergency',
    summary: '24/7 Level-1 trauma bays, rapid cardiac triage, and ICU transfer.',
    specialistsCount: '24/7 rapid team',
    iconKey: 'emergency',
  },
];

export const HOSPITAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-cardio',
    name: 'Dr. Evelyn Reed',
    specialty: 'Senior Cardiologist',
    departmentId: 'cardiology',
    experience: '16 yrs experience',
    qualifications: 'MD, FACC · Interventional Cardiology',
    image: doctorCardioImg,
  },
  {
    id: 'doc-neuro',
    name: 'Dr. Thomas Alistair',
    specialty: 'Chief Neurologist',
    departmentId: 'neurology',
    experience: '21 yrs experience',
    qualifications: 'MD, DM · Stroke & Neurocritical Care',
    image: doctorNeuroImg,
  },
  {
    id: 'doc-ortho',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    departmentId: 'orthopedics',
    experience: '13 yrs experience',
    qualifications: 'MS Ortho · Joint & Sports Medicine',
    image: doctorOrthoImg,
  },
  {
    id: 'doc-peds',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Lead Pediatrician',
    departmentId: 'pediatrics',
    experience: '11 yrs experience',
    qualifications: 'MD Pediatrics · Neonatal & Child Care',
    image: doctorPedsImg,
  },
  {
    id: 'doc-gyn',
    name: 'Dr. Elena Chen',
    specialty: 'Obstetrics & Gynecology',
    departmentId: 'gynecology',
    experience: '15 yrs experience',
    qualifications: 'MD, FRCOG · Maternal & Pelvic Health',
    image: doctorGynImg,
  },
  {
    id: 'doc-internal',
    name: 'Dr. David Verma',
    specialty: 'Internal & Critical Care',
    departmentId: 'emergency',
    experience: '14 yrs experience',
    qualifications: 'MD · Acute & Trauma Medicine',
    image: doctorLeadImg,
  },
];

export interface FacilityItem {
  id: string;
  name: string;
  summary: string;
  availability: string;
  image?: string;
  iconKey: 'icu' | 'pharmacy' | 'ambulance' | 'lab' | 'insurance' | 'parking';
}

export const HOSPITAL_FACILITIES: FacilityItem[] = [
  {
    id: 'icu',
    name: 'Intensive Care Unit (ICU)',
    summary: '40-bed modular critical care suites with 1:1 nursing and continuous telemetry.',
    availability: '24/7 Intensivist Coverage',
    image: facilityIcuImg,
    iconKey: 'icu',
  },
  {
    id: 'diagnostic-lab',
    name: 'Diagnostic Lab',
    summary: 'NABL-grade automated pathology, microbiology, and molecular testing wing.',
    availability: 'Same-Day Digital Reports',
    image: facilityLabImg,
    iconKey: 'lab',
  },
  {
    id: 'ambulance',
    name: '24/7 Cardiac Ambulance',
    summary: 'GPS-dispatched Advanced Life Support fleet equipped with portable ventilators.',
    availability: 'Under 12 Min Dispatch',
    image: facilityAmbulanceImg,
    iconKey: 'ambulance',
  },
  {
    id: 'pharmacy',
    name: 'In-House Pharmacy',
    summary: 'Cold-chain verified essential and specialty prescriptions dispensed on campus.',
    availability: 'Open 24 Hours Daily',
    image: facilityPharmacyImg,
    iconKey: 'pharmacy',
  },
  {
    id: 'insurance-support',
    name: 'Cashless Insurance Desk',
    summary: 'Dedicated TPA coordinators supporting 35+ major health insurers and pre-authorizations.',
    availability: 'Fast-Track Pre-Auth',
    iconKey: 'insurance',
  },
  {
    id: 'parking',
    name: 'Valet & Patient Parking',
    summary: 'Wheelchair-accessible multi-level parking with covered emergency drop-off bays.',
    availability: '450+ Covered Bays',
    iconKey: 'parking',
  },
];

export interface HealthTipItem {
  id: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
}

export const HOSPITAL_HEALTH_TIPS: HealthTipItem[] = [
  {
    id: 'tip-heart',
    category: 'Preventive Cardiology',
    readTime: '4 min read',
    title: '5 Morning Habits That Lower Resting Blood Pressure Naturally',
    summary:
      'Simple dietary potassium swaps, hydration timing, and brisk 15-minute walks recommended by our cardiology wing.',
    image: healthTipHeartImg,
    publishedAt: 'November 2026',
  },
  {
    id: 'tip-checkup',
    category: 'Annual Screenings',
    readTime: '5 min read',
    title: 'Which Preventive Health Tests Actually Matter After Age 35?',
    summary:
      'Our internal medicine team breaks down lipid subfractions, HbA1c, and thyroid baselines into an easy yearly checklist.',
    image: healthTipCheckupImg,
    publishedAt: 'October 2026',
  },
  {
    id: 'tip-clinic',
    category: 'Hospital News',
    readTime: '3 min read',
    title: 'New Outpatient Same-Day Diagnostic Lounge Opens for Families',
    summary:
      'Faster check-ins, calm sunlit waiting suites, and integrated electronic prescriptions cut outpatient visit times in half.',
    image: clinicInteriorImg,
    publishedAt: 'October 2026',
  },
];

export const HOSPITAL_TESTIMONIALS: ReviewItem[] = [
  {
    id: 'hrev-1',
    patientName: 'Kavita Rao',
    context: 'Cardiac Care Unit',
    rating: 5,
    quote:
      'From the ambulance arrival to Dr. Reed’s angioplasty briefing, every step was transparent and calm. Our family felt supported around the clock.',
    avatar: avatarPatient1Img,
    visitDate: 'October 2026',
  },
  {
    id: 'hrev-2',
    patientName: 'Rohan Malhotra',
    context: 'Orthopedic Recovery',
    rating: 5,
    quote:
      'After my ACL surgery with Dr. Chen, the inpatient physiotherapy team had me walking safely within days. Spotless rooms and zero billing surprises.',
    avatar: avatarPatient2Img,
    visitDate: 'September 2026',
  },
  {
    id: 'hrev-3',
    patientName: 'Mahesh Iyer',
    context: 'Neurology & Diagnostics',
    rating: 5,
    quote:
      'Getting an MRI and seeing Dr. Alistair on the same afternoon saved us weeks of anxiety. Insurance cashless approval went through smoothly.',
    avatar: avatarPatient3Img,
    visitDate: 'August 2026',
  },
];
