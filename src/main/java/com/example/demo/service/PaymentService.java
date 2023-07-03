package com.example.demo.service;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.entity.Member;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Product;
import com.example.demo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public boolean insertPaymentInfo(Long MemberId, Long productId, int price, int quantity, String tid, int tax_free_amount, PaymentStatus payStatus) {
        Payment payment = new Payment();

//        Member member = new Member();
//        member.setId(MemberId);
//        payment.setMember(member);
//
//        Product product = new Product();
//        product.setId(productId);
//        payment.setProduct(product);

        payment.setPrice(price);
        payment.setQuantity(quantity);
        payment.setTidKey(tid);
        payment.setTaxFreeAmount(tax_free_amount);
        payment.setPaymentStatus(payStatus);
        payment.setCreateDate(LocalDateTime.now());
        payment.setPaymentStatus(payStatus);

        paymentRepository.save(payment);
        return true;
    }
}
