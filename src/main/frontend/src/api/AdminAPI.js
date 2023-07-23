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
  SearchMember: async (keyword) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);

    return await axios.get(
      `/admin-member/get-member-searchresult?keyword=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      }
    );
  },
  GetOut: async (memberIds, isEnabled) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);

    const changeSet = {
      memberIds: memberIds,
      isEnabled: isEnabled,
    };

    return await axios.put(`/admin-member/update-member-status`, changeSet, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: Authorization,
      },
    });
  },
  GetResultForGetOut: async (memberIds) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);

    const data = {
      memberIds: memberIds,
      pageNumber: 0,
      pageSize: 25,
    };
    return await axios.get(`/admin-member/get-result-list`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Authorization,
      },
    });
  },
};
export default AdminAPI;
