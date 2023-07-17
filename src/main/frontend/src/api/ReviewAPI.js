import axios from "axios";

const ReviewAPI = {
    // 리뷰 작성하기
    ReviewWrite: async(festivalId, reviewContent, memberId) => {
        const reviewInsert = {
            festivalId : festivalId,
            reviewContent : reviewContent,
            memberId : memberId
        }

        return await axios.post( `/auth/review/writereview`,reviewInsert);
    },
    GetReview: async(festivalId) => {
        return await axios.get(`/auth/review/getreview?festivalId=${festivalId}`);
    },
    GetReviewCount: async(festivalId) => {
        return await axios.get(`/auth/review/getreviewcount/festivalId=${festivalId}`);
    }


}
export default ReviewAPI;