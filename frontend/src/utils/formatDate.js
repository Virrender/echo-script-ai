export function formatRecordingDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  if(
    date.getDate() === today.getDate()&&
    date.getMonth() === today.getMonth()&&
    date.getFullYear() === today.getFullYear()
  ){
    return "Today";
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US",{
    month:"short",
    day:"numeric"
  });

}
