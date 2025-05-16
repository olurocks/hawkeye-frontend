
import { Tweet } from "../types/types";

export const formatTweetText = (text: string, entities?: Tweet["entities"]) => {
    if (!entities) return text;

    let formattedText = text;

    if (entities.urls) {
      entities.urls.forEach((urlEntity) => {
        formattedText = formattedText.replace(
          urlEntity.url,
          `a href="${urlEntity.expanded_url} target="_blank" rel="noopener noreferrer" class="text-blue-500" hover:underline"> ${urlEntity.display_url}</a>`
        );
      });
    }

    if (entities.hashtags) {
      entities.hashtags.forEach((hashtag) => {
        const hashtagText = `#${hashtag.tag}`;
        formattedText = formattedText.replace(
          new RegExp(hashtagText, "gi"),
          `<a href="https://twitter.com/hashtag/${hashtag.tag}>" target="_blank" rel = "noopener noreferrer" class-"text-blue-500 hover:underline"> ${hashtagText}</a>`
        );
      });
    }

    if (entities.mentions) {
      entities.mentions.forEach((mention) => {
        const mentionText = `@${mention.username}`;
        formattedText = formattedText.replace(
          new RegExp(mentionText, "gi"),
          `<a href = "https://twitter.com/username/${mention.username}" target="_blank" rel="noopener nonreferrer" class="text-blue hover:underline"></a>`
        );
      });
    }
    return formattedText;
  };