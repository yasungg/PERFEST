// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { formatDate } from "../components/DateStyle";
// import { GoHeart } from 'react-icons/go';
// import { MdSubdirectoryArrowRight } from 'react-icons/md';
//
// const CommentDesc = styled.div`
// display: flex;
// flex-direction: column;
// `;
// const Comment = styled.div`
// margin-top: 5px;
// margin-bottom: 5px;
// `;
// const CommentHead = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;
//
// const CommentNickName = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   color: #333;
// `;
//
// const CommentWrittenTime = styled.div`
//   font-size: 14px;
//   color: #666;
//   margin-left: 10px;
// `;
//
// const CommentReWrite = styled.div`
//   .replycomment {
//     border: none;
//     background-color: white;
//     border-radius: 4px;
//     color: #333;
//     font-weight: bold;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//     &:hover {
//       background-color: #f1f1f1;
//     }
//   }
// `;
//
// const CommentLike = styled.div`
//   .like {
//     border: none;
//     background-color: white;
//     border-radius: 4px;
//     color: #333;
//     font-weight: bold;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//
//     &:hover {
//       background-color: #f1f1f1;
//     }
//   }
// `;
// const CommentArr = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
//
// const CommentBody = styled.div`
//   font-size: 17px;
//   color: #333;
// `;
//
// const CommentLikeCount = styled.div`
//   font-size: 14px;
//   color: #666;
// `;
// const CommentReplyWrite = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   margin-top: 10px;
//
//   .commentreply {
//     width: 85%;
//     padding: 8px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     font-size: 14px;
//     resize: none;
//     outline: none;
//   }
// `;
//
// const CommentReplyWriteButton = styled.button`
//   width: 10%;
//   padding: 8px;
//   background-color: #f5f5f5;
//   border: none;
//   border-radius: 4px;
//   font-weight: bold;
//   cursor: pointer;
//   color: #333;
//   transition: background-color 0.3s;
//
//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;
// const ReplyCommentDesc = styled.div`
// margin-top: 5px;
// margin-left: 10px;
// `;
// const ReplyCommentIcon = styled.div`
// `
// const Heart = styled(GoHeart)`
//     color: red;
// `;
// const Arrow = styled(MdSubdirectoryArrowRight)`
// `;
//
// const CommentSection = ({
//                             commentData,
//                             replyCommentData,
//                             showReplyInput,
//                             replyCommentInput,
//                             onClickShowReplyWrite,
//                             onClickCommentLike,
//                             onClickWriteReplyComment,
//                             onChangeReplyComment,
//                         }) => {
//     return (
//         <>
//             {commentData && commentData.map((comment) => (
//                 <CommentDesc key={comment.commentId}>
//                     <Comment>
//                         <CommentHead>
//                             <CommentNickName>{comment.nickname}</CommentNickName>
//                             <CommentWrittenTime>{formatDate(comment.commentWrittenTime)}</CommentWrittenTime>
//                             <CommentReWrite>
//                                 <button className="replycomment" onClick={() => onClickShowReplyWrite(comment.commentId)}>대댓글</button>
//                             </CommentReWrite>
//                             <CommentLike>
//                                 <button className="like" onClick={() => onClickCommentLike(comment.commentId)}>좋아요</button>
//                             </CommentLike>
//                         </CommentHead>
//                         <CommentArr>
//                             <CommentBody>{comment.commentBody}</CommentBody>
//                             <CommentLikeCount>
//                                 <Heart />
//                                 {comment.commentLikeCount}
//                             </CommentLikeCount>
//                         </CommentArr>
//                         {/* 대댓글 렌더링 */}
//                         {replyCommentData[comment.commentId] &&
//                             replyCommentData[comment.commentId].map((comment) => (
//                                 <ReplyCommentDesc key={comment.commentId}>
//                                     <CommentHead>
//                                         <ReplyCommentIcon><Arrow /></ReplyCommentIcon>
//                                         <CommentNickName>{comment.nickname}</CommentNickName>
//                                         <CommentWrittenTime>{formatDate(comment.commentWrittenTime)}</CommentWrittenTime>
//                                         <CommentReWrite>
//                                             <button className="replycomment" onClick={() => onClickShowReplyWrite(comment.commentId)}>대댓글</button>
//                                         </CommentReWrite>
//                                         <CommentLike>
//                                             <button className="like" onClick={() => onClickCommentLike(comment.commentId)}>좋아요</button>
//                                         </CommentLike>
//                                     </CommentHead>
//                                     <CommentArr>
//                                         <CommentBody>{comment.commentBody}</CommentBody>
//                                         <CommentLikeCount>
//                                             <Heart />
//                                             {comment.commentLikeCount}
//                                         </CommentLikeCount>
//                                     </CommentArr>
//                                 </ReplyCommentDesc>
//                             ))}
//                         {showReplyInput.get(comment.commentId) && (
//                             <CommentReplyWrite>
//                 <textarea
//                     className="commentreply"
//                     cols="160"
//                     rows="3"
//                     value={replyCommentInput.get(comment.commentId) || ""}
//                     onChange={(e) => onChangeReplyComment(e, comment.commentId)}
//                 ></textarea>
//                                 <CommentReplyWriteButton onClick={() => onClickWriteReplyComment(comment.commentId)}>
//                                     댓댓글 작성하기
//                                 </CommentReplyWriteButton>
//                             </CommentReplyWrite>
//                         )}
//                         <hr></hr>
//                     </Comment>
//                 </CommentDesc>
//             ))}
//         </>
//     );
// };
//
// export default CommentSection;
