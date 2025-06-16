
export interface ImageAsset {
  uid: string;
  _version: number;
  title: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  content_type: string;
  file_size: string;
  filename: string;
  ACL: Record<string, unknown>;
  parent_uid: string | null;
  is_dir: boolean;
  tags: string[];
  publish_details?: Record<string, unknown>; // or a specific type if known
  url: string;
}