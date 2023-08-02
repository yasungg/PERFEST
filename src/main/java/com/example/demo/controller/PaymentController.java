package com.example.demo.controller;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.dto.PaymentResponseDTO;
import com.example.demo.entity.Festival;
import com.example.demo.entity.Member;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Product;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.MemberService;
import com.example.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/auth/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class PaymentController {
    private final PaymentService paymentService;
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final HttpServletResponse response;

    @PostMapping(value = "/regist")
    public ResponseEntity<List<PaymentResponseDTO>> registPayment(@RequestBody Map<String, Object> paymentData) {
//        tokenProvider.setNewAccessTokenToHeader(response);
        int memberId = (int) paymentData.get("memberId");
        int productId = (int) paymentData.get("productId");
        int price = (int) paymentData.get("price");
        int quantity = (int) paymentData.get("quantity");
        String tid = paymentData.get("tid").toString();
        int tax_free_amount = (int) paymentData.get("tax_free");
        try {
            Boolean result = paymentService.insertPaymentInfo((long)memberId, (long)productId, price, quantity, tid, tax_free_amount, PaymentStatus.PAID);
            if(result) {
                List<PaymentResponseDTO> responseDTOS = paymentService.findPaymentMemberInfo((long)memberId, (long)productId);
                return new ResponseEntity<>(responseDTOS, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new RuntimeException("올바른 경로가 아닙니다.");
    }

    @GetMapping(value = "/checkPaymentData")
    public ResponseEntity<List<PaymentDTO>> checkPaymentData(@RequestParam int memberId, int productId) {
//        tokenProvider.setNewAccessTokenToHeader(response);
        List<PaymentDTO> list = paymentService.checkPaymentInfo((long) memberId, (long) productId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value = "/deletePaymentData")
    public ResponseEntity<Boolean> deletePaymentData(@RequestBody Map<String, Object> paymentData) {
//        tokenProvider.setNewAccessTokenToHeader(response);
        int memberId = (int) paymentData.get("memberId");
        int productId = (int) paymentData.get("productId");
        int paymentId = (int) paymentData.get("paymentId");

        boolean result = paymentService.deletePaymentInfo((long) memberId, (long) productId, (long)paymentId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
