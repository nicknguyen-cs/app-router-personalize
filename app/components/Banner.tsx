import "./Banner.css";

interface BannerProps {
  announcementText: string;
  bannerText: string;
  bannerDescription: string;
  data: any;
}

export default function Banner({
  announcementText,
  bannerText,
  bannerDescription,
  data,
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
          <a href="#" className="action-get-started">
            Get started
          </a>
          <a href="#" className="action-learn-more">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
