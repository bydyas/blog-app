export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  posts: IPost[];
}

export interface IComment {
  id: string;
  text: string;
  profile: IProfile;
  post: IPost;
  createdAt: Date;
}


export interface IPost {
  id: string;
  title: string;
  previewSrc: string;
  body: string;
  profile: IProfile;
  comments: IComment[];
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