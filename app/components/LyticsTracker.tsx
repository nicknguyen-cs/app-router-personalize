'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    jstag: any;
  }
}

export default function LyticsTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Avoid loading multiple times
    if (window.jstag) {
      window.jstag.pageView?.();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://c.lytics.io/api/tag/${process.env.NEXT_PUBLIC_LYTICS_TAG}/latest.min.js`;
    script.async = true;
    script.onload = () => {
      window.jstag.init({
        src: `https://c.lytics.io/api/tag/${process.env.NEXT_PUBLIC_LYTICS_TAG}/latest.min.js`,
        pageAnalysis: {
          dataLayerPull: { disabled: true },
        },
        contentStack: {
          entityPush: {
            disabled: false,
            personalizeProjectId: process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZATION,
          },
        },
      });

      window.jstag.pageView?.();
      window.jstag.loadEntity?.();
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
