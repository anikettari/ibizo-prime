export const apiKey = "AIzaSyALBqV8sdv5FKIA-ua1tYxotszIxmg-bUk";

export const buildYoutubeApiUrl = (searchQuery, CategoryId, order) => {
  const maxResults = 10;
  const videoCategoryIdParam = CategoryId
    ? `&videoCategoryId=${CategoryId}`
    : "";

  return `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
    searchQuery
  )}&key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}${videoCategoryIdParam}&order=${order}`;
};
