export type UserRegistrationType = {
  full_name: string;
  email: string;
  date_of_birth: string;
  profile_picture?: string;
  phone_number: string;
  password: string;
  confirm_password?: string;
  is_verified?: boolean;
};

export type OTPType = {
  email: string;
  otp: string;
  createdAt: Date;
};
