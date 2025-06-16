// types/FeaturesBlock.ts

import { ImageAsset } from "./types";

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturesBlock {
  title: string;
  image: ImageAsset;
  features: FeatureItem [];
  _metadata: {
    uid: string;
  };
}
