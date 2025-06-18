'use client';

import { useEffect } from 'react';
import { usePersonalize } from '../context/PersonalizeContext';

export default function ImpressionTracker({variant}: { variant: any }) {
  const personalize = usePersonalize();

  useEffect(() => {
    if (personalize) {
        console.log("setting: " , variant)
      personalize.triggerImpression(variant); // id might be something like 'homepage_banner'
    }
  }, [personalize, variant]);

  return null; // this component only exists to track the impression
}
