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
  GetImagesForDetail: async (festivalId) => {
    return await axios.get(
      `/auth/festival/get-image-links?festivalId=${festivalId}`
    );
  },
  GetProductListForDetail: async (festivalId) => {
    return await axios.get(
      `/auth/product/get-product-list?festivalId=${festivalId}`
    );
  },

  // 카테고리 검색
  searchFestival: async(selectedLocations,selectedStartDate,selectedEndDate) => {
		const info = {
			location: selectedLocations,
			period : {
				startDate : selectedStartDate,
				endDate : selectedEndDate
			}
    }
    return await axios.post(`/auth/festival/getSearchFestivalInfo `, info)
  },
  GetActivityListForDetail: async (festivalId) => {
    return await axios.get(
      `/auth/activity/get-activity-list?festivalId=${festivalId}`
    );
  },
  activityReservation: async(data, index) => {
    const info = {
      activityId : index,
      activityPrice: data.activityPrice,
      activityQuantity: data.activityQuantity,
      activityName: data.activityName
    }
    return await axios.post(
    `/activity/registActivityInfo`, info
    )
  }
};
export default FestivalAPI;
