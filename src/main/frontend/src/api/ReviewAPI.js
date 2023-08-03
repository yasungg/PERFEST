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
              });
    },
    // 해당 축제 리뷰 가져오기
    GetReview: async(festivalId, pageNumber) => {
        return await axios.get(`/auth/review/getreview?festivalId=${festivalId}&pageSize=5&pageNumber=${pageNumber}`);
    },
    // 해당 축제 리뷰 개수 가져오기
    GetReviewCount: async(festivalId) => {
        return await axios.get(`/auth/review/getreviewcount?festivalId=${festivalId}`);
    }


}
export default ReviewAPI;