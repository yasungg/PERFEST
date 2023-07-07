import axios from "axios";


const RankingAPI = {
    GetRichRanking : async() => {
        return await axios.get( `/auth/richranking/getrichranking`)
    },
    GetBadgeRanking : async() => {
        return await axios.get(`/auth/badgeranking/getbadgeranking`)
    }

};
export default RankingAPI;