export const apiKey = "AIzaSyCYIOC-uGxb1QuSJsx3ZwFQGxfSaIy2hH4";

export const buildYoutubeApiUrl = (searchQuery, CategoryId, order) => {
  const maxResults = 10;
  const videoCategoryIdParam = CategoryId
    ? `&videoCategoryId=${CategoryId}`
    : "";

  return `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
    searchQuery
  )}&key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}${videoCategoryIdParam}&order=${order}`;
};
