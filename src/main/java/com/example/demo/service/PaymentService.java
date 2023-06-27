package com.example.demo.service;

import com.example.demo.dto.PaymentDTO;
import com.example.demo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public boolean insertPaymentInfo(int userId, int price, int quantity, String tid, int tax_free_amount) {


        return true;
    }
}
