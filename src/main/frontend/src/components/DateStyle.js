export const formatDate = (WrittenTime) => {
  return new Date(WrittenTime).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
export const formatDateForFestival = (WrittenTime) => {
  return new Date(WrittenTime).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: true,
  });
};
