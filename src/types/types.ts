export interface Tweet{
    id: string;
    text: string;
    author_id: string;
    created_at: string;
    public_metrics?:{
        retweet_count: number;
        reply_count: number;
        like_count: number;
        quote_count: number
    },
    entities?:{
        urls?:{
            url: string;
            expanded_url:string;
            display_url: string;
        }[];
        hashtags?:{
            tag: string;
        }[];
        mentions?:{
            username: string
        }[];
        expanded_url?:{
            expanded_url:string
        }[]

    };
    
  }

export interface Media {
    media_key: string;
    type: string;
    url?: string;
    preview_image_url?: string;
  }

export interface TweetData {
    tweet: ITweet;
    media: Media[];
    users: User[];
  }

 export interface User {
    id: string;
    name: string;
    username: string;
    profile_image_url: string;
  }

  //remove undefined
export interface TweetCardProps {
    tweet: ITweet;
    themeColors: {
      background: string;
      surface: string;
      cardBackground: string;
      primary: string;
      secondary: string;
      accent: string;
      textPrimary: string;
      textSecondary: string;
  }

  }

export interface TweetListProps {
    tweets: TweetData[];
    isConnected: boolean;
    error: string | null;
  }

export interface TweetGridProps {
  tweets: ITweet[];
  isConnected: boolean;
  loading: boolean;
  error: string | null;
}

export interface ITweet {
  author_id: string;
  tweet_id: string;
  text: string;
  username?: string;
  media?: IMedia[]; // optional array of media objects
  hashtags?: string;
  created_at: string;
  profile_image_url?: string;
  retweet_count?: number;
  like_count?: number;
  reply_count?: number;
  quote_count?: number;
  hasVideo?: boolean;
}

export interface IMedia {
  media_key: string;
  type: string;
  urls?: string[]; // optional because not marked `required` in the schema
  preview_image_url?: string;
  alt_text?: string;
}