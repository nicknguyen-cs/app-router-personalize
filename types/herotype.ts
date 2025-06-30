export interface Hero {
  hero_title: string;
  hero_description: string;
  event: HeroEvent[];
  event_uid: string;
  _metadata?: {
    uid: string;
    $?: Record<string, unknown>;
  };
  $?: {
    hero_title?: Record<string, unknown>;
    hero_description?: Record<string, unknown>;
    event?: Record<string, unknown>;
    event__0?: Record<string, unknown>;
    event__parent?: Record<string, unknown>;
    _metadata?: Record<string, unknown>;
  };
}

interface HeroEvent {
  link: {
    title: string;
    href: string;
    $?: {
      title?: Record<string, unknown>;
      href?: Record<string, unknown>;
    };
  };
  event: string;
  _metadata?: {
    uid: string;
    $?: Record<string, unknown>;
  };
  $?: {
    link?: Record<string, unknown>;
    event?: Record<string, unknown>;
    _metadata?: Record<string, unknown>;
  };
}
