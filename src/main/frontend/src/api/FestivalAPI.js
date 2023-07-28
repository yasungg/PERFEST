import axios from "axios";

const FestivalAPI = {
  // 전체 축제 리스트 받아오기(관리자 전용)
  getFestivalInfo: async () => {
    return await axios.get("/auth/festival/getfestivals");
  },
  //축제 제목 검색 결과 받아오기
  GetSearchResultByFestivalName: async (keyword, pageNum) => {
    return await axios.get(
      `/auth/festival/get-name-searchresult?keyword=${keyword}&pageNum=${pageNum}&pageSize=10`
    );
  },
  // 축제 개별 조회
  getFestivalByFestivalId: async (festivalId) => {
    return await axios.get(
      `/auth/festival/getfestivaldetail?festivalId=${festivalId}`
    );
  },
  //축제 상세정보 네임박스 정보 받아오기
  GetNameBoxInfo: async (festivalId) => {
    return await axios.get(
      `/auth/festival/get-festdetail-namebox?festivalId=${festivalId}`
    );
  },
};
export default FestivalAPI;
