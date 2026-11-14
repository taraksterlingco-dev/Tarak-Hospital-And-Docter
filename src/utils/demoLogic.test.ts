import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDemoRoute,
  canProceedToDemo,
  extractProfileName,
  filterDoctorsByDepartment,
  formatDoctorPossessive,
  getPlaceholderByType,
  validateAppointmentForm,
  type DoctorProfile,
} from './demoLogic';

test('getPlaceholderByType returns exact expected placeholder strings', () => {
  assert.equal(getPlaceholderByType('doctor'), 'Enter Doctor Name (e.g. Dr. Rahul Sharma)');
  assert.equal(getPlaceholderByType('hospital'), 'Enter Hospital Name (e.g. City Care Hospital)');
  assert.equal(getPlaceholderByType(null), 'Select Doctor or Hospital above, then enter your name');
});

test('canProceedToDemo requires both type and non-whitespace name', () => {
  assert.equal(canProceedToDemo(null, 'Dr. Rahul Sharma'), false);
  assert.equal(canProceedToDemo('doctor', ''), false);
  assert.equal(canProceedToDemo('doctor', '   '), false);
  assert.equal(canProceedToDemo('doctor', 'Dr. Rahul Sharma'), true);
  assert.equal(canProceedToDemo('hospital', 'City Care Hospital'), true);
});

test('buildDemoRoute and extractProfileName round-trip cleanly', () => {
  const url = buildDemoRoute('doctor', '  Dr. Rahul Sharma  ');
  assert.equal(url, '/doctor?name=Dr.+Rahul+Sharma');
  const query = url.slice(url.indexOf('?'));
  assert.equal(extractProfileName(query, null), 'Dr. Rahul Sharma');
  assert.equal(extractProfileName('', null), null);
  assert.equal(extractProfileName('?name=   ', ''), null);
  assert.equal(extractProfileName('', 'City Care Hospital'), 'City Care Hospital');
});

test('formatDoctorPossessive handles trailing s properly', () => {
  assert.equal(formatDoctorPossessive('Dr. Rahul Sharma'), "Dr. Rahul Sharma's");
  assert.equal(formatDoctorPossessive('Dr. Thomas'), "Dr. Thomas'");
});

test('filterDoctorsByDepartment filters matching specialists and falls back gracefully', () => {
  const doctors: DoctorProfile[] = [
    {
      id: '1',
      name: 'Dr. Reed',
      specialty: 'Cardiology',
      departmentId: 'cardiology',
      experience: '14 yrs',
      qualifications: 'MD',
      image: '',
    },
    {
      id: '2',
      name: 'Dr. Alistair',
      specialty: 'Neurology',
      departmentId: 'neurology',
      experience: '18 yrs',
      qualifications: 'MD',
      image: '',
    },
  ];
  assert.equal(filterDoctorsByDepartment(doctors, 'cardiology').length, 1);
  assert.equal(filterDoctorsByDepartment(doctors, 'cardiology')[0].id, '1');
  assert.equal(filterDoctorsByDepartment(doctors, 'all').length, 2);
});

test('validateAppointmentForm rejects invalid inputs and accepts valid inputs', () => {
  const invalid = validateAppointmentForm(
    { patientName: '', phone: '123', date: '', timeSlot: '' },
    { requireDepartment: true, requireDoctor: true }
  );
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.patientName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.timeSlot);
  assert.ok(invalid.errors.departmentId);
  assert.ok(invalid.errors.doctorId);

  const valid = validateAppointmentForm(
    {
      patientName: 'Ananya Verma',
      phone: '+1 (555) 234-9876',
      date: '2026-11-20',
      timeSlot: '10:30 AM',
      departmentId: 'cardiology',
      doctorId: 'doc-cardio',
    },
    { requireDepartment: true, requireDoctor: true }
  );
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
