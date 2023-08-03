import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import { Container } from "./StandardStyles";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FestivalAPI from "../api/FestivalAPI";
import { useNavigate } from "react-router";

const AdvertisementBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  background: #f1f1f1;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  span {
    font-size: 14px;
  }
  .bold {
    font-weight: 600;
  }
`;
const MiniButton = styled.button`
  display: flex;
  width: 74px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  .bold {
    width: auto;
    font-weight: 600;
    color: royalblue;
  }
  .icon-change {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    .add-icon {
      position: absolute;
      left: -20px;
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .icon-change {
    .calendar-icon {
      transition: all 0.1s linear;
      transform: translateX(20px);
    }
    .add-icon {
      transition: all 0.1s linear;
      left: 0;
    }
  }
`;
const ProductBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 120px;
  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */

  &::-webkit-scrollbar {
    position: fixed;
    right: -4px;
    width: 6px;
    background: white;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
  &:hover {
    cursor: pointer;
  }
`;
const ProductLeftBox = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  @media screen and (max-width: 767px) {
    width: 30vw;
    height: 30vw;
  }
`;
const ProductPictureBox = styled.div`
  box-sizing: border-box;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;
const ProductPicture = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  transition: all 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
const ProductRightBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 70vw;
    height: 30vw;
  }
`;
const ProductDescBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #222;
  }
  .desc {
    font-weight: 400;
    font-size: 14px;
    color: #999;
    margin-bottom: 8px;
  }
  .price {
    font-weight: 600;
    font-size: 15px;
    color: royalblue;
  }
  .sold-out {
    font-weight: 600;
    font-size: 15px;
    color: red;
  }
`;
const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { detailComponentValue } = useContext(UserContext);

  useEffect(() => {
    const GetList = async () => {
      const list = await FestivalAPI.GetProductListForDetail(
        detailComponentValue
      )
        .then((result) => {
          console.log(result.data);
          setProduct(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (detailComponentValue) GetList();
  }, [detailComponentValue]);
  return (
    <Container>
      <AdvertisementBox>
        <div className="spanbox">
          <span>무더운 여름을 시원하게 만들어 줄 </span>
          <span className="bold">시즌 상품</span>
        </div>
        <MiniButton className="advertisement-button">
          <div className="icon-change">
            <KeyboardDoubleArrowRightIcon
              className="calendar-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
            <KeyboardDoubleArrowRightIcon
              className="add-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
          </div>
          <span className="bold">바로가기</span>
        </MiniButton>
      </AdvertisementBox>
      {product &&
        product.map((data) => (
          <ProductBox onClick={() => navigate("/page/payready", {state : data})}>
            <ProductLeftBox>
              <ProductPictureBox>
                <ProductPicture src={data.productImg} alt="product-picture" />
              </ProductPictureBox>
            </ProductLeftBox>
            <ProductRightBox>
              <ProductDescBox>
                <span className="title">{data.productName}</span>
                <span className="desc">{data.productDesc}</span>
                {data.productQuantity === "0" ? (
                  <span className="sold-out">품절</span>
                ) : (
                  <span className="price">{data.productPrice} 원</span>
                )}
              </ProductDescBox>
            </ProductRightBox>
          </ProductBox>
        ))}
    </Container>
  );
};
export default Product;
