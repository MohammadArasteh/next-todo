export type SignUpPayload = {
  username: string;
  email: string;
  password: string;
};

export type SignInPayload = Omit<SignUpPayload, "username">;
