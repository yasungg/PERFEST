import React from "react";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  height: 100%;
  width: 300px;
  background-color: #2f4050;
`;

const SidebarList = styled.ul`
  height: auto;
  padding: 0;
  width: 100%;
`;

const SidebarItem = styled.li`
  width: 100%;
  height: 50px;
  border: 1px solid black;
  list-style-type: none;
  margin: 0%;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    cursor: pointer;
    background-color: #293846;
  }

  &.active {
    background-color: #293846;
  }
`;

function SideBar() {
  return (
    <AppContainer>
      <SidebarContainer>
        <SidebarList>
          {SidebarData.map((val, key) => {
            return (
              <SidebarItem
                key={key}
                className={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="title">{val.title}</div>
              </SidebarItem>
            );
          })}
        </SidebarList>
      </SidebarContainer>
    </AppContainer>
  );
}

export default SideBar;
