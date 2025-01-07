
# app-router-personalize

  This project requires a Contentstack Stack with content type  `page` and using the Personalize tool with a custom attribute called `homeowners`. 
The main purpose of this project is to show the innerworkings of how Personalize is set up using NextJS App Router.
The main files to be looking at are 
`app/page.tsx`
`app/attribute.tsx`
`app/homeowner/page.tsx`
`/middleware.tsx`

## Getting Started

 Create a .env file
 ```bash

NEXT_PUBLIC_CS_API_KEY=
NEXT_PUBLIC_CS_DELIVERY_TOKEN=
NEXT_PUBLIC_CS_ENVIRONMENT=
NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN=
NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=
NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL=
```
Run the following
```bash
npm install
npm run dev
```