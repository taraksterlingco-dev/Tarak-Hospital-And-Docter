export type ProfileType = 'doctor' | 'hospital';

export interface AppointmentInput {
  patientName: string;
  phone: string;
  date: string;
  timeSlot: string;
  reason?: string;
  departmentId?: string;
  doctorId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  experience: string;
  qualifications: string;
  image: string;
}

export function getPlaceholderByType(type: ProfileType | null): string {
  if (type === 'doctor') {
    return 'Enter Doctor Name (e.g. Dr. Rahul Sharma)';
  }
  if (type === 'hospital') {
    return 'Enter Hospital Name (e.g. City Care Hospital)';
  }
  return 'Select Doctor or Hospital above, then enter your name';
}

export function canProceedToDemo(type: ProfileType | null, name: string): boolean {
  return type !== null && name.trim().length > 0;
}

export function buildDemoRoute(type: ProfileType, name: string): string {
  const cleanName = name.trim();
  const params = new URLSearchParams({ name: cleanName });
  return `/${type}?${params.toString()}`;
}

export function extractProfileName(search: string, contextName?: string | null): string | null {
  const params = new URLSearchParams(search);
  const fromQuery = params.get('name')?.trim();
  if (fromQuery) {
    return fromQuery;
  }
  const fromContext = contextName?.trim();
  return fromContext || null;
}

export function formatDoctorPossessive(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "Doctor's";
  return trimmed.endsWith('s') || trimmed.endsWith('S') ? `${trimmed}'` : `${trimmed}'s`;
}

export function filterDoctorsByDepartment(
  doctors: DoctorProfile[],
  departmentId: string
): DoctorProfile[] {
  if (!departmentId || departmentId === 'all') {
    return doctors;
  }
  const filtered = doctors.filter((doc) => doc.departmentId === departmentId);
  return filtered.length > 0 ? filtered : doctors;
}

export function validateAppointmentForm(
  input: AppointmentInput,
  options: { requireDepartment?: boolean; requireDoctor?: boolean } = {}
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.patientName.trim()) {
    errors.patientName = 'Please enter the patient full name.';
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Please enter a valid contact phone number.';
  }

  if (!input.date.trim()) {
    errors.date = 'Please choose a preferred appointment date.';
  }

  if (!input.timeSlot.trim()) {
    errors.timeSlot = 'Please select an available time slot.';
  }

  if (options.requireDepartment && !input.departmentId?.trim()) {
    errors.departmentId = 'Please select a medical department.';
  }

  if (options.requireDoctor && !input.doctorId?.trim()) {
    errors.doctorId = 'Please choose a specialist.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
