import axios from "axios";


const FestivalAPI = {
  // 전체 축제 조회
  getFestivalInfo: async() => {
    return await axios.get( '/auth/festival/getfestivals') ;
  }
}
export default FestivalAPI;