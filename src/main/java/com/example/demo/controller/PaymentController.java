package com.example.demo.controller;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping(value = "/regist")
    public ResponseEntity<Boolean> registPayment(@RequestBody Map<String, Object> paymentData) {
        System.out.println("registPayment 메소드 실행");
        Long MemberId = (Long) paymentData.get("member_Id");
        Long productId = (Long) paymentData.get("product_Id");
        int price = (int) paymentData.get("price");
        int quantity = (int) paymentData.get("quantity");
        String tid = (String) paymentData.get("tid");
        int tax_free_amount = (int) paymentData.get("tax_free");

        boolean result = paymentService.insertPaymentInfo(MemberId, productId, price, quantity, tid, tax_free_amount, PaymentStatus.PAID);
        System.out.println("registPayment 메소드 실행 결과 : " + result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
