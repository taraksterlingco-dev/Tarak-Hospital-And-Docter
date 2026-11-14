import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BookingModal, type BookingSummary } from '../components/BookingModal';
import { SiteFooter } from '../components/DemoChrome';
import {
  Calendar,
  Clock,
  DepartmentIcon,
  FacilityIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldAlert,
  Star,
  X,
} from '../components/Icons';
import { RevealSection } from '../components/RevealSection';
import { SafeImage } from '../components/SafeImage';
import { useDemoContext } from '../context/DemoContext';
import {
  HOSPITAL_DEPARTMENTS,
  HOSPITAL_DOCTORS,
  HOSPITAL_FACILITIES,
  HOSPITAL_HEALTH_TIPS,
  HOSPITAL_IMAGES,
  HOSPITAL_TESTIMONIALS,
  TIME_SLOTS,
} from '../data/mockHealthcareData';
import {
  extractProfileName,
  filterDoctorsByDepartment,
  validateAppointmentForm,
} from '../utils/demoLogic';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Departments', href: '#departments' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Appointments', href: '#appointments' },
  { label: 'Contact', href: '#contact' },
];

export function HospitalPage() {
  const location = useLocation();
  const { profileType, profileName } = useDemoContext();

  const resolvedName = extractProfileName(
    location.search,
    profileType === 'hospital' ? profileName : null
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Doctor grid filter
  const [doctorFilterDept, setDoctorFilterDept] = useState<string>('all');

  // Booking form state
  const todayIso = new Date().toISOString().split('T')[0];
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
    HOSPITAL_DEPARTMENTS[0].id
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(HOSPITAL_DOCTORS[0].id);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayIso);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [modalSummary, setModalSummary] = useState<BookingSummary | null>(null);

  if (!resolvedName) {
    return <Navigate to="/" replace />;
  }

  const visibleDoctors = filterDoctorsByDepartment(HOSPITAL_DOCTORS, doctorFilterDept);
  const bookingDoctors = filterDoctorsByDepartment(HOSPITAL_DOCTORS, selectedDepartmentId);

  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    const matching = filterDoctorsByDepartment(HOSPITAL_DOCTORS, deptId);
    if (matching.length > 0) {
      setSelectedDoctorId(matching[0].id);
    }
  };

  const handleBookFromDepartment = (deptId: string) => {
    handleDepartmentChange(deptId);
    document.getElementById('appointments')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookDoctor = (doctorId: string, departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setSelectedDoctorId(doctorId);
    document.getElementById('appointments')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateAppointmentForm(
      {
        patientName,
        phone,
        date,
        timeSlot,
        departmentId: selectedDepartmentId,
        doctorId: selectedDoctorId,
      },
      { requireDepartment: true, requireDoctor: true }
    );

    setFormErrors(result.errors);
    if (!result.valid) return;

    const deptName =
      HOSPITAL_DEPARTMENTS.find((d) => d.id === selectedDepartmentId)?.name ?? 'General';
    const docName =
      HOSPITAL_DOCTORS.find((doc) => doc.id === selectedDoctorId)?.name ?? 'Assigned Specialist';

    setModalSummary({
      title: 'Hospital appointment confirmed!',
      subtitle: `Your consultation request at ${resolvedName} has been logged. Please arrive 15 minutes prior to check-in.`,
      details: [
        { label: 'Hospital', value: resolvedName },
        { label: 'Department', value: deptName },
        { label: 'Specialist', value: docName },
        { label: 'Patient', value: patientName.trim() },
        { label: 'Phone', value: phone.trim() },
        { label: 'Date & Slot', value: `${date} · ${timeSlot}` },
      ],
    });
    setPatientName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. Sticky Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[240px] whitespace-nowrap shrink-0"
          >
            {resolvedName}
          </a>

          <nav aria-label="Hospital navigation" className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-700 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#emergency-helpline"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 whitespace-nowrap shrink-0"
            >
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              <span>Emergency</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <nav aria-label="Mobile hospital navigation" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#emergency-helpline"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                <span>24/7 Emergency Helpline</span>
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        {/* 2. Hero */}
        <RevealSection id="home" immediate className="bg-gradient-to-b from-slate-50/90 to-white pt-10 pb-14 sm:pt-14 sm:pb-18">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-sm font-semibold text-teal-700">
                  Multi-Specialty Tertiary Care · NABH Standards
                </p>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,4.2vw,3.4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
                  Welcome to {resolvedName}
                </h1>
                <p className="mt-3 font-display text-lg sm:text-xl font-semibold text-sky-800">
                  Compassionate care, advanced treatment
                </p>
                <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                  Round-the-clock trauma response, specialized surgical wings, and integrated
                  outpatient clinics designed around patient safety and dignity.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#appointments"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </a>
                  <a
                    href="#emergency-helpline"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm sm:text-base font-semibold text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 whitespace-nowrap"
                  >
                    <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                    <span>24/7 Emergency</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[280px] lg:min-h-[380px] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
                  <SafeImage
                    src={HOSPITAL_IMAGES.building}
                    alt={`Exterior campus view of ${resolvedName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-width 4-stat bar */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="p-6">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  200+ Beds
                </p>
                <p className="mt-1 text-sm text-slate-600">Inpatient & ICU Suites</p>
              </div>
              <div className="p-6">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  50+ Specialists
                </p>
                <p className="mt-1 text-sm text-slate-600">Board-Certified Consultants</p>
              </div>
              <div className="p-6">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-red-600 tabular-nums">
                  24/7 Emergency
                </p>
                <p className="mt-1 text-sm text-slate-600">Trauma & Cardiac Dispatch</p>
              </div>
              <div className="p-6">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-teal-700 tabular-nums">
                  100k+ Patients
                </p>
                <p className="mt-1 text-sm text-slate-600">Trusted Care Annually</p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 3. Departments */}
        <RevealSection id="departments" className="py-16 sm:py-20 border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-teal-700">Centers of Excellence</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Specialized medical departments
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Select any department to jump straight to booking with its specialist team.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOSPITAL_DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleBookFromDepartment(dept.id)}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 text-left transition-all duration-150 hover:border-teal-400 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-teal-600"
                >
                  <div>
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        dept.id === 'emergency'
                          ? 'bg-red-50 text-red-600 group-hover:bg-red-100'
                          : 'bg-teal-50 text-teal-700 group-hover:bg-teal-100'
                      }`}
                    >
                      <DepartmentIcon type={dept.iconKey} className="w-5 h-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                      {dept.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{dept.summary}</p>
                  </div>
                  <p className="mt-5 text-xs font-semibold text-teal-700 tabular-nums">
                    {dept.specialistsCount} · Book Visit
                  </p>
                </button>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 4. Our Doctors */}
        <RevealSection id="doctors" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700">Medical Faculty</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Meet our senior specialists
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Filter specialists by department"
                className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-200/60 p-1"
              >
                {[
                  { id: 'all', label: 'All' },
                  { id: 'cardiology', label: 'Cardiology' },
                  { id: 'neurology', label: 'Neurology' },
                  { id: 'orthopedics', label: 'Orthopedics' },
                  { id: 'pediatrics', label: 'Pediatrics' },
                  { id: 'gynecology', label: 'Gynecology' },
                ].map((tab) => {
                  const active = doctorFilterDept === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setDoctorFilterDept(tab.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleDoctors.map((doc) => (
                <article
                  key={doc.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <SafeImage
                      src={doc.image}
                      alt={`${doc.name}, ${doc.specialty}`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-xs font-semibold text-teal-700">
                        {doc.specialty} · {doc.experience}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-slate-900">
                        {doc.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600">{doc.qualifications}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBookDoctor(doc.id, doc.departmentId)}
                      className="mt-5 w-full rounded-xl border border-teal-600 bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white focus-visible:outline-2 focus-visible:outline-teal-600"
                    >
                      Book with {doc.name.split(' ').slice(0, 2).join(' ')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 5. Facilities */}
        <RevealSection id="facilities" className="py-16 sm:py-20 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-teal-700">Campus Infrastructure</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Clinical facilities built for rapid response
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOSPITAL_FACILITIES.map((fac) => (
                <div
                  key={fac.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  {fac.image ? (
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <SafeImage
                        src={fac.image}
                        alt={`${fac.name} at ${resolvedName}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50/70 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-xs border border-slate-200/80">
                        <FacilityIcon type={fac.iconKey} className="w-8 h-8" />
                      </div>
                      <span className="mt-3 text-xs font-semibold text-teal-800">
                        {fac.availability}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-slate-900">{fac.name}</h3>
                        <FacilityIcon type={fac.iconKey} className="w-4 h-4 text-teal-700 shrink-0" />
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{fac.summary}</p>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-slate-500">{fac.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 6. Interactive Appointment Booking */}
        <RevealSection id="appointments" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-teal-700">Centralized Desk</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Schedule an outpatient or specialist visit
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Select a department first to filter available consultants, pick your preferred
                  time slot, and submit your patient details.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">OPD Visiting Hours</p>
                      <p className="text-sm text-slate-600 tabular-nums">
                        Mon – Sat · 08:30 AM – 08:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Cashless Insurance</p>
                      <p className="text-sm text-slate-600">
                        Bring your policy card for rapid TPA verification at Gate 1.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form
                  onSubmit={handleBookingSubmit}
                  noValidate
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="hosp-dept"
                        className="block text-sm font-medium text-slate-800"
                      >
                        1. Department
                      </label>
                      <select
                        id="hosp-dept"
                        value={selectedDepartmentId}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      >
                        {HOSPITAL_DEPARTMENTS.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.departmentId ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.departmentId}</p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="hosp-doctor"
                        className="block text-sm font-medium text-slate-800"
                      >
                        2. Specialist Doctor
                      </label>
                      <select
                        id="hosp-doctor"
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      >
                        {bookingDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} ({doc.specialty})
                          </option>
                        ))}
                      </select>
                      {formErrors.doctorId ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.doctorId}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="hosp-date"
                        className="block text-sm font-medium text-slate-800"
                      >
                        3. Preferred Date
                      </label>
                      <input
                        id="hosp-date"
                        type="date"
                        min={todayIso}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                      {formErrors.date ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.date}</p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="hosp-patient-name"
                        className="block text-sm font-medium text-slate-800"
                      >
                        4. Patient Full Name
                      </label>
                      <input
                        id="hosp-patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Rohan Malhotra"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                      {formErrors.patientName ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.patientName}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="hosp-phone"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Phone Number
                      </label>
                      <input
                        id="hosp-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 555 889 4321"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                      {formErrors.phone ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.phone}</p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="hosp-notes"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Symptoms / Notes (optional)
                      </label>
                      <input
                        id="hosp-notes"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Brief reason for visit"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-slate-800">
                      5. Available Time Slots
                    </span>
                    <div
                      role="group"
                      aria-label="Hospital appointment time slots"
                      className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                    >
                      {TIME_SLOTS.map((slot) => {
                        const active = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setTimeSlot(slot)}
                            className={`rounded-xl border px-3 py-2.5 text-sm font-medium tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 ${
                              active
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400 hover:bg-white'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {formErrors.timeSlot ? (
                      <p className="mt-1 text-xs text-red-600">{formErrors.timeSlot}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Confirm Hospital Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 7. Testimonials & Health Tips / News */}
        <RevealSection className="py-16 sm:py-20 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
            <div>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-teal-700">Patient Outcomes</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Stories from families treated at {resolvedName}
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {HOSPITAL_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div>
                      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                        {Array.from({ length: item.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                        “{item.quote}”
                      </p>
                    </div>
                    <footer className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                      <SafeImage
                        src={item.avatar}
                        alt={item.patientName}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.patientName}</p>
                        <p className="text-xs text-slate-500">
                          {item.context} · {item.visitDate}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            <div>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-teal-700">Wellness & Updates</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Health tips and hospital news
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {HOSPITAL_HEALTH_TIPS.map((tip) => (
                  <article
                    key={tip.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <SafeImage
                        src={tip.image}
                        alt={tip.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {tip.category} · {tip.readTime}
                        </p>
                        <h3 className="mt-2 font-display text-lg font-bold text-slate-900 leading-snug">
                          {tip.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {tip.summary}
                        </p>
                      </div>
                      <p className="mt-4 text-xs text-slate-500">{tip.publishedAt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 8. Contact & Emergency Helpline */}
        <RevealSection id="contact" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div
              id="emergency-helpline"
              className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl border border-red-200 bg-red-50/70 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                  <ShieldAlert className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-700">24/7 Emergency & Trauma Bay</p>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Need immediate emergency or ambulance support?
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Direct cardiac & trauma dispatch with GPS-enabled ALS ambulances at Gate 2.
                  </p>
                </div>
              </div>

              <a
                href="tel:+15559112400"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-base font-bold text-white shadow-xs transition-colors hover:bg-red-700 whitespace-nowrap shrink-0 tabular-nums"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Helpline: +1 (555) 911-2400</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">Campus Directory</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {resolvedName} Main Campus
                  </h3>

                  <dl className="mt-6 space-y-5 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Address</dt>
                        <dd className="text-slate-600">
                          800 Sterling Healthcare Avenue, Medical District Center
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Appointments & Inquiry</dt>
                        <dd className="text-slate-600 tabular-nums">+1 (555) 480-2200</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Patient Desk Email</dt>
                        <dd className="text-slate-600">desk@hospital-demo.taraksterling.com</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Emergency & Inpatient</dt>
                        <dd className="text-slate-600">Open 24 Hours · 365 Days</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <SafeImage
                    src={HOSPITAL_IMAGES.locationMap}
                    alt={`Location map showing ${resolvedName} Main Campus`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      <div className="pb-14 sm:pb-0">
        <SiteFooter
          entityName={resolvedName}
          subtitle="Personalized multi-specialty hospital website preview with 24/7 emergency triage and department scheduling."
          links={NAV_LINKS}
        />
      </div>

      <BookingModal
        open={modalSummary !== null}
        summary={modalSummary}
        onClose={() => setModalSummary(null)}
      />
    </div>
  );
}
