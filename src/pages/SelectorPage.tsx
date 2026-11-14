import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Check, ArrowRight, Stethoscope } from '../components/Icons';
import { SiteFooter, TarakSterlingLogo } from '../components/DemoChrome';
import { useDemoContext } from '../context/DemoContext';
import {
  buildDemoRoute,
  canProceedToDemo,
  getPlaceholderByType,
  type ProfileType,
} from '../utils/demoLogic';

export function SelectorPage() {
  const navigate = useNavigate();
  const { profileType, profileName, setDemoProfile } = useDemoContext();

  const [selectedType, setSelectedType] = useState<ProfileType | null>(profileType);
  const [nameInput, setNameInput] = useState<string>(profileName);

  const canGo = canProceedToDemo(selectedType, nameInput);
  const placeholder = getPlaceholderByType(selectedType);

  const handleSelectType = (type: ProfileType) => {
    if (selectedType && selectedType !== type && nameInput.trim() === profileName.trim()) {
      setNameInput('');
    }
    setSelectedType(type);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedType || !canGo) return;
    setDemoProfile(selectedType, nameInput);
    navigate(buildDemoRoute(selectedType, nameInput));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <TarakSterlingLogo className="h-10 w-auto" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
            Healthcare Web Preview
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 pb-16">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <h1 className="font-display text-[clamp(2.1rem,4.5vw,3.25rem)] font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              See Your Website Come to Life
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              Choose your profile type, enter your name, and preview your personalized website in
              seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div
              role="group"
              aria-label="Select healthcare profile type"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <button
                type="button"
                aria-pressed={selectedType === 'doctor'}
                onClick={() => handleSelectType('doctor')}
                className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                  selectedType === 'doctor'
                    ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      selectedType === 'doctor'
                        ? 'bg-teal-600 text-white'
                        : 'bg-teal-50 text-teal-700 group-hover:bg-teal-100'
                    }`}
                  >
                    <Stethoscope className="w-6 h-6" aria-hidden="true" />
                  </div>
                  {selectedType === 'doctor' ? (
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-white"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4" />
                    </span>
                  ) : null}
                </div>
                <span className="mt-5 font-display text-xl font-bold text-slate-900">Doctor</span>
                <span className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Personal clinic website with biography, services, patient reviews, and slot
                  booking.
                </span>
              </button>

              <button
                type="button"
                aria-pressed={selectedType === 'hospital'}
                onClick={() => handleSelectType('hospital')}
                className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                  selectedType === 'hospital'
                    ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      selectedType === 'hospital'
                        ? 'bg-teal-600 text-white'
                        : 'bg-sky-50 text-sky-700 group-hover:bg-sky-100'
                    }`}
                  >
                    <Building2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  {selectedType === 'hospital' ? (
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-white"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4" />
                    </span>
                  ) : null}
                </div>
                <span className="mt-5 font-display text-xl font-bold text-slate-900">Hospital</span>
                <span className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Multi-specialty hospital site with departments, specialist directory, facilities,
                  and 24/7 emergency triage.
                </span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <label
                htmlFor="demo-profile-name"
                className="block text-sm font-semibold text-slate-800"
              >
                {selectedType === 'hospital'
                  ? 'Hospital Name'
                  : selectedType === 'doctor'
                    ? 'Doctor Name'
                    : 'Your Name'}
              </label>
              <div className="mt-2.5 flex flex-col sm:flex-row gap-3">
                <input
                  id="demo-profile-name"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-600 focus:outline-2 focus:outline-teal-500/20"
                />
                <button
                  type="submit"
                  disabled={!canGo}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3 text-base font-semibold text-white transition-all duration-150 hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
                >
                  <span>Go</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2.5 text-xs text-slate-500">
                Your entered name customizes every heading, navigation bar, and booking confirmation
                in the preview.
              </p>
            </div>
          </form>
        </div>
      </main>

      <div className="pb-14 sm:pb-0">
        <SiteFooter subtitle="Interactive healthcare web experiences tailored for modern doctors and multi-specialty hospitals." />
      </div>
    </div>
  );
}
