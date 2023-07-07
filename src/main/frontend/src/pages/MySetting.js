import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Modal from "../utils/Modal";


const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  background-color: #FEFDFD;
  width: 40%;
  margin: 3px auto;
  border: 1px solid gray;
  padding: 30px;

`;

const Section2 = styled.div`
  width: 80%;
  margin: 0 auto;
  p {
      font-size: .9em;
      font-weight: bold;
    }

    input {
      width: 100%;
      height: 35px;
      border: 1px solid lightgray;
      border-radius: 2px;
    }
`;

const Label = styled.label`

  position: relative;

  button {
    position: absolute;
    height: 25px;
    border: none;
    background-color: white;
    top : 53px;
    right: 0;
    cursor: pointer;
    font-weight: bold;
    &:hover {
    color: skyblue;
    }
  }
`;

const DeleteMem = styled.div`
  width: 80%;
  margin: 30px auto;

  button {
    width: 100%;
    height: 35px;
    font-size: .8em;
    font-weight: bold;
    background-color: #2f4050;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: skyblue;
    }
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
`;

const ModalStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  
  input {
    width: 80%;
    height: 30px;
    border: 1px solid lightgray;
    border-radius: 2px;
  }
  p {
    font-size: 0.9em;
    font-weight: bold;
  }
  div {
    font-size: 0.8em;
    font-weight: bold;
    color: #B5B2FF;
  }
`;

const MySetting = () => {

  const navigate = useNavigate();
  // const context = useContext(UserContext);
  // const { userEmail } = context;  // 로그인후 컨텍스트에 담아올 예정..
  let userEmail = "qhwkal1@naver.com"

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
      const rsp = await MemberAPI.getMemberInfo(userEmail);
      if(rsp.status === 200) setMemberInfo(rsp.data);
     
    };
    memberInfo();
  },[userEmail]);

  const deleteMem = () => {
    setDelModalOpen(true);
  }

  const updateAdd = () => {
    setAddModalOpen(true);
  }

  const updateNicName = () => {
    setNicModalOpen(true);
  }

  // 

  const confirm = async(modalType) => {
    if(modalType === "del") {
      const response = await MemberAPI.deleteMem(userEmail);
      console.log(response.data);
      if(response.data === true) navigate("/Login"); // 탈퇴시 로그인 화면
    } else if(modalType === "updateAdd") {
      const addCheck = await MemberAPI.addRegCheck(userEmail, inputAdd);
      if(addCheck.data === true) {
        const response = await MemberAPI.updateAdd(userEmail, inputAdd);
        console.log(response.data);
        if(response.data === true) {
          const updateInfo = await MemberAPI.getMemberInfo(userEmail);
          if(updateInfo.status === 200) {
            setMemberInfo(updateInfo.data);
            setAddModalOpen(false);
            setInputAdd("");
            
          }
        }
      } else {
        setAddMsg("현재 등록되어있는 주소 입니다.")
      }
    } else if(modalType === "upNicname") {
      const nicNameCheck = await MemberAPI.nickNameRegCheck(inputNicName);
      console.log(nicNameCheck.data);
      if(nicNameCheck.data === true) {
        const response = await MemberAPI.updateNickName(userEmail, inputNicName);
        console.log(response.data);
        if(response.data === true) {
          const updatedInfo = await MemberAPI.getMemberInfo(userEmail);
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
    console.log(e.target.value);
    setInputAdd(e.target.value);
  }

  const onChangeNicName = (e) => {
    console.log(e.target.value);
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
        <p>내 정보 관리</p>
        <Container>
          <Header />
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
                <button onClick={updateNicName}>수정</button>
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
                <button onClick={updateAdd}>수정</button>
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