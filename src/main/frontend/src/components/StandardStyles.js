import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;
export const BodyContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 769px) {
    width: 80%;
  }
`;
export const MaxBodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const AdminCard = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
  position: absolute;
  width: calc(100vw - 232px);
  height: calc(100vh - 78px);
  right: 16px;
  bottom: 16px;
  border: 0.8px solid #222;
  background: white;
  border-radius: 3px;
  box-shadow: 5px 10px 20px;
  transition: all 0.3s ease-in;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
`;
export const Xbox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;
export const Xbtn = styled.button`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
  &:hover .xIcon {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;
export const SearchBoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 320px;
  height: 80%;
  border: none;
  background: white;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;
export const SearchBox = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 80%;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  background: white;
  border: 1px solid #222;
  color: #222;
  font-size: 0.9em;
  &:focus {
    outline: none;
  }
`;
export const SearchBtn = styled.button`
  display: flex;
  width: 20px;
  height: 40px;
  background: transparent;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;
