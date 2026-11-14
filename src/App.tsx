/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { FloatingDemoControls } from './components/DemoChrome';
import { DemoProvider } from './context/DemoContext';
import { BRAND_ASSETS } from './data/mockHealthcareData';
import { DoctorPage } from './pages/DoctorPage';
import { HospitalPage } from './pages/HospitalPage';
import { SelectorPage } from './pages/SelectorPage';

function AppShell() {
  const location = useLocation();
  const isSubDemo = location.pathname === '/doctor' || location.pathname === '/hospital';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    let iconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.type = 'image/png';
    iconLink.href = BRAND_ASSETS.mark;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SelectorPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FloatingDemoControls showBack={isSubDemo} />
    </>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </DemoProvider>
  );
}
