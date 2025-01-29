export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  posts: IPost[];
}

export interface IPost {
  id: string;
  title: string;
  previewSrc: string;
  body: string;
  profile: IProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type SignIn = {
  username: string;
  password: string;
}

export type SignUp = {
  firstName: string;
  lastName: string;
} & SignIn;