export type LoginAccount = {
  email: string;
  password: string;
};

export function getDemoAccount(): LoginAccount {
  return {
    email: process.env.QA_PRACTICE_EMAIL ?? "admin@admin.com",
    password: process.env.QA_PRACTICE_PASSWORD ?? "admin123"
  };
}
