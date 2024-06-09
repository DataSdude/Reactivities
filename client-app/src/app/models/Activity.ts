import { Profile } from "./Profile";

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
}

export class Activity implements IActivity {
  constructor(init: ActivityFormValues) {
    this.id = init.id!;
    this.title = init.title;
    this.description = init.description;
    this.category = init.category;
    this.date = init.date;
    this.city = init.city;
    this.venue = init.venue;
  }
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  hostUsername: string = "";
  isCancelled: boolean = false;
  isGoing: boolean = false;
  isHost: boolean = false;
  host?: Profile | undefined;
  attendees: Profile[] = [];
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.venue = activity.venue;
      this.city = activity.city;
    }
  }
}
