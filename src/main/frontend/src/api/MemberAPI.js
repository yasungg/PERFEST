import axios from "axios";



const MemberAPI = {

    // 이메일로 특정회원 조회
    getMemberInfo: async(email) => {
        return await axios.get(`/auth/member/email?email=${email}`);
    },

    // 회원 닉네임 수정
    updateNickName: async(email, nickname) => {
        const updateData = {
            username: email,
            nickname: nickname
        };
        return await axios.post("/auth/member/nickname", updateData);
    },

    // 닉네임 수정 중복값 체크
    nickNameRegCheck: async(nicknameCheck) => {
        return await axios.get(`/auth/member/nicknameCheck?nickname=${nicknameCheck}`);
    },

    // 회원 탈퇴
    deleteMem: async(email) => {
        const deleteMem = {
            username: email
        };
        return await axios.post("/auth/member/del", deleteMem);
    },

    // 주소 수정
    updateAdd: async(email, address) => {
        const updateData = {
            username: email,
            address: address
        };
        return await axios.post("/auth/member/updateAdd", updateData);
    },

    // 주소 수정 중복값 체크 (중복시 errorMsg)
    addRegCheck: async(email, address) => {
        return await axios.get(`/auth/member/addressCheck?email=${email}&address=${address}`);
      },


    // 이미지 수정
    updateImg: async(email, img) => {
        const updateData = {
            email: email,
            img: img
        };
        return await axios.post("/auth/member/updateImg", updateData);
    },

    // 내 게시글 조회
    getMyWrite: async(memberId) => {
        return await axios.get(`/auth/member/communities?memberId=${memberId}`);
    },

    // 내 게시글 전체 삭제
    delMyWrite: async(memberId) => {
        return await axios.delete(`/auth/member/deleteMyCommunities?memberId=${memberId}`);
    },

    // 내 게시글 선택 삭제
    deleteCommunitySelection: async(communityId) => {
        return await axios.delete(`/auth/member/delCommunity?communityId=${communityId}`);
    },

    // 내 댓글 조회
    getComment: async(memberId) => {
        return await axios.get(`/auth/member/comments?memberId=${memberId}`);
    },

    // 내 댓글 전체 삭제
    delComment: async(memberId) => {
        return await axios.delete(`/auth/member/deleteMyComments?memberId=${memberId}`);
    },

    // 내 댓글 선택 삭제
    deleteCommentSelection: async(commentId) => {
        return await axios.delete(`/auth/member/delComment?commentId=${commentId}`);
    },

    // 내 결제목록 조회(특산품)
    getPayment: async(memberId) => {
        return await axios.get(`/auth/member/payments?memberId=${memberId}`);
    },

    // 내 큰손랭킹 조회
    myRichRanking: async(memberId) => {
        return await axios.get(`/auth/member/ranking/${memberId}`);
    },

    // 내 뱃지랭킹 조회
    myBadgeRanking: async(memberId) => {
        return await axios.get(`/auth/member/ranking/badges/${memberId}`);
    },

    // 내 리뷰 조회
    getReview: async(memberId) => {
        return await axios.get(`/auth/member/reviews?memberId=${memberId}`);
    },

    // 내 리뷰 전체 삭제
    delReview: async(memberId) => {
        return await axios.delete(`/auth/member/deleteMyReview?memberId=${memberId}`);
    },

    // 내 리뷰 선택 삭제
    deleteReviewSelection: async(reviewId) => {
        return await axios.delete(`/auth/member/delReview?reviewId=${reviewId}`);
    },

    // 내 예약목록 조회
    getReservation: async(memberId) => {
        return await axios.get(`/auth/member/activities?memberId=${memberId}`);
    },

    // 내 예약목록 삭제


    // 사용자의 알림 목록 가져오기(GET)
    getNotice: async(memberId) => {
        return await axios.get(`/auth/member/noticeList?memberId=${memberId}`);
    },




}
export default MemberAPI;
