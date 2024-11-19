export type User = {
  id: number;
  username: string;
  password: string;
  admin_key?: string;
  created_at: Date;
  updated_at: Date;
};
