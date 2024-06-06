import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export class ProfileFormValues {
  username?: string = undefined;
  displayName: string | undefined;
  bio: string = "";

  constructor(profile?: ProfileFormValues) {
    if (profile) {
      this.displayName = profile.displayName;
      this.bio = profile.bio;
    }
  }
}
