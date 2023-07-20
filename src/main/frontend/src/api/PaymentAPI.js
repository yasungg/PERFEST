import axios from "axios";

const PaymentAPI = {
  // 결제 완료 시 DB에 정보 저장하기 위한 메소드
  PaymentSubmit: async(memberid, productId, price, quantity, tid, kakaoTaxFreeAmount) => {
    const info = {
      memberId: memberid,
      productId: productId,
      price: price,
      quantity: quantity,
      tid: tid,
      tax_free: kakaoTaxFreeAmount
    };
    return await axios.post("/auth/payment/regist", info);
  },

  // 결제 취소 시 사용자가 결제한 결제 정보가 있는지 DB에 가서 확인
  CheckPaymentData: async(memberId, productId) => {
   return await axios.get(`/auth/payment/checkPaymentData?memberId=${memberId}&productId=${productId}`);
  },

  // 카카오페이 api 결제 완료 시 DB에 있는 결제 정보를 삭제
  DeletePaymentData: async(memberId, productId, paymentId) => {
    const info = {
      memberId: memberId,
      productId: productId,
      paymentId: paymentId
    };
    return await axios.post(`/auth/payment/checkPaymentData?memberId=${memberId}&productId=${productId}&paymentId=${paymentId}`, info)
  }
}


export default PaymentAPI;