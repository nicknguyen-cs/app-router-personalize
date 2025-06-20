"use client";
import "./Banner.css";
import { EventTriggerREST } from "./csr/EventTrigger";
interface BannerProps {
  announcementText: string;
  bannerText: string;
  bannerDescription: string;
  data: any;
  eventGroup: string
}

export default function Banner({
  announcementText,
  bannerText,
  bannerDescription,
  data,
  eventGroup
}: BannerProps) {
  return (
    <main className="banner-main">
      <div className="banner-container ">
        <div className="banner-announcement">
          <div
            className="announcement-text"
            {...(data?.$ ? data.$.announcement_text : {})}
          >
            {announcementText}
            <a href="#" className="announcement-link">
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="banner-title" {...(data?.$ ? data.$.banner_text : {})}>
          {bannerText}
        </h1>
        <p
          className="banner-description"
          {...(data?.$ ? data.$.banner_description : {})}
        >
          {bannerDescription}
        </p>
        <div className="banner-actions">
          <EventTriggerREST eventUID={eventGroup} buttonTitle="Conversion" />
          <a href="#" className="action-learn-more">
            Placeholder <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
