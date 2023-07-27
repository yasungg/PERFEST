import axios from "axios";

const ReviewAPI = {
    // 리뷰 작성하기
    ReviewWrite: async(festivalId, reviewContent) => {
        const reviewInsert = {
            festivalId : festivalId,
            reviewContent : reviewContent
        };
        const Authorization =
        "Bearer " + window.localStorage.getItem("accessToken");
        console.log(Authorization);
        return await axios.post(`/review/writereview`,reviewInsert, {
            headers: {
              "Content-Type": "application/json",
              Authorization: Authorization,
            }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
          })
              .then((response) => {
                if (response.status === 200) {
                  return response;
                }
              })
              .catch((error) => {
                console.log(error);
              });
    },
    GetReview: async(festivalId) => {
        return await axios.get(`/auth/review/getreview?festivalId=${festivalId}`);
    },
    GetReviewCount: async(festivalId) => {
        return await axios.get(`/auth/review/getreviewcount/festivalId=${festivalId}`);
    }


}
export default ReviewAPI;