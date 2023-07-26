import axios from "axios";

const CommentAPI = {
    // 댓글 작성하기
    CommentWrite : async(commentBody, communityId) => {
        const writeComment = {
            commentBody: commentBody,
            communityId: communityId,
        };
        const Authorization =
            "Bearer " + window.localStorage.getItem("accessToken");
        console.log(Authorization);
        return await axios.post(`/comment/writecomment`, writeComment, {
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
    // 대댓글 작성하기
    ReplyCommentWrite : async(commentId,commentBody) => {
        const writeReplyComment = {
            commentId: commentId,
            commentBody: commentBody
        };
        const Authorization =
            "Bearer " + window.localStorage.getItem("accessToken");
        console.log(Authorization);
        return await axios.post( `/comment/writereplycomment`, writeReplyComment, {
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
    // 대댓글 조회
    GetReplyComment : async(parentId) => {
        return await axios.get(`/auth/comment/getreplycomment?parentId=${parentId}`)
    },
    // 댓글 갯수 가져오기
    CommentGetCount : async(communityId) => {
        return await axios.get( `/auth/comment/commentcount?communityId=${communityId}`)
    },
    // 댓글 가져 오기
    GetComment : async(communityId) => {
        return await axios.get( `/auth/comment/getcomment?communityId=${communityId}`)
    },
    // 댓글 좋아요 추가
    AddCommentLike: async(commentId) => {
        const addLike = {
            commentId : commentId
        };
        return await axios.post( `/auth/comment/addcommentlike`, addLike)
    },
    // 댓글 좋아요 한번만 누르기
    checkCommentLike: async(commentId) => {
        const checkLike = {
            commentId: commentId
        }
        const Authorization =
        "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios.post( `/memberlike/likecomment`, checkLike, {
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
    }
}
export default CommentAPI;