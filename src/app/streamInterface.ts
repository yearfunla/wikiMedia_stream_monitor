export interface StreamInt {
  id: number;
  meta:meta;
  type: string;
  namespace: number;
  title: string;
  title_url: string;
  comment: string;
  timestamp: number;
  user: string;
  bot: boolean;
  notify_url: string;
  minor:boolean;
  patrolled: boolean;
  length:trackInterface;
  revision: trackInterface;
  server_url: string;
  server_name: string;
  server_script_path: string;
  wiki: string;
  parsedcomment: string;
  viewed:boolean|null;
}

export interface trackInterface {
  old: number;
  new: number
}

export interface meta {
  uri: string;
  request_id: string;
  id: string;
  dt: string;
  domain: string;
  stream: string;
  topic: string;
  partition: number,
  offset: number
}