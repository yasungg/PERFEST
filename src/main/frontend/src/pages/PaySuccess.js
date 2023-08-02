import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import checkImg from '../images/check.png'

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 700px;
    width: 700px;
    height: auto;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    text-align: center;
    align-items: center;
  }
  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
  }
  .modal > section > header button {
    position: absolute;
    top: -1;
    right: 8px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .close {
    color: black;
    background-color: #dee2e6;
    border-radius: 5px;
    font-size: 13px;
  }

  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
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
const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Title = styled.h2`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PaymentData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border: 1px solid lightgray;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
`
const ProductDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`
const ProductImg = styled.img`
  width: 45%;
  border: 1px solid gray;
`
const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  .productContainer {

  }
  .productName {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .productPrice {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .productQuantity {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .productReserves {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
`

function ResultSuccess () {
  const location = useLocation();
  const data = location.state;
    return (
        <ModalStyle>
          <div className={'openModal modal'}>
            <section>
            <main>
              <ModalBody >
                <img src={checkImg} alt="check" width={"10%"} />
                <Title>결제가 완료되었습니다.</Title>
                {data.map((data)=> (
                  <PaymentData>
                  <h2>결제 정보</h2>
                    <ProductDesc>
                      <ProductImg src={data.productImg} width={"50%"} alt='IMG'/>
                      <ProductDetail>
                        <div className='productContainer'>
                          <div className='productName'>
                            <div>상품명</div>
                            <div>{data.productName}</div>
                          </div>
                          <div className='productPrice'>
                            <div>가격</div>
                            <div>{data.productPrice}원</div>
                          </div>
                          <div className='productQuantity'>
                            <div>결제수량</div>
                            <div>{data.quantity}</div>
                          </div>
                          <div className='productReserves'>
                            <div>누적금액</div>
                            <div>{data.totalPrice}원</div>
                          </div>
                        </div>
                      </ProductDetail>
                    </ProductDesc>
                  </PaymentData>
                ))}
                <Link to='/'>메인으로 돌아가기</Link>
              </ModalBody>
            </main>
            </section>
          </div>
        </ModalStyle>
    );
}

export default ResultSuccess;
