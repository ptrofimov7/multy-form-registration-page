export function formatTimeFromSeconds(seconds: number) {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   return `${minutes < 10 ? `0${minutes}` : minutes} мин ${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds} сек`;
}