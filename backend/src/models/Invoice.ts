export type Invoice = {
  id: number;
  payment_request: string;
  value: number;
  memo?: string;
  fees?: number;
  send: boolean;
  settled: boolean;
  settle_date?: Date;
  created_at: Date;
  user_id: number;
};
