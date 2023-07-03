package com.example.demo.service;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    public boolean insertPaymentInfo(Long MemberId, Long productId, int price, int quantity, String tid, int tax_free_amount, PaymentStatus payStatus) {
        Payment payment = new Payment();

        Optional<Member> optionalMember = memberRepository.findById(MemberId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        try {
            Member member = new Member();
            Product product = new Product();
            if (optionalMember.isPresent()) {
                member.setId(MemberId);
                System.out.println("member:"+member);
            } else return false;
            if (optionalProduct.isPresent()) {
                product.setId(productId);
                System.out.println("product" + product);
            } else return false;

            payment.setId(member.getId());
            payment.setProduct(product);

            payment.setPrice(price);
            payment.setQuantity(quantity);
            payment.setTidKey(tid);
            payment.setTaxFreeAmount(tax_free_amount);
            payment.setPaymentStatus(payStatus);
            payment.setCreateDate(LocalDateTime.now());
            payment.setPaymentStatus(payStatus);

            paymentRepository.save(payment);
            return true;
        } catch (Exception e) {
            System.out.println(e);
        }

        return false;
    }
}
