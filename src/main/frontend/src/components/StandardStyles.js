import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;
export const BodyContainer = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1280px) {
    width: 100%;
  }
`;
export const MaxBodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
