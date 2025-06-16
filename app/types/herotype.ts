export interface HeroType {
  title: string;
  subtitle: string;
  cta: Cta;
  image: Image;
  _metadata: Metadata;
}

export interface Metadata {
  uid: string;
}

export interface Cta {
  title: string;
  href: string;
}

export interface Image {
  uid: string;
  _version: number;
  title: string;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  content_type: string;
  file_size: string;
  filename: string;
  ACL: ACL;
  parent_uid: null;
  is_dir: boolean;
  tags: any[];
  publish_details: ACL[];
  url: string;
}

export interface ACL {
  read: string[];
  write: string[];
  delete: string[];
  create: string[];
  update: string[];
  manage: string[];
  admin: string[];
}
