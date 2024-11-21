// === USER MODEL ===

export type User = {
  id: number;
  username: string;
  password: string;
  admin_key?: string;
  created_at: Date;
  updated_at: Date;
};

export type UserRequestDTO = {
  username: string;
  password?: string;
};

export type UserResponseDTO = {
  id: number;
  username: string;
};
