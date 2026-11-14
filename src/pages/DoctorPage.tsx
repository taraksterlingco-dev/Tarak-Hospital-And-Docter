import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BookingModal, type BookingSummary } from '../components/BookingModal';
import { SiteFooter } from '../components/DemoChrome';
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  ServiceIcon,
  Star,
  X,
} from '../components/Icons';
import { RevealSection } from '../components/RevealSection';
import { SafeImage } from '../components/SafeImage';
import { useDemoContext } from '../context/DemoContext';
import {
  DOCTOR_FAQS,
  DOCTOR_IMAGES,
  DOCTOR_REVIEWS,
  DOCTOR_SERVICES,
  TIME_SLOTS,
} from '../data/mockHealthcareData';
import {
  extractProfileName,
  formatDoctorPossessive,
  validateAppointmentForm,
} from '../utils/demoLogic';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Appointments', href: '#appointments' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function DoctorPage() {
  const location = useLocation();
  const { profileType, profileName } = useDemoContext();

  const resolvedName = extractProfileName(
    location.search,
    profileType === 'doctor' ? profileName : null
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Appointment booking state
  const todayIso = new Date().toISOString().split('T')[0];
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayIso);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState('General Consultation');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [modalSummary, setModalSummary] = useState<BookingSummary | null>(null);

  // Reviews carousel state
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string>(DOCTOR_FAQS[0].id);

  if (!resolvedName) {
    return <Navigate to="/" replace />;
  }

  const possessiveName = formatDoctorPossessive(resolvedName);
  const activeReview = DOCTOR_REVIEWS[activeReviewIdx];

  const handleSelectService = (serviceTitle: string) => {
    setReason(serviceTitle);
    const el = document.getElementById('appointments');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateAppointmentForm({
      patientName,
      phone,
      date,
      timeSlot,
      reason,
    });
    setFormErrors(result.errors);
    if (!result.valid) return;

    setModalSummary({
      title: 'Appointment request sent!',
      subtitle: `Thank you, ${patientName.trim()}. ${resolvedName}'s clinic coordinator will confirm your visit shortly via SMS and call.`,
      details: [
        { label: 'Consulting Physician', value: resolvedName },
        { label: 'Patient Name', value: patientName.trim() },
        { label: 'Phone', value: phone.trim() },
        { label: 'Preferred Date', value: date },
        { label: 'Time Slot', value: timeSlot },
        { label: 'Visit Reason', value: reason || 'General Consultation' },
      ],
    });
    setPatientName('');
    setPhone('');
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? DOCTOR_REVIEWS.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev === DOCTOR_REVIEWS.length - 1 ? 0 : prev + 1));
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

          <nav aria-label="Doctor clinic navigation" className="hidden lg:flex items-center gap-6">
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
              href="#appointments"
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
            >
              Book Appointment
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
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
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
                href="#appointments"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Book Appointment
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
              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="text-sm font-semibold text-teal-700">
                  Internal Medicine · Preventive Care · Diagnostics
                </p>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,4.2vw,3.4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
                  Welcome to {possessiveName} Clinic
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Thoughtful, evidence-based clinical consultations with minimal wait times, clear
                  diagnostic explanations, and continuous follow-up care for you and your family.
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
                    href="tel:+15552348900"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm sm:text-base font-semibold text-slate-800 transition-colors hover:border-teal-600 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="h-full min-h-[340px] max-h-[460px] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
                  <SafeImage
                    src={DOCTOR_IMAGES.lead}
                    alt={`Portrait of ${resolvedName} inside the medical clinic`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Full-width Hero Stats Row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="p-6">
                <p className="font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                  10+ Years
                </p>
                <p className="mt-1 text-sm text-slate-600">Clinical Experience & Diagnostics</p>
              </div>
              <div className="p-6">
                <p className="font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                  5,000+
                </p>
                <p className="mt-1 text-sm text-slate-600">Patients Treated Safely</p>
              </div>
              <div className="p-6">
                <p className="font-display text-3xl font-extrabold text-teal-700 tabular-nums">
                  4.9 / 5
                </p>
                <p className="mt-1 text-sm text-slate-600">Verified Patient Rating</p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 3. About the Doctor */}
        <RevealSection id="about" className="py-16 sm:py-20 border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6">
                <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100">
                  <SafeImage
                    src={DOCTOR_IMAGES.clinicInterior}
                    alt={`Modern sunlit reception and consultation room at ${possessiveName} Clinic`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-sm font-semibold text-teal-700">About the Physician</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Dedicated to unhurried, attentive medical care
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {resolvedName} founded this practice with a clear promise: every patient deserves
                  time to be heard, a transparent diagnosis, and an evidence-backed recovery plan
                  that fits real daily life.
                </p>

                <dl className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">Qualifications</dt>
                    <dd className="mt-1 text-sm sm:text-base font-medium text-slate-900">
                      MBBS, MD (Internal Medicine) · Fellowship in Preventive Health & Chronic Care
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">Core Specializations</dt>
                    <dd className="mt-1 text-sm sm:text-base font-medium text-slate-900">
                      Hypertension & Metabolic Care · Preventive Screenings · Acute Infections ·
                      Geriatric Wellness
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 4. Services */}
        <RevealSection id="services" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-teal-700">Clinical Services</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Comprehensive care under one roof
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Select any service below to reserve a consultation slot directly.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DOCTOR_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-150 hover:border-teal-300 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <ServiceIcon type={service.iconKey} className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-slate-500 tabular-nums">
                        {service.duration}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectService(service.title)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-teal-600 self-start"
                  >
                    <span>Book {service.title}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 5. Interactive Appointment Booking */}
        <RevealSection id="appointments" className="py-16 sm:py-20 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-teal-700">Online Scheduling</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Book your visit with {resolvedName}
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Choose a convenient date and time slot. Our clinic reception confirms all online
                  bookings within 15 minutes during working hours.
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Clinic Consultation Hours</p>
                      <p className="text-sm text-slate-600 tabular-nums">
                        Monday – Saturday · 09:00 AM to 07:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Direct Front Desk</p>
                      <p className="text-sm text-slate-600 tabular-nums">+1 (555) 234-8900</p>
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
                        htmlFor="doc-patient-name"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Patient Name
                      </label>
                      <input
                        id="doc-patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Ananya Verma"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                      {formErrors.patientName ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.patientName}</p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="doc-patient-phone"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Phone Number
                      </label>
                      <input
                        id="doc-patient-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 555 234 9876"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      />
                      {formErrors.phone ? (
                        <p className="mt-1 text-xs text-red-600">{formErrors.phone}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="doc-visit-date"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="doc-visit-date"
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
                        htmlFor="doc-visit-reason"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Reason for Visit
                      </label>
                      <select
                        id="doc-visit-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                      >
                        {DOCTOR_SERVICES.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-slate-800">
                      Select Time Slot
                    </span>
                    <div
                      role="group"
                      aria-label="Available appointment time slots"
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
                    Confirm Appointment Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 6. Patient Reviews Carousel */}
        <RevealSection id="reviews" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700">Patient Stories</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Trusted by families across the community
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  aria-label="Previous patient review"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-teal-500 hover:text-teal-700"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <span className="px-2 text-xs font-medium text-slate-500 tabular-nums">
                  {activeReviewIdx + 1} / {DOCTOR_REVIEWS.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextReview}
                  aria-label="Next patient review"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-teal-500 hover:text-teal-700"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-1 text-amber-500" aria-label={`${activeReview.rating} out of 5 stars`}>
                {Array.from({ length: activeReview.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-5 font-display text-lg sm:text-2xl font-semibold text-slate-900 leading-snug">
                “{activeReview.quote}”
              </blockquote>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3.5">
                  <SafeImage
                    src={activeReview.avatar}
                    alt={`${activeReview.patientName} portrait`}
                    className="h-12 w-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="font-display text-base font-bold text-slate-900">
                      {activeReview.patientName}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {activeReview.context} · {activeReview.visitDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
                  {DOCTOR_REVIEWS.map((rev, idx) => (
                    <button
                      key={rev.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeReviewIdx}
                      aria-label={`View review by ${rev.patientName}`}
                      onClick={() => setActiveReviewIdx(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === activeReviewIdx ? 'w-7 bg-teal-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 7. FAQ Accordion */}
        <RevealSection className="py-16 sm:py-20 border-t border-slate-200/70">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-teal-700">Common Questions</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Frequently asked patient questions
              </h2>
            </div>

            <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {DOCTOR_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-2 focus-visible:outline-teal-600"
                    >
                      <span className="font-display text-base font-semibold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-teal-700' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen ? (
                      <div className="px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        {/* 8. Contact */}
        <RevealSection id="contact" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">Visit Us</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {possessiveName} Clinic Location
                  </h2>

                  <dl className="mt-6 space-y-5 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Address</dt>
                        <dd className="text-slate-600">
                          420 Meridian Medical Plaza, Suite 302, Central Park District
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Phone</dt>
                        <dd className="text-slate-600 tabular-nums">+1 (555) 234-8900</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Email</dt>
                        <dd className="text-slate-600">care@clinic-demo.taraksterling.com</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-slate-900">Working Hours</dt>
                        <dd className="text-slate-600 tabular-nums">
                          Mon – Sat: 09:00 AM – 07:00 PM · Sunday: Closed
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <SafeImage
                    src={DOCTOR_IMAGES.locationMap}
                    alt={`Location map showing ${possessiveName} Clinic in the Medical District`}
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
          entityName={`${possessiveName} Clinic`}
          subtitle="Personalized clinic website preview featuring patient-first scheduling and transparent clinical care."
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
