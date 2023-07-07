export const formatDate= (commentWrittenTime)=> {
    return new Date(commentWrittenTime).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }