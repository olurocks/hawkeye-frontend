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
    tweet: Tweet;
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
    isMobile?: boolean;
  }

export interface TweetListProps {
    tweets: ITweet[];
    isConnected: boolean;
    error: string | null;
  }

export interface TweetGridProps {
  tweets: ITweet[];
  isConnected: boolean;
  loading: boolean;
  error: string | null;
}

// utils/interfaces.ts

export interface IMedia {
  media_key: string;
  type: string;
  url?: string; // optional because not marked `required` in the schema
  preview_image_url?: string;
  alt_text?: string;
}

export interface ITweet {
  author_id: string;
  tweet_id: string;
  text: string;
  username?: string;
  media?: IMedia[]; // optional array of media objects
  hashtags?: string;
  created_at?: string;
  profile_image_url?: string;
  retweet_count?: number;
  like_count?: number;
  reply_count?: number;
  quote_count?: number;
  hasVideo?: boolean;
  newTweetsCount?: number;
}

export interface IEntities {
    urls?: {
        url: string;
        expanded_url: string;
        display_url: string;
    }[];
    hashtags?: {
        tag: string;
    }[];
    mentions?: {
        username: string;
    }[];
    expanded_url?: {
        expanded_url: string;
    }[];
}

export interface ComicIconButtonProps {
  icon: any;
  label: string;
  url: string;
  color?: string;
}

export interface ComicImageProps {
  imageSrc: string;
  label: string;
  url: string;
}

export interface GridContainerProps {
  tweets?: ITweet[];
  loading: boolean;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number };
    };
  };
  isMobile?: boolean;
}