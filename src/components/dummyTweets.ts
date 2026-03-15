export interface IMedia {
  media_key: string;
  type: string;
  preview_image_url?: string;
  url: string;
}

export interface ITweet {
  author_id: string;
  tweet_id: string;
  text: string;
  username?: string;
  media?: IMedia[];
  hashtags?: string;
  created_at: string;
  profile_image_url?: string;
  retweet_count?: number;
  like_count?: number;
  reply_count?: number;
  quote_count?: number;
  hasVideo?: boolean;
}

export const dummyTweets: ITweet[] = [
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet… https://t.co/56a0vZUx7i",
    username: "XDevelopers",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet… https://t.co/56a0vZUx7i",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet… https://t.co/56a0vZUx7i",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com ",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [
      {
        media_key: "string",
        type: "photo",
        preview_image_url: "string",
        url: "https://pbs.twimg.com/media/GmMxFlIbEAAPTRv?format=jpg&name=medium",
      },
    ],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com ",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [
      {
        media_key: "string",
        type: "photo",
        preview_image_url: "string",
        url: "https://pbs.twimg.com/media/GmMxFlIbEAAPTRv?format=jpg&name=medium",
      },
    ],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com ",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [
      {
        media_key: "string",
        type: "photo",
        preview_image_url: "string",
        url: "https://pbs.twimg.com/media/GmMxFlIbEAAPTRv?format=jpg&name=medium",
      },
    ],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com ",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [
      {
        media_key: "string",
        type: "photo",
        preview_image_url: "string",
        url: "https://pbs.twimg.com/media/GmMxFlIbEAAPTRv?format=jpg&name=medium",
      },
    ],
  },
  {
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet https://randomuser.me/api/portraits/men/5.com ",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [
      {
        media_key: "string",
        type: "photo",
        preview_image_url: "string",
        url: "https://pbs.twimg.com/media/GmMxFlIbEAAPTRv?format=jpg&name=medium",
      },
    ],
  },
  // The rest are tweets without media
  ...Array(13).fill(null).map(() => ({
    tweet_id: "1346889436626259968",
    author_id: "2244994945",
    text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the X API v2 to explore Tweet… https://t.co/56a0vZUx7i",
    username: "TwitterDev",
    created_at: "Wed Jan 06 18:40:40 +0000 2021",
    profile_image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    retweet_count: 5,
    reply_count: 5,
    like_count: 5,
    quote_count: 5,
    media: [],
  })),
];
