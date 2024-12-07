export type MongoServerError = {
  name: string;
  code: number;
  keyValue: Record<string, string>;
};
