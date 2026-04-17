'use client';

import { useEffect } from 'react';

export function ScrollRestorationHandler() {
  useEffect(() => {
    // Immediately lock scroll to prevent any scrolling on load
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Re-enable scroll after React hydration completes
    const timeout = setTimeout(() => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
