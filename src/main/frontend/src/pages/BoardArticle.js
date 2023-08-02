import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState, useContext } from "react";
import CommentAPI from "../api/CommentAPI";
import { useEffect } from "react";
import { UserContext } from "../context/UserStore";
import BoardAPI from "../api/BoardAPI";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../components/DateStyle";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import Modal from "../utils/Modal";
import Header from "../components/Header";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 48px 0 48px 0;
  @media screen and (max-width: 769px) {
    h1 {
      font-size: 24px;
    }
    margin: 24px 0 24px 0;
  }
`;
const BoardInfo = styled.div``;
const BoardTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  @media screen and (max-width: 769px) {
    font-size: 18px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;
const BoardNickname = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  @media screen and (max-width: 769px) {
    font-size: 14px;
  }
`;
const BoardDate = styled.div`
  color: #666;
  font-size: 14px;
  @media screen and (max-width: 769px) {
    font-size: 12px;
  }
`;
const BoardDesc = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: auto;
  min-height: 300px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  font-size: 16px;
  color: #333;
  overflow: auto;
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const BoardImg = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;

const Text = styled.p`
  margin: 10px 0;
`;
const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CommentCount = styled.div`
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 8px;
  @media screen and (max-width: 769px) {
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 4px;
  }
`;
const CommentWrite = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  padding: 8px;
  background: #f1f1f1;
  .commentwrite {
    box-sizing: border-box;
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  @media screen and (max-width: 769px) {
    flex-direction: column;
    justify-content: flex-start;
    background: none;
    padding: 0;
    .commentwrite {
      width: 100%;
      padding: 4px;
    }
  }
`;
const CommentWriteButton = styled.button`
  width: 48px;
  padding: 8px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 36px;
  .comment-button-span {
    transition: all 0.1s ease-in;
  }
  &:hover .comment-button-span {
    transform: translateY(-8px);
    cursor: pointer;
  }
  @media screen and (max-width: 769px) {
    align-self: flex-end;
    margin: 8px 0 0 0;
  }
`;
const CommentDesc = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 0 4px 0;
`;
const Comment = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;
const CommentHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const CommentNickName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
const CommentWrittenTime = styled.div`
  font-size: 12px;
  color: #666;
  margin-left: 10px;
`;
const CommentReWrite = styled.div`
  .replycomment {
    border: none;
    background-color: white;
    border-radius: 4px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 3px;
    margin-right: 3px;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;
const CommentLike = styled.div`
  margin-left: 3px;
  margin-right: 3px;
  .like {
    border: none;
    background-color: white;
    border-radius: 4px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;
const CommentArr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CommentBody = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;
const CommentLikeCount = styled.div`
  font-size: 14px;
  color: #666;
`;
const CommentReplyWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 5px;

  .commentreply {
    width: 85%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
    outline: none;
  }
`;
const CommentReplyWriteButton = styled.button`
  width: 10%;
  padding: 8px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
const ReplyCommentDesc = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;
const ReplyCommentIcon = styled.div``;
const Heart = styled(GoHeart)`
  color: red;
`;
const Arrow = styled(MdSubdirectoryArrowRight)``;
const BoardLike = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  .like-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border: none;
    border-radius: 3px;
    background: transparent;
    font-size: 16px;
    color: #222;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: royalblue;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      color: white;
    }
    &:focus {
      outline: none;
    }
  }
  .board-like-count {
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 23px;
    font-weight: bold;
    color: #ff4f4f;
  }
`;

const Heart2 = styled(FaHeart)`
  color: #ff4f4f;
  margin-right: 3px;
  margin-top: 5px;
`;
const BoardArticle = () => {
  const { communityId } = useParams(); // 게시판 번호 전달 하기 위해서 useparams 사용
  const { isLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [inputComment, setInputComment] = useState("");
  const [replyCommentInput, setReplyCommentInput] = useState(new Map()); // 각 댓글에 맞는 대댓글 작성하는 상태 변수
  const [showReplyInput, setShowReplyInput] = useState(new Map()); // 대댓글 입력창 보여줄지 여부를 관리하는 상태 변수
  const [replyCommentData, setReplyCommentData] = useState([]);
  const [commentCount, setCommentCount] = useState("");
  const [boardArticle, setBoardArticle] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentUpdateTrigger, setCommentUpdateTrigger] = useState(false); // 댓글 업데이트를 트리거하는 상태 추가
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [replyUpdateTrigger, setReplyUpdateTrigger] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [likeCountTrigger, setLikeCountTrigger] = useState(false);

  const confirmBtn = () => {
    setOpenModal(false);
    console.log("확인 버튼이 눌려 졌습니다.");
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const onChangeComment = (e) => {
    setInputComment(e.target.value);
  };

  const onClickWriteComment = async () => {
    if (inputComment.trim() === "") {
      // textarea 내용이 비어 있는 경우
      return;
    }
    const response = await CommentAPI.CommentWrite(inputComment, communityId);
    setCommentUpdateTrigger((prev) => !prev);
    setInputComment(""); // 댓글 작성 후 inputComment 상태를 초기화하여 textarea의 내용을 지움
  };
  // 게시판에 있는 댓글 갯수 가져오기
  useEffect(() => {
    const getCommentCount = async () => {
      const rsp = await CommentAPI.CommentGetCount(communityId);
      setCommentCount(rsp.data);
    };
    getCommentCount();
  }, [commentUpdateTrigger]);
  // 게시판 본문 가져오기
  useEffect(() => {
    const getBoardArticle = async () => {
      const response = await BoardAPI.GetBoardArticle(communityId);
      setBoardArticle(response.data);
      setLikeCount(response.data[0].likeCount);
    };
    getBoardArticle();
  }, [communityId, likeCountTrigger]);
  // 게시판 공감하기 눌렀을 때
  const onClickBoardLike = async () => {
    try {
      const response = await BoardAPI.checkBoardLike(communityId);
      if (response.data === false) {
        // 중복 좋아요 방지 실패 시
        setOpenModal(true);
        setModalMsg("이미 공감한 게시글입니다.");
        return;
      }
      // 중복 체크를 통과한 경우, 실제로 좋아요를 추가
      const likeResponse = await BoardAPI.AddBoardLike(communityId);
      setLikeCountTrigger((prev) => !prev);
    } catch (error) {
      console.error("좋아요 추가에 실패했습니다.", error);
    }
  };
  // 댓글 좋아요 눌렀을 때
  const onClickCommentLike = async (commentId) => {
    try {
      const response = await CommentAPI.checkCommentLike(commentId);
      if (response.data === false) {
        // 중복 좋아요 방지 실패 시
        setOpenModal(true);
        setModalMsg("이미 공감한 댓글입니다.");
        return;
      }
      // 중복 체크를 통과한 경우, 실제로 좋아요를 추가
      const likeResponse = await CommentAPI.AddCommentLike(commentId);
    } catch (error) {
      console.error("댓글 좋아요 추가에 실패했습니다.", error);
    }
  };
  // 해당 게시판 댓글 가져오기
  useEffect(() => {
    const getBoardComment = async () => {
      const response = await CommentAPI.GetComment(communityId);
      setCommentData(response.data);
    };
    getBoardComment();
  }, [commentUpdateTrigger]);
  const getCategoryText = (category) => {
    switch (category) {
      case "FIND_PARTY":
        return "파티원 찾기";
      case "FREE_BOARD":
        return "자유게시판";
      case "Q_A":
        return "Q&A";
      default:
        return "";
    }
  };
  // 대댓글 창 보여주기
  const onClickShowReplyWrite = (commentId) => {
    setShowReplyInput((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(commentId, !newMap.get(commentId));
      return newMap;
    });
  };
  // 게시판 대댓글 작성
  const onClickWriteReplyComment = async (commentId) => {
    const replyComment = replyCommentInput.get(commentId); // 해당 댓글의 대댓글 내용 가져오기
    const response = await CommentAPI.ReplyCommentWrite(
      commentId,
      replyComment
    );
    setReplyCommentInput((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(commentId); // 대댓글 작성 후 해당 댓글의 대댓글 내용 삭제
      return newMap;
    });
    setReplyUpdateTrigger((prev) => !prev);
  };
  // 게시판 대댓글 작성
  const onChangeReplyComment = (e, commentId) => {
    const value = e.target.value;
    setReplyCommentInput((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(commentId, value); // 대댓글 내용 업데이트
      return newMap;
    });
    setReplyUpdateTrigger((prev) => !prev);
  };
  // 해당 댓글의 대댓글 가져오기
  useEffect(() => {
    const getReplyCommentData = async (commentId) => {
      const response = await CommentAPI.GetReplyComment(commentId);
      setReplyCommentData((prevData) => ({
        ...prevData,
        [commentId]: response.data,
      }));
    };
    commentData.forEach((comment) => {
      getReplyCommentData(comment.commentId);
    });
  }, [commentData, replyUpdateTrigger]);
  return (
    <Container justifyContent="center" alignItems="center">
      <Header />
      <BodyContainer>
        {boardArticle &&
          boardArticle.map((community) => (
            <BoardInfo key={community.communityId}>
              <Title>
                <h1>{getCategoryText(community.communityCategory)}</h1>
              </Title>
              <BoardTitle>{community.communityTitle}</BoardTitle>
              <UserInfo>
                <BoardNickname>{community.nickname}</BoardNickname>
                <BoardDate>{formatDate(community.writtenTime)}</BoardDate>
              </UserInfo>
              <hr></hr>
              <BoardDesc>
                {community.communityImgLink && (
                  <BoardImg>
                    <Image
                      className="community-img"
                      src={community.communityImgLink}
                      alt=""
                    />
                  </BoardImg>
                )}
                <Text>{community.communityDesc}</Text>
              </BoardDesc>
              <BoardLike>
                {isLogin ? (
                  <button
                    className="like-button"
                    onClick={() => {
                      onClickBoardLike();
                    }}
                  >
                    <ThumbUpOffAltIcon
                      className="like-icon"
                      style={{ fontSize: "18px", marginRight: "8px" }}
                    />{" "}
                    <span>좋아요!</span>
                  </button>
                ) : (
                  <button
                    className="like-button"
                    onClick={() => navigate("/pages/Login")}
                  >
                    <ThumbUpOffAltIcon /> <span>좋아요!</span>
                  </button>
                )}
                <div className="board-like-count">
                  <Heart2 style={{ fontSize: "14px" }} />
                  <span
                    style={{ fontSize: "14px", transform: "translateY(2px)" }}
                  >
                    {likeCount}
                  </span>
                </div>
              </BoardLike>
            </BoardInfo>
          ))}
        <CommentInfo>
          <CommentCount>댓글 {commentCount}</CommentCount>
        </CommentInfo>
        <CommentWrite>
          <textarea
            className="commentwrite"
            cols="160"
            rows="3"
            value={inputComment}
            onChange={onChangeComment}
          ></textarea>
          {isLogin ? (
            <CommentWriteButton onClick={onClickWriteComment}>
              <span className="comment-button-span">등록</span>
            </CommentWriteButton>
          ) : (
            <CommentWriteButton onClick={() => navigate("/pages/Login")}>
              <span className="comment-button-span">등록</span>
            </CommentWriteButton>
          )}
        </CommentWrite>
        {commentData &&
          commentData.map((comment) => (
            <CommentDesc key={comment.commentId}>
              <Comment>
                <CommentHead>
                  <CommentNickName>{comment.nickname}</CommentNickName>
                  <CommentWrittenTime>
                    {formatDate(comment.commentWrittenTime)}
                  </CommentWrittenTime>
                  <CommentReWrite>
                    {isLogin ? (
                      <button
                        className="replycomment"
                        onClick={() => onClickShowReplyWrite(comment.commentId)}
                      >
                        대댓글
                      </button>
                    ) : (
                      <button
                        className="replycomment"
                        onClick={() => navigate("/pages/Login")}
                      >
                        대댓글
                      </button>
                    )}
                  </CommentReWrite>
                  <CommentLike>
                    {isLogin ? (
                      <button
                        className="like"
                        onClick={() => onClickCommentLike(comment.commentId)}
                      >
                        좋아요
                      </button>
                    ) : (
                      <button
                        className="like"
                        onClick={() => navigate("/pages/Login")}
                      >
                        좋아요
                      </button>
                    )}
                  </CommentLike>
                </CommentHead>
                <CommentArr>
                  <CommentBody>{comment.commentBody}</CommentBody>
                  <CommentLikeCount>
                    <Heart />
                    {comment.commentLikeCount}
                  </CommentLikeCount>
                </CommentArr>
                {/* 대댓글 렌더링 */}
                {replyCommentData[comment.commentId] &&
                  replyCommentData[comment.commentId].map((reply) => (
                    <ReplyCommentDesc key={reply.commentId}>
                      <CommentHead>
                        <ReplyCommentIcon>
                          <Arrow />
                        </ReplyCommentIcon>
                        <CommentNickName>{reply.nickname}</CommentNickName>
                        <CommentWrittenTime>
                          {formatDate(reply.commentWrittenTime)}
                        </CommentWrittenTime>
                        <CommentReWrite>
                          <button
                            className="replycomment"
                            onClick={() =>
                              onClickShowReplyWrite(reply.commentId)
                            }
                          >
                            대댓글
                          </button>
                        </CommentReWrite>
                        <CommentLike>
                          {isLogin ? (
                            <button
                              className="like"
                              onClick={() =>
                                onClickCommentLike(reply.commentId)
                              }
                            >
                              좋아요
                            </button>
                          ) : (
                            <button
                              className="like"
                              onClick={() => navigate("/pages/Login")}
                            >
                              좋아요
                            </button>
                          )}
                        </CommentLike>
                      </CommentHead>
                      <CommentArr>
                        <CommentBody>{reply.commentBody}</CommentBody>
                        <CommentLikeCount>
                          <Heart />
                          {reply.commentLikeCount}
                        </CommentLikeCount>
                      </CommentArr>
                    </ReplyCommentDesc>
                  ))}
                {showReplyInput.get(comment.commentId) && (
                  <CommentReplyWrite>
                    <textarea
                      className="commentreply"
                      cols="160"
                      rows="3"
                      value={replyCommentInput.get(comment.commentId) || ""}
                      onChange={(e) =>
                        onChangeReplyComment(e, comment.commentId)
                      }
                    ></textarea>
                    {isLogin ? (
                      <CommentReplyWriteButton
                        onClick={() =>
                          onClickWriteReplyComment(comment.commentId)
                        }
                      >
                        댓댓글 작성하기
                      </CommentReplyWriteButton>
                    ) : (
                      <CommentReplyWriteButton
                        onClick={() => navigate("/pages/Login")}
                      >
                        댓댓글 작성하기
                      </CommentReplyWriteButton>
                    )}
                  </CommentReplyWrite>
                )}
                <br></br>
                <hr></hr>
              </Comment>
            </CommentDesc>
          ))}
        <Modal
          open={openModal}
          type={true}
          close={closeModal}
          confirm={confirmBtn}
        >
          {modalMsg}
        </Modal>
      </BodyContainer>
      <Sidebar />
    </Container>
  );
};
export default BoardArticle;
