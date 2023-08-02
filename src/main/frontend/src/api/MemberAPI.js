import axios from "axios";

const MemberAPI = {
  // 이메일로 특정회원 조회
  getMemberInfo: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/email`, {
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
        console.log(error);
      });
  },

  // 회원 닉네임 수정
  updateNickName: async (nickname) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    const updateData = {
      nickname: nickname,
    };
    return await axios
      .post("/member/nickname", updateData, {
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
        console.log(error);
      });
  },

  // 닉네임 수정 중복값 체크
  nickNameRegCheck: async (nicknameCheck) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/nicknameCheck?nickname=${nicknameCheck}`, {
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
        console.log(error);
      });
  },

  // 회원 탈퇴
  deleteMem: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    const updateData = {
      // username: username;
    };
    return await axios
      .post("/member/del", {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
          "Cache-Control": "no-cache, no-store",
          Pragma: "no-cache",
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 주소 수정
  updateAdd: async (address) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    const updateData = {
      address: address,
    };
    return await axios
      .post("/member/updateAdd", updateData, {
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
        console.log(error);
      });
  },

  // 주소 수정 중복값 체크 (중복시 errorMsg)
  addRegCheck: async (address) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/addressCheck?address=${address}`, {
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
        console.log(error);
      });
  },

  // 이미지 수정
  updateImg: async (img) => {
    const updateData = {
      img: img
    };
    const Authorization =
    "Bearer " + window.localStorage.getItem("accessToken");
    return await axios.post("/member/updateImg", updateData,{
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
      console.log(error);
    });
  },
  // 프로필 이미지 가져오기
  getProfileImg: async () => {
    const Authorization =
    "Bearer " + window.localStorage.getItem("accessToken");
  return await axios
    .get(`/member/getprofileimage`, {
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
      console.log(error);
    });
},
  // 닉네임 가져오기
  getMemberNickName: async () => {
    const Authorization =
    "Bearer " + window.localStorage.getItem("accessToken");
  return await axios
  .get(`/member/getnickname`, {
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
    console.log(error);
  });
},
  // 내 게시글 조회
  getMyWrite: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/communities`, {
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
        console.log(error);
      });
  },

  // 내 게시글 전체 삭제
  delMyWrite: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/deleteMyCommunities`, {
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
        console.log(error);
      });
  },

  // 내 게시글 선택 삭제
  deleteCommunitySelection: async (communityId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/delCommunity?communityId=${communityId}`, {
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
        console.log(error);
      });
  },

  // 내 댓글 조회
  getComment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/comments`, {
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
        console.log(error);
      });
  },

  // 내 댓글 전체 삭제
  delComment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/deleteMyComments`, {
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
        console.log(error);
      });
  },

  // 내 댓글 선택 삭제
  deleteCommentSelection: async (commentId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/delComment?commentId=${commentId}`, {
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
        console.log(error);
      });
  },

  // 내 결제목록 조회(특산품)
  getPayment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/payments`, {
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
        console.log(error);
      });
  },

  // 내 큰손랭킹 조회
  myRichRanking: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/ranking`, {
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
        console.log(error);
      });
  },
  // 내 뱃지랭킹 조회
  myBadgeRanking: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/ranking/badges`, {
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
        console.log(error);
      });
  },

  // 내 리뷰 조회
  getReview: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/reviews`, {
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
        console.log(error);
      });
  },

  // 내 리뷰 전체 삭제
  delReview: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/deleteMyReview`, {
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
        console.log(error);
      });
  },

  // 내 리뷰 선택 삭제
  deleteReviewSelection: async (reviewId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/delReview?reviewId=${reviewId}`, {
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
        console.log(error);
      });
  },

  // 내 예약목록 조회
  getReservation: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/activities`, {
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
        console.log(error);
      });
  },

  // 내 예약목록 삭제

  // 사용자의 알림 목록 가져오기(GET)
  getNotice: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/notice/noticeList`, {
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
        console.log(error);
      });
  },
  Name: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");

    return await axios
      .get(`/member/get-name`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내가 좋아요한 축제 일정 조회(캘린더용)
  getCalendar: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/member/calender`, {
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
        console.log(error);
      });
  },

  // 좋아요 한 내 축제 일정 개별 삭제
  deleteCalender: async (calenderId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete(`/member/delCalender?calenderId=${calenderId}`, {
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
        console.log(error);
      });
  },

  // 좋아요한 내 축제 일정 전체 삭제
  deleteAllCalender: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .delete("/member/delAllCalender", {
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
        console.log(error);
      });
  },

  // 해당 축제 내 일정 추가
  addCal: async(festivalId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    const updateData = {
      festivalId: festivalId,
    };
    return await axios
    .post(`/member/addCal`, updateData, {
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
      console.log(error);
    });
  },

  
};
export default MemberAPI;
