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
  // 게시판 최신순 전체 조회
  BoardGetAllByNewest: async () => {
    return await axios.get( `/auth/community/getAllnewestboard`);
  },
  // 게시판 인기순 전체 조회
  BoardGetAllByLikest: async () => {
    return await axios.get(`/auth/community/getAlllikestboard`);
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
  // 게시판 좋아요 한번만 누르기
  checkBoardLike: async (communityId) => {
    const checkLike = {
      communityId: communityId
    };
     const Authorization =
        "Bearer " + window.localStorage.getItem("accessToken");
    return await axios.post( `/memberlike/likeboard`, checkLike, {
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
  // 게시판 작성
  BoardWrite : async(title, category, text, communityImg) => {
    const writeBoard = {
      communityTitle : title,
      communityCategory : category,
      communityDesc : text,
      communityImg : communityImg
    };
    const Authorization =
        "Bearer " + window.localStorage.getItem("accessToken");
    return await axios.post( `/community/writeboard`, writeBoard, {
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
  // 게시판 수정
  BoardUpdate: async (communityId, title, category, text, uploadedImageUrl) => {
    const updateBoard = {
      communityId: communityId,
      communityTitle: title,
      communityCategory: category,
      communityDesc: text,
      uploadedImageUrl: uploadedImageUrl
    };
    const Authorization =
        "Bearer " + window.localStorage.getItem("accessToken");
    return await axios.post(`/community/updateboard`,updateBoard, {
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
};
export default BoardAPI;
