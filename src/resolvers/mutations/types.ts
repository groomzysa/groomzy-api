export interface ISendMailArgs {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

export interface IEditProfileArgs {
  fullName?: string;
  streetNumber?: string;
  streetName?: string;
  suburbName?: string;
  cityName?: string;
  provinceName?: string;
  areaCode?: string;
  latitude?: number;
  longitude?: number;
  profileImage?: File;
}

export interface IRequestResetPasswordArgs {
  email: string;
  isProvider: boolean;
}

export interface IResetPasswordArgs {
  oneTimePin: string;
  password: string;
  isProvider: boolean;
}
