import axios from "axios";

const CommentAPI = {
    // 댓글 작성하기
    CommentWrite : async(commentBody, communityId, memberId) => {
        const writeComment = {
            commentBody: commentBody,
            communityId: communityId,
            memberId: memberId
        };
        return await axios.post( `/auth/comment/writecomment`, writeComment);
    },
    // 대댓글 작성하기
    ReplyCommentWrite : async(commentId,memberId,commentBody) => {
        const writeReplyComment = {
            commentId: commentId,
            memberId: memberId,
            commentBody: commentBody           
        };
        return await axios.post( `/auth/comment/writereplycomment`, writeReplyComment)
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
}
export default CommentAPI;