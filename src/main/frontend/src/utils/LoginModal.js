import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const ModalStyle = styled.div`
  .modal {
    display: none; // 숨겨진 상태로 시작
    position: fixed; // 스크롤해도 동일한 위치
    top: 0; // 화면 전체를 덮도록 위치
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99; // 다른 모달 보다 위에 위치하도록 함
    background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
  }
  .openModal {
    display: flex; // 모달이 보이도록 함
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }
  button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 3px;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  section > header {
    width: 100%;
    height: 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #222;
    padding: 0 8px 0 8px;
    color: white;
    font-size: 14px;
    font-weight: 600;
  }

  section > header button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    font-size: 18px;
    text-align: center;
    color: white;
    background-color: transparent;
    .x-icon {
      font-size: 18px;
      transition: all 0.1s ease-in;
    }
    &:hover .x-icon {
      transform: scale(1.1);
    }
  }
  section > main {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
    height: 64px;
    align-items: center;
  }
  section > footer {
    box-sizing: border-box;
    padding: 8px 8px;
    text-align: right;
  }
  section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #222;
    border-radius: 3px;
    font-size: 13px;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background: royalblue;
    }
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoginModal = (props) => {
  const { open, confirm, close, type, header, children } = props;
  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <button onClick={close}>
                <CloseIcon className="x-icon" />
              </button>
            </header>
            <main>{children}</main>
            <footer>
              <button onClick={close}>확인</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default LoginModal;
