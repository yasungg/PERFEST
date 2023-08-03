import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {UserContext} from "../context/UserStore";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentAPI from "../api/PaymentAPI";
import PayModal from "./PaycancelModal"
import check from '../images/check.png'
import cancel from '../images/cancel.png'

const modalChildren = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}
const fontStyle = {
  fontSize: "1.3rem",
  margin: "5px"
}

const PayReady = () => {
  const context = useContext(UserContext);
  const {setPrice, setQuantity, setProductId } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location;
  // 카카오페이로 보내려는 데이터 작성
  let [data, setData] = useState({
    next_redirect_pc_url: "",
    // 결제 한 건에 대한 고유번호, 결제 준비 API가 성공적으로 호출되면 발급
    tid: "",
    params: {
        // 가맹점 코드
        cid: "TC0ONETIME",
        // 가맹점 주문번호
        partner_order_id: "partner_order_id",
        // 가맹점 회원 id
        partner_user_id: "partner_user_id",
        // 상품 이름
        item_name: state.productName,
        // 상품 수량
        quantity: state.productQuantity,
        // 총 가격
        total_amount: (state.productPrice).toString(),
        // 상품 비과세
        tax_free_amount: 0,
        // 결제 성공시 URL
        approval_url: "http://localhost:3000/page/payresult",
        // 결제 실패시 URL
        fail_url: "http://localhost:3000/page/resultfail",
        // 결제 취소시 URL
        cancel_url: "http://localhost:3000/page/resultfail"
    }
  });
  setQuantity(state.productQuantity);
  setPrice(state.productPrice);
  setProductId(state.Id);
  // 결제 준비 API를 통해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계.
  // 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청.
  useEffect(() => {
    const { params } = data;
    axios({
        url: "https://kapi.kakao.com/v1/payment/ready",
        method: "POST",
        headers: {
            Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        params,
    }).then(response => {
      // 요청이 성공하면 응답 본문에 JSON 객체로 다음 단계 진행을 위한 값들을 받습니다.
      // 서버(Server)는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 URL로 리다이렉트
      const {
          data: { next_redirect_pc_url, tid }, // next_redirect_pc_url : 결제 준비 API 응답으로 받으며, PC 환경에서 사용.
      } = response;
      // 결제 고유번호 tid를 저장
      window.localStorage.setItem("tid", response.data.tid);
      // 결제 페이지를 위한 url
      window.localStorage.setItem('url', next_redirect_pc_url);
      // useContext 에 reponse 값을 저장.
      setData({next_redirect_pc_url : next_redirect_pc_url,
              tid : tid});
      // 실행 성공하면 pg토큰 발급을 위해 해당 주소로 리다이렉트
      window.location.href = response.data.next_redirect_pc_url;

    }).catch(error => {
      window.localStorage.removeItem("tid");
      window.localStorage.removeItem("url");
      // 결제 준비 통신 실패할 경우 이동할 페이지 정해줘야 함
      navigate("/page/resultFail");
    });
  }, []);
}

// 카카오페이에 결제 승인을 요청하는 실질적인 로직.
// 사용자가 카카오톡 결제 화면에서 결제수단을 선택하고 비밀번호 인증까지 마치면,
// 결제 대기 화면은 결제 준비 API 요청 시 전달 받은 approval_url에 pg_token 파라미터를 붙여 리다이렉트.
// pg_token은 결제 승인 API 호출 시 사용
const PayResult = () => {
  const context = useContext(UserContext);
  const {price, quantity, productId } = context;
  // 초기값 셋팅, 결제준비에서 받아온 tid 셋팅
  const [payment, setPayment] = useState({
    // 가격
    price : price,
    // 수량
    quantity : quantity,
    // 카카오 비과세 취소할 때 필요해서 결제할 때 백에다 정보를 넘겨주고 취소할 때 필요하면 다시 받아서 취소
    kakaoTaxFreeAmount : 0,
    // 위에서 받아옴
    tid : window.localStorage.getItem('tid'),
    // 결제 타입
    method : ""
  });
  // 결제준비 api 통신 성공시 받아온 pg_token 받기
  let search = window.location.search;
  let splitToken = search.split("=")[1];

  // 카카오페이 결제 승인 요청에 보낼 정보
  const data = {
    params: {
      // 가맹점 번호
      cid: "TC0ONETIME",
      // 결제 고유번호
      tid : payment.tid,
      partner_order_id: "partner_order_id",
      // 가맹점 회원 id
      partner_user_id: "partner_user_id",
      // pg 토큰
      pg_token: splitToken
    }
  };

  const navigate = useNavigate();
  // 카카오페이 결제 완료되면 DB로 보낼 메소드를 실행하기 위해서 만듦
  const [isTrue, setIsTrue] = useState(false);
  useEffect(() => {
    const { params } = data;
    axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      params
    }).then(response => {
      const responseData = response.data;

      // 여기까지 통신이 성공했으면 카카오 결제 API 는 완료
      // 응답을 받으면 위에 백에다 보낼 정보를 세팅해줌
      setPayment({
        // 총 가격
        price : responseData.amount.total,
        // 수량
        quantity : responseData.quantity,
        // 결제 고유번호
        tid : responseData.tid,
        // 카카오 비과세
        kakaoTaxFreeAmount : responseData.amount.tax_free
      });
      // url을 이용하여 해당 결제로 돌아올 수 없도록 삭제
      window.localStorage.removeItem('url');
      // 성공할 경우
      setIsTrue(true);
    }).catch(error => {
      // 실패하면 결제 고유번호와 url을 지워줌
      window.localStorage.removeItem('url');
      window.localStorage.removeItem("tid");

    });
  },[]);

  // 결제 승인 완료 후 정보를 백엔드에 보내는 로직
  // 결제 로직이 전부 성공한 뒤에 DB로 값을 넣게 하기 위해
  useEffect(() => {
    const PaymentResult = async() => {
      const memberId = 1;
      const response = await PaymentAPI.PaymentSubmit(memberId, productId, payment.price, payment.quantity, payment.tid, payment.kakaoTaxFreeAmount)
      if(response.status === 200) {
        // 카카오페이와 DB전송까지 완료
        navigate("/resultSuccess", {state: response.data});
        window.localStorage.removeItem("tid");
      }
    };
    isTrue && PaymentResult();
  },[isTrue])

};



// 카카오페이 결제 취소 함수
const PayCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location;
  // DB에 상품 결제 내역이 있는 지 먼저 통신 한 뒤, 결제 내역이 있는 경우에
  // 카카오페이 결제 취소 api를 실행하기 위한 useState
  const [isCancel, setIsCancel] = useState(false);

  // 카카오페이 결제 취소 api를 성공했을 경우
  // DB에 있는 상품 결제 내역을 삭제하기 위한 useState
  const [isKakao, setIsKakao] = useState(false);

  // DB에 상품 결제 내역 상태를 변경한 뒤 확인을 위한 useState
  const [isChangeDB, setIsChangeDB] = useState(false);

  // 사용자가 예약한 주문 내역이 있는지 확인하기 위한 로직
  const [memberData, setMemberData] = useState({
    params : {
      cid : "",
      tid : "",
      quantity : state.quantity,
      cancel_amount : state.price,
      cancel_tax_free_amount : 0
    }
  });
  const {memberId, productId, paymentId} = state;

  useEffect(() => {
    openModal(true);
    const getData = async() => {
      const response = await PaymentAPI.CheckPaymentData(memberId, productId, paymentId);
      // const cancelStatus = response.data[0].paymentStatus;
      // 취소 완료 된 결제는 다음 로직을 실행하지 않도록 하기 위해
      if(response.status === 200 ) {
        const { price, quantity, tid, tax_free_amount } = response.data[0];
        setMemberData({
          params : {
            cid : "TC0ONETIME",
            memberId : memberId,
            productId : productId,
            tid : tid,
            price : price,
            quantity : quantity,
            cancel_amount : price,
            cancel_tax_free_amount : tax_free_amount
          }
        });
        setIsCancel(true);
      } else {
        openModal(true);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const { params } = memberData;
    isCancel &&
      axios({
        url: "https://kapi.kakao.com/v1/payment/cancel",
        method: "POST",
        headers: {
          Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params
      }).then(() => {
        setIsKakao(true);
      }).catch(() => {
        openModal(true);
      });
    },[isCancel]
  )

  // 결제 취소 완료 후 모달창을 띄우기 위한 로직
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    navigate('/', {replace:true});
  }

  // DB에 있는 결제 내역의 상태를 CANCELED로 바꾸고
  useEffect(() => {
    const deleteData = async() => {
      const response = await PaymentAPI.DeletePaymentData(memberId, productId, paymentId)
      if(response.status === 200) {
        setIsChangeDB(true);
        setModalOpen(true);
      } else {
        setModalOpen(true);
      }
    }
    isKakao && deleteData();
  },[isKakao])

  const success = () => {
    return(
      <div style={modalChildren}>
        <img src={check} alt="check" width={"10%"} />
        <h1 style={fontStyle}>환불이 완료 됐습니다.</h1>
        <h1 style={fontStyle} onClick={()=>{navigate("/")}}>확인을 누르면 홈화면으로 이동합니다.</h1>
      </div>
    )
  }

  const fail = () => {
    return(
      <div style={modalChildren}>
        <img src={cancel} alt="cancel" width={"20%"} />
        <h1 style={fontStyle}>환불요청이 취소 됐습니다.</h1>
        <h1 style={fontStyle} onClick={()=>{navigate("/")}}>확인을 누르면 홈화면으로 이동합니다.</h1>
      </div>
    )
  }
  return(
    <div>
      {isCancel && isKakao && isChangeDB ? <PayModal open={modalOpen} close={closeModal} children={success()} /> :
        <PayModal open={modalOpen} close={closeModal} children={fail()} />
      }
    </div>
  )

}


export {PayReady, PayResult, PayCancel};