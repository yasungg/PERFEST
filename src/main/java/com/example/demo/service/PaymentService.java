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
import java.util.ArrayList;
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

    // 카카오페이 결제 완료시 DB에 넣을 정보(POST)
    public boolean insertPaymentInfo(Long memberId, Long productId, int price, int quantity, String tid, int tax_free_amount, PaymentStatus payStatus) {
        Payment payment = new Payment();

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        try {
            Member member = new Member();
            Product product = new Product();
            if (optionalMember.isPresent() && optionalProduct.isPresent()) {
                member.setId(memberId);
                System.out.println("member:"+member);
                product.setId(productId);
                System.out.println("product" + product);
            } else return false;

            payment.setMember(member);
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

    // 결제 취소를 하기 위해 해당 상품 결제 내역 검색(GET)
    public List<PaymentDTO> checkPaymentInfo(Long memberId, Long productId) {
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        Optional<Product> optionalProduct = productRepository.findById(productId);

        Optional<Payment> optionalPayment = paymentRepository.findByMemberIdAndProductId(memberId, productId);
        List<PaymentDTO> paymentDTOList = new ArrayList<>();
        PaymentDTO paymentDTO = new PaymentDTO();
        if(optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            paymentDTO.setPaymentId(payment.getId());
            paymentDTO.setPrice(payment.getPrice());
            paymentDTO.setQuantity(payment.getQuantity());
            paymentDTO.setTid(payment.getTidKey());
            paymentDTO.setTax_free_amount(payment.getTaxFreeAmount());
            paymentDTO.setPaymentStatus(payment.getPaymentStatus().toString());

            paymentDTOList.add(paymentDTO);
        }

        return paymentDTOList;
    }
}
