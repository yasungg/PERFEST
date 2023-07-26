import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const NumberBtn = styled.button`
  display: flex;
  width: 22px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
  font-weight: 400;
  color: #222;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background: #eee;
    font-weight: 600;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageBtns = () => {
    const pageButtons = [];
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      pageButtons.push(
        <NumberBtn
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={pageNum - 1 === currentPage ? "active" : ""}
        >
          {pageNum}
        </NumberBtn>
      );
    }
    return pageButtons;
  };
  return <>{renderPageBtns()}</>;
};
export default Pagination;
