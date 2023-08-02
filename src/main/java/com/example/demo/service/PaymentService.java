package com.example.demo.service;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.dto.PaymentResponseDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
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
    public Boolean insertPaymentInfo(Long memberId, Long productId, int price, int quantity, String tid, int tax_free_amount, PaymentStatus payStatus) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalMember.isPresent() && optionalProduct.isPresent()) {
            Member member = optionalMember.get();
            Product product = optionalProduct.get();

            try {
                BigDecimal totalPrice = member.getTotalPrice();
                BigDecimal parsePrice = new BigDecimal(price);
                member.setTotalPrice(totalPrice.add(parsePrice));

                Payment payment = new Payment();
                payment.setMember(member);
                payment.setProduct(product);
                payment.setPrice(price);
                payment.setQuantity(quantity);
                payment.setTidKey(tid);
                payment.setTaxFreeAmount(tax_free_amount);
                payment.setPaymentStatus(payStatus);
                payment.setCreateDate(LocalDateTime.now());
                payment.setPaymentStatus(payStatus);

                memberRepository.save(member);
                paymentRepository.save(payment);

                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    // 결제 취소를 하기 위해 해당 상품 결제 내역 검색(GET)
    public List<PaymentDTO> checkPaymentInfo(Long memberId, Long productId) {
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

    // 카카오페이 결제 취소가 성공된 경우 DB에 저장 된 결제 내역의 결제 상태를 CANCEL 로 변경
    public boolean deletePaymentInfo(Long memberId, Long productId, Long paymentId) {
        Optional<Payment> optionalPayment = paymentRepository.findByMemberIdAndProductIdAndId(memberId, productId, paymentId);
        Optional<Member> optionalMember = memberRepository.findById(memberId);

            if (optionalPayment.isPresent() && optionalMember.isPresent()) {
                Payment payment = optionalPayment.get();
                Member member = optionalMember.get();

                payment.setPaymentStatus(PaymentStatus.CANCELLED);
                payment.setCancelDate(LocalDateTime.now());

                BigDecimal totalPrice = member.getTotalPrice();
                BigDecimal parsePrice = new BigDecimal(optionalPayment.get().getPrice());
                BigDecimal subPrice = totalPrice.subtract(parsePrice);
                member.setTotalPrice(subPrice);

                memberRepository.save(member);
                paymentRepository.save(payment);
                return true;
            }
            else return false;
    }

    public List<PaymentResponseDTO> findPaymentMemberInfo(Long memberId, Long productId) {
        Optional<Member> memberList = memberRepository.findById(memberId);
        Optional<Product> productList = productRepository.findById(productId);
        Optional<Payment> paymentList = paymentRepository.findByMemberIdAndProductId(memberId, productId);
        List<PaymentResponseDTO> paymentDTOList = new ArrayList<>();
        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        if(memberList.isPresent() && productList.isPresent()) {
            Member member = memberList.get();
            Product product = productList.get();
            Payment payment = paymentList.get();
            paymentResponseDTO.setProductName(product.getProductName());
            paymentResponseDTO.setTotalPrice(member.getTotalPrice());
            paymentResponseDTO.setProductPrice(product.getProductPrice());
            paymentResponseDTO.setQuantity(payment.getQuantity());

            paymentDTOList.add(paymentResponseDTO);
            return paymentDTOList;
        }
        throw new RuntimeException("없는 정보 입니다.");
    }
}
