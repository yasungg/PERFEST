import axios from "axios";

const AdminAPI = {
  GetMemberList: async (pageNumber) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);

    return await axios.get(
      `/admin-member/get-member-all?pageNumber=${pageNumber}&pageSize=25`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      }
    );
  },
};
export default AdminAPI;
