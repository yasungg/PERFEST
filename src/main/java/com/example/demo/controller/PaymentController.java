package com.example.demo.controller;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.entity.Payment;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequestMapping("/auth/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final TokenProvider tokenProvider;
    private final HttpServletResponse response;

    @PostMapping(value = "/regist")
    public ResponseEntity<Boolean> registPayment(@RequestBody Map<String, Object> paymentData) {
//        tokenProvider.setNewAccessTokenToHeader(response);
        System.out.println("registPayment 메소드 실행");
        int memberId = (int) paymentData.get("memberId");
        int productId = (int) paymentData.get("productId");
        int price = (int) paymentData.get("price");
        int quantity = (int) paymentData.get("quantity");
        String tid = paymentData.get("tid").toString();
        System.out.println("tid값 : " + tid);
        int tax_free_amount = (int) paymentData.get("tax_free");


        boolean result = paymentService.insertPaymentInfo((long)memberId, (long)productId, price, quantity, tid, tax_free_amount, PaymentStatus.PAID);
        System.out.println("registPayment 메소드 실행 결과 : " + result);
        System.out.println("memberId:"+ memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/checkPaymentData")
    public ResponseEntity<List<PaymentDTO>> checkPaymentData(@RequestParam int memberId, int productId) {
//        tokenProvider.setNewAccessTokenToHeader(response);
        System.out.println("checkPaymentData 메소드 실행");
        List<PaymentDTO> list = paymentService.checkPaymentInfo((long) memberId, (long) productId);
        System.out.println("checkPaymentInfo 실행결과 : ");
        for(PaymentDTO paymentDTO : list) System.out.println(paymentDTO);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
