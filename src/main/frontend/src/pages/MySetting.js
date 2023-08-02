import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Modal from "../utils/Modal";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";


const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #FEFDFD;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 15px auto;
  border: 1px solid gray;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
`;

const Section2 = styled.div`
  width: 100%;

  p {
    font-size: 0.9em;
    font-weight: bold;
  }

  input {
    width: 100%;
    height: 35px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;
  }

  button {
    width: 100%;
    height: 35px;
    font-size: 0.8em;
    font-weight: bold;
    background-color: white;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  button {
    /* background-color: transparent; */
    border: 1px;
    cursor: pointer;
    font-size: 1em;
    color: #2f4050;
    /* margin-left: 10px; */
    &:hover {
      color: skyblue;
    }
  }
`;

const Label = styled.label`

  button {
    height: 0%;
    /* background-color: none; */
    top: 77px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: skyblue;
    }
  }
`;

const DeleteMem = styled.div`
  width: 100%;
  margin: 30px auto;
  text-align: center;

  button {
    width: 80%;
    max-width: 300px;
    height: 35px;
    font-size: 0.8em;
    font-weight: bold;
    background-color: #2f4050;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
      background-color: #293846;
    }
  }

  hr {
    background-color: lightgray;
    border: 0.5px solid lightgray;
  }
`;

const ModalStyle = styled.div`
  width: 100%;
  margin: 0 auto;

  input {
    width: 100%;
    height: 30px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;
  }

  p {
    font-size: 0.9em;
    font-weight: bold;
    margin-top: 10px;
  }

  div {
    font-size: 0.8em;
    font-weight: bold;
    color: #B5B2FF;
  }
`;

// const Tm = styled.div`
//   font-size: 1.8em;
//   font-weight: bold;
//   margin-bottom: 15px;
// `;

const MySetting = () => {

  const navigate = useNavigate();
  const {isLogin, setIsLogin} = useContext(UserContext);

  // 회원정보 조회 및 닉네임 , 주소 수정
  const [memberInfo, setMemberInfo] = useState("");
  const [inputAdd, setInputAdd] = useState("");
  const [inputNicName, setInputNicName] = useState("");

  // 모달
  const [delModalOpen, setDelModalOpen] = useState(false); // 회원탈퇴 모달
  const [addModalOpen, setAddModalOpen] = useState(false); // 주소 수정 모달
  const [nicModalOpen, setNicModalOpen] = useState(false); // 닉네임 수정 모달

  // 오류 메세지 (바꿀수있음)
  const [addMsg, setAddMsg] = useState("");
  const [nicMsg, setNicMsg] = useState("");

  // 회원 조회
  useEffect(() => {
    const memberInfo = async() => {
      const rsp = await MemberAPI.getMemberInfo();
      if(rsp.status === 200) setMemberInfo(rsp.data);

    };
    memberInfo();
  },[]);

  const deleteMem = () => {
    setDelModalOpen(true);
  }

  const updateAdd = () => {
    setAddModalOpen(true);
  }

  const updateNicName = () => {
    setNicModalOpen(true);
  }



  const confirm = async(modalType) => {
    if(modalType === "del") {
      const response = await MemberAPI.deleteMem()
      .then((rst) => {
        navigate("/pages/Login"); // 탈퇴시 로그인 화면
        setIsLogin(false);
      })
      .catch((error) => {
        console.error(error);
      });
    } else if(modalType === "updateAdd") {
        const response = await MemberAPI.updateAdd(inputAdd);
        if(response.data === true) {
          const updateInfo = await MemberAPI.getMemberInfo();
          if(updateInfo.status === 200) {
            setMemberInfo(updateInfo.data);
            setAddModalOpen(false);
            setInputAdd("");
          }
        }

    } else if(modalType === "upNicname") {
      const nicNameCheck = await MemberAPI.nickNameRegCheck(inputNicName);
      if(nicNameCheck.data === true) {
        const response = await MemberAPI.updateNickName(inputNicName);
        if(response.data === true) {
          const updatedInfo = await MemberAPI.getMemberInfo();
          if(updatedInfo.status === 200) {
            setMemberInfo(updatedInfo.data);
            setNicModalOpen(false);
            setInputNicName("");
          }
        }
      } else {
        setNicMsg("이미 등록된 닉네임입니다");
      }
    }
  }

  const onChangeAdd = (e) => {
    setInputAdd(e.target.value);
  }

  const onChangeNicName = (e) => {
    setInputNicName(e.target.value);
  }

  const closeModal = () => {
    setDelModalOpen(false);
    setAddModalOpen(false);
    setNicModalOpen(false);
  }

  return (
    <>
      <BodyContainer>
        {/* <Tm>내 정보</Tm> */}
        <Header />
        <Container>
          {memberInfo && memberInfo.map(member => (
            <Section2 key={member.email}>
              <Label>
                <div>
                  <p>이메일</p>
                  <input type="email" value={member.email} readOnly placeholder={member.email} />
                </div>
              </Label>
              <Label>
                <div>
                  <p>이름</p>
                  <div className="name"></div>
                  <input type="text" value={member.memberName} readOnly placeholder={member.name} />
                </div>
              </Label>
              <Label>
                <div>
                  <p>닉네임</p>
                  <div className="nicName"></div>
                <input
                  type="text"
                  readOnly
                  placeholder={member.nickName}
                />
                <ButtonContainer>
                  <button onClick={updateNicName}>
                    <FaPencilAlt />
                  </button>
                </ButtonContainer>
                </div>
              </Label>
              <Label>
                <div>
                  <p>주소</p>
                  <div className="address"></div>
                <input
                  type="address"
                  readOnly
                  placeholder={member.address}
                />
                <ButtonContainer>
                  <button onClick={updateAdd}>
                    <FaPencilAlt />
                  </button>
                </ButtonContainer>
                </div>
              </Label>
            </Section2>
          ))}

          <DeleteMem>
            <button onClick={deleteMem}>회원탈퇴</button>
            <hr />
          </DeleteMem>
        </Container>
      </BodyContainer>
      <Modal open={delModalOpen} type={true} close={closeModal} confirm={() => confirm("del")} header="회원탈퇴">
              정말 탈퇴하시겠습니까?
      </Modal>
      <Modal open={addModalOpen} type={true} close={closeModal} confirm={() => confirm("updateAdd")} header="주소 변경" >
        <ModalStyle>
          <p>수정할 주소를 입력해주세요</p>
          <br />
          <input type="address" value={inputAdd} onChange={onChangeAdd} />
          <div>
            <p>{addMsg}</p>
          </div>
        </ModalStyle>
      </Modal>
      <Modal open={nicModalOpen} type={true} close={closeModal} confirm={() => confirm("upNicname")} header="닉네임 변경">
        <ModalStyle>
          <p>수정할 닉네임을 입력해주세요</p>
          <br />
          <input type="text" value={inputNicName} onChange={onChangeNicName} />
          <div>
            <p>{nicMsg}</p>
          </div>
        </ModalStyle>
      </Modal>
    </>
  );

};

export default MySetting;