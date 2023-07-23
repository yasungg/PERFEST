import {
  AdminCard,
  Xbox,
  Xbtn,
  SearchBoxContainer,
  SearchBox,
  SearchBtn,
} from "./StandardStyles";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AdminAPI from "../api/AdminAPI";
import Pagination from "./Pagination";

const MemberListTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .header-row {
    height: 40px;
    border-bottom: 0.7px solid #ccc;
  }
`;
const MemberRow = styled.tr`
  display: flex;
  width: 100%;
  height: 20px;
  .header-th {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-weight: 600;
  }
  .member-checkbox {
    width: 3%;
  }
  .member-id {
    width: 8%;
  }
  .member-badges {
    width: 4%;
  }
  .member-name {
    width: 7%;
  }
  .member-nickname {
    width: 10%;
  }
  .member-totalprice {
    width: 9%;
  }
  .member-username {
    width: 18%;
  }
  .member-address {
    width: 26%;
  }
  .member-authority {
    width: 10%;
  }
  .member-isenabled {
    width: 5%;
  }
`;
const RowElement = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background: #eee;
  border-right: 0.7px solid gray;
  font-size: 14px;
  font-weight: 400;
`;
const ChangeBtn = styled.button`
  display: flex;
  width: 40px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
  font-weight: 600;
  color: #222;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border: none;
  outline: none;
  background: white;
  margin-bottom: 8px;
`;
const NumBtnWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
`;
const MemberControl = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
`;
const ControlBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 26px;
`;
const ControlBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 3px;
  border: none;
  background: #222;
  color: white;
  font-weight: 600;
`;
const MembershipManagement = () => {
  const { memberOpacity, setMemberOpacity } = useContext(UserContext);
  const page = 0;
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // -----------------------------------> 페이지네이션 상태관리
  //숫자 버튼을 누르면 숫자에 맞는 페이지 렌더링
  const renderThisPage = async (page) => {
    const getInfo = await AdminAPI.GetMemberList(page)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          console.log(result.data.content);
          setCurrentPage(page - 1);
          setMemberList(result.data.content);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 이전 버튼을 클릭했을 때 -1 페이지네이션의 결과를 요청
  const onClickPreviousPage = async () => {
    if (currentPage > 0) {
      const getPreviousPage = await AdminAPI.GetMemberList(currentPage - 1)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setMemberList(result.data.content);
            setCurrentPage(currentPage - 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 다음 버튼을 클릭했을 때 +1 페이지네이션의 결과를 요청
  const onClickNextPage = async () => {
    if (currentPage + 1 < totalPages) {
      const getNextPage = await AdminAPI.GetMemberList(currentPage + 1)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setMemberList(result.data.content);
            setCurrentPage(currentPage + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickRefresh = async () => {
    const getInfo = await AdminAPI.GetMemberList(currentPage)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          console.log(result.data.content);
          setMemberList(result.data.content);
          setTotalPages(result.data.totalPages);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //멤버 리스트 1페이지를 자동으로 렌더링
  useEffect(() => {
    const getMemberList = async () => {
      const getInfo = await AdminAPI.GetMemberList(currentPage)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setMemberList(result.data.content);
            setTotalPages(result.data.totalPages);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMemberList();
  }, [currentPage, totalPages]);

  // -----------------------------------> 여기부터는 정보 CRUD 관련 상태관리

  // 이름 검색 기능
  const onSearchSubmit = async () => {
    const search = await AdminAPI.SearchMember(searchKeyword)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          console.log(result.data);
          setMemberList(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 회원 탈퇴
  const onClickGetOut = async () => {
    const getOut = await AdminAPI.GetOut(selectedUser, false)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //체크하면 체크된 회원번호를 관리 대상 번호 배열에 추가함.
  const onChecked = (e) => {
    const isChecked = e.target.checked;
    console.log(e.target.value);
    if (isChecked) {
      setSelectedUser((prev) => [...prev, e.target.value]);
    } else
      setSelectedUser((prev) => prev.filter((id) => id !== e.target.value));
  };
  return (
    <AdminCard display={memberOpacity}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox
            type="text"
            placeholder="유저 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchBtn onClick={onSearchSubmit}>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
          <SearchBtn onClick={onClickRefresh}>
            <RefreshIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setMemberOpacity("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
      <MemberListTable>
        <thead>
          <MemberRow className="header-row">
            <RowElement className="header-th member-checkbox">/</RowElement>
            <RowElement className="header-th member-id">회원번호</RowElement>
            <RowElement className="header-th member-badges">뱃지</RowElement>
            <RowElement className="header-th member-name">이름</RowElement>
            <RowElement className="header-th member-nickname">
              닉네임
            </RowElement>
            <RowElement className="header-th member-totalprice">
              결제액
            </RowElement>
            <RowElement className="header-th member-username">
              이메일
            </RowElement>
            <RowElement className="header-th member-address">주소</RowElement>
            <RowElement className="header-th member-authority">권한</RowElement>
            <RowElement className="header-th member-isenabled">
              활성화
            </RowElement>
          </MemberRow>
        </thead>
        <tbody>
          {memberList &&
            memberList.map((data) => (
              <MemberRow key={data.id}>
                <RowElement className="member-checkbox">
                  <input type="checkbox" value={data.id} onChange={onChecked} />
                </RowElement>
                <RowElement className="member-id">{data.id}</RowElement>
                <RowElement className="member-badges">{data.badges}</RowElement>
                <RowElement className="member-name">
                  {data.memberName}
                </RowElement>
                <RowElement className="member-nickname">
                  {data.nickname}
                </RowElement>
                <RowElement className="member-totalprice">
                  {data.totalPrice}
                </RowElement>
                <RowElement className="member-username">
                  {data.username}
                </RowElement>
                <RowElement
                  className="member-address"
                  style={{ fontSize: "12px" }}
                >
                  {data.address}
                </RowElement>
                <RowElement className="member-authority">
                  {data.authority}
                </RowElement>
                <RowElement className="member-isenabled">
                  {data.enabled ? <span>O</span> : <span>X</span>}
                </RowElement>
              </MemberRow>
            ))}
        </tbody>
      </MemberListTable>
      <MemberControl>
        <ControlBtnBox>
          <ControlBtn>정지</ControlBtn>
          <ControlBtn onClick={onClickGetOut}>탈퇴</ControlBtn>
        </ControlBtnBox>
      </MemberControl>
      <ButtonWrapper>
        <ChangeBtn onClick={onClickPreviousPage}>이전</ChangeBtn>
        <NumBtnWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={renderThisPage}
          />
        </NumBtnWrapper>
        <ChangeBtn onClick={onClickNextPage}>다음</ChangeBtn>
      </ButtonWrapper>
    </AdminCard>
  );
};
export default MembershipManagement;
