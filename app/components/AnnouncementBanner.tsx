interface AnnouncementBannerProps {
  announcementReference: any;
}

export default function AnnouncementBanner({ announcementReference }: AnnouncementBannerProps) {
  return (
    <div className="bg-indigo-600 text-white py-2 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          <span {...(announcementReference?.$ ? announcementReference.$.title : {})} className="mx-4">{announcementReference.title}</span>
        </div>
        <div className="marquee-content">
          <span {...(announcementReference?.$ ? announcementReference.$.title : {})} className="mx-4">{announcementReference.title}</span>
        </div>
      </div>
    </div>
  );
}
