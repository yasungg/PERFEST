import axios from "axios";

const BoardAPI = {
  // 게시판 전체조회
  BoardGet: async () => {
    return await axios.get(`/auth/community/getallboard`);
  },
  // 게시판 카테고리별 조회
  BoardGetByCategory: async (selectCategory) => {
    return await axios.get(
        `/auth/community/getselectboard?communityCategory=${selectCategory}`
    );
  },
  // 게시판 최신순 조회
  BoardGetByNewest: async (selectCategory) => {
    return await axios.get( `/auth/community/getnewestboard?communityCategory=${selectCategory}`);
  },
  // 게시판 인기순 조회
  BoardGetByLikest: async (selectCategory) => {
    return await axios.get(`/auth/community/getlikestboard?communityCategory=${selectCategory}`);
  },
  // 게시판 제목 검색
  BoardSearchByTitle: async (communityTitle) => {
    return await axios.get( `/auth/community/getboardtitle?communityTitle=${communityTitle}`);
  },
  // 게시판 닉네임 검색
  BoardSearchByNickName: async(memberNickName) => {
    return await axios.get(`/auth/community/getboardnickname?nickName=${memberNickName}`);
  },
  // 게시판 본문 내용 가져오기
  GetBoardArticle: async (communityId) => {
    return await axios.get(`/auth/community/getboardarticle?communityId=${communityId}`
    );
  },
  // 게시판 게시글에 좋아요 추가
  AddBoardLike: async (communityId) => {
    const addLike = {
      communityId: communityId,
    };
    return await axios.post(`/auth/community/BoardArticle/${communityId}/addlike`,
      addLike
    );
  },
  // 게시판 작성
  BoardWrite: async (title, category, text, memberId) => {
    const writeBoard = {
      communityTitle: title,
      communityCategory: category,
      communityDesc: text,
      memberId: memberId,
    };
    return await axios.post(`/auth/community/writeboard`,
      writeBoard
    );
  },
  // 게시판 수정
  BoardUpdate: async (title, category, text) => {
    const updateBoard = {
      communityTitle: title,
      communityCategory: category,
      communityDesc: text,
    };
    return await axios.post(`/auth/community/updateboard`,
      updateBoard
    );
  },
};
export default BoardAPI;
