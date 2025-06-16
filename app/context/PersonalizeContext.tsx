// /components/context/PersonalizeContext.ts
import { createContext } from 'react';
import Personalize from '@contentstack/personalize-edge-sdk';
Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");
Personalize.init(process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string);
export const PersonalizeContext = createContext(Personalize);
