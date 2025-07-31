# App Router Personalize

This repository is a Next.js application that integrates with Contentstack's Personalize SDK to deliver personalized content to users. It includes server-side and client-side rendering, modular content blocks, impression tracking, and event handling.

---

## Features

- **Personalization**: Uses the Contentstack Personalize SDK for personalized experiences.
- **Impression Tracking & Event Conversion**: Tracks impressions using both SDK-based and REST-based approaches.
- **Lytics Integration**: Includes Lytics tracking for analytics.

---

## Folder Structure

```
app-router-personalize/
├── app/
│   ├── [slug]/page.tsx       # Dynamic page rendering based on slug
│   ├── page.tsx              # Main page rendering logic
│   ├── layout.tsx            # Root layout with global components
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Header component
│   │   ├── Banner.tsx        # Banner component
│   │   ├── Hero.tsx          # Hero block component
│   │   ├── Features.tsx      # Features block component
│   │   ├── personalize/      # Personalization-related components
│   │   │   ├── ImpressionTriggerSDK.tsx  # SDK-based impression tracking
│   │   │   ├── ImpressionTriggerREST.tsx # REST-based impression tracking
│   │   │   ├── EventTriggerSDK.tsx       # SDK-based event handling
│   │   │   ├── EventTriggerREST.tsx      # REST-based event handling
│   ├── sdk/                  # SDK utilities
│   │   ├── ContentstackSDK.tsx # Contentstack SDK integration
│   │   ├── LyticsTracker.tsx  # Lytics tracking integration
│   │   ├── PersonalizeSDK.tsx # Personalize SDK initialization
│   │   ├── LivePreviewSDK.tsx # Live preview integration
│   ├── utils/                # Utility functions
│       ├── PersonalizeUtils.tsx # Utility functions for Personalize SDK
├── .env                      # Environment variables
├── README.md                 # Project documentation
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/app-router-personalize.git
cd app-router-personalize
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
NEXT_PUBLIC_CS_API_KEY=
NEXT_PUBLIC_BRANCH=
NEXT_PUBLIC_CS_DELIVERY_TOKEN=
NEXT_PUBLIC_CS_ENVIRONMENT=
NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN=
NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=
NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com
NEXT_PUBLIC_REST_PREVIEW_URL=rest-preview.contentstack.com
NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS=false
NEXT_PUBLIC_LIVE_PREVIEW=true
NEXT_PUBLIC_USE_SDK=true
NEXT_PUBLIC_USE_SPOOFED_IP=false
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## Key Components

### `page.tsx`
- Fetches data using `getEntryByUrl` from the Contentstack SDK.
- Handles personalization logic using the Personalize SDK.
- Tracks impressions using `ImpressionTrackerREST`.

### `[slug]/page.tsx`
- Similar to `page.tsx`, but dynamically renders content based on the URL slug.
- Supports impression tracking.

### `ImpressionTriggerSDK.tsx` and `ImpressionTriggerREST.tsx`
- Tracks impressions using the Personalize SDK or REST API.

### `EventTriggerSDK.tsx` and `EventTriggerREST.tsx`
- Triggers events using the Personalize SDK or REST API.

### `ContentstackSDK.tsx`
- Initializes the Contentstack SDK and handles fetching entries, adding visual builder data, an optional personalization if variants exist.

### `LyticsTracker.tsx`
- Integrates Lytics tracking for analytics. Change this to your own tag in your project.

---

## Personalization Logic

### Variant Parameter Handling
- The `variantParam` is extracted from the query string and processed to determine the `experienceUid` and `variantId`.
- Example: `"6_null,8_0"` → Filters out `"null"` and extracts `"8_0"`.

### Impression Tracking
- **SDK-Based**: Uses `ImpressionTriggerSDK` for tracking impressions via the Personalize SDK.
- **REST-Based**: Uses `ImpressionTriggerREST` for tracking impressions via REST API.

### Event Handling
- **SDK-Based**: Uses `EventTriggerSDK` for triggering events via the Personalize SDK.
- **REST-Based**: Uses `EventTriggerREST` for triggering events via REST API.


---

## Environment Variables

| Variable                          | Description                                      |
|-----------------------------------|--------------------------------------------------|
| `NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID` | Personalize project UID for Contentstack.       |
| `NEXT_PUBLIC_CS_API_KEY`          | Contentstack API key.                           |
| `NEXT_PUBLIC_CS_DELIVERY_TOKEN`   | Contentstack delivery token.                    |
| `NEXT_PUBLIC_CS_ENVIRONMENT`      | Contentstack environment.                       |
| `NEXT_PUBLIC_CS_BRANCH`           | Contentstack branch (default: `main`).          |
| `NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL` | Personalize Edge API URL.                      |
| `NEXT_PUBLIC_USE_SDK`             | Determines whether to use SDK-based tracking (`true`) or REST-based tracking (`false`). |
| `NEXT_PUBLIC_LIVE_PREVIEW` | Enables Live Preview/Visual Builder (`true` or `false`). |
| `NEXT_PUBLIC_PPERSONALIZE_RANDOM_UIDS` | Enables random UID generation for testing impressions (`true` or `false`). |
| `NEXT_PUBLIC_USE_SPOOFED_IP` | Enables spoofing IP address based on ipConfig (`true` or `false`). |

---



## License

This project is licensed under the MIT License. See the LICENSE file for details.