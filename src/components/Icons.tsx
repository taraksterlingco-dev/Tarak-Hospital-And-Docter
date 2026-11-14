import {
  Activity,
  Ambulance,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Pill,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
  X,
} from 'lucide-react';
import type { DepartmentItem, DoctorServiceItem, FacilityItem } from '../data/mockHealthcareData';

export {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldAlert,
  Star,
  Stethoscope,
  X,
};

export function ServiceIcon({
  type,
  className = 'w-5 h-5',
}: {
  type: DoctorServiceItem['iconKey'];
  className?: string;
}) {
  switch (type) {
    case 'consultation':
      return <Stethoscope className={className} aria-hidden="true" />;
    case 'checkup':
      return <HeartPulse className={className} aria-hidden="true" />;
    case 'followup':
      return <Activity className={className} aria-hidden="true" />;
    case 'online':
      return <Video className={className} aria-hidden="true" />;
    case 'lab':
      return <FlaskConical className={className} aria-hidden="true" />;
    case 'emergency':
      return <ShieldAlert className={className} aria-hidden="true" />;
  }
}

export function DepartmentIcon({
  type,
  className = 'w-5 h-5',
}: {
  type: DepartmentItem['iconKey'];
  className?: string;
}) {
  switch (type) {
    case 'cardiology':
      return <HeartPulse className={className} aria-hidden="true" />;
    case 'neurology':
      return <Brain className={className} aria-hidden="true" />;
    case 'orthopedics':
      return <Bone className={className} aria-hidden="true" />;
    case 'pediatrics':
      return <Baby className={className} aria-hidden="true" />;
    case 'gynecology':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'oncology':
      return <Microscope className={className} aria-hidden="true" />;
    case 'radiology':
      return <Scan className={className} aria-hidden="true" />;
    case 'emergency':
      return <ShieldAlert className={className} aria-hidden="true" />;
  }
}

export function FacilityIcon({
  type,
  className = 'w-5 h-5',
}: {
  type: FacilityItem['iconKey'];
  className?: string;
}) {
  switch (type) {
    case 'icu':
      return <Activity className={className} aria-hidden="true" />;
    case 'pharmacy':
      return <Pill className={className} aria-hidden="true" />;
    case 'ambulance':
      return <Ambulance className={className} aria-hidden="true" />;
    case 'lab':
      return <FlaskConical className={className} aria-hidden="true" />;
    case 'insurance':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'parking':
      return <Car className={className} aria-hidden="true" />;
  }
}
