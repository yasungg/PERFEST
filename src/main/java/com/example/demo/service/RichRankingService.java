package com.example.demo.service;


import com.example.demo.dto.RichRankingDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RichRankingService {
    private final MemberRepository memberRepository;

    public List<RichRankingDTO> getRichRankingList() {
        List<Member> memberList = memberRepository.findAllByOrderByTotalPriceDesc();
        List<RichRankingDTO> richRankingDTOS = new ArrayList<>();

        int rank = 1; // 초기 랭킹 순위 설정
        BigDecimal previousTotalPrice = memberList.get(0).getTotalPrice(); // 첫 번째 멤버의 총 가격으로 초기화
        int previousRank = 1; // 이전 순위 초기화

        // Process only the top 10 members or until the end of the list if it has less than 10 members.
        int maxEntries = Math.min(10, memberList.size());
        for (int i = 0; i < maxEntries; i++) {
            Member member = memberList.get(i);
            RichRankingDTO richRankingDTO = new RichRankingDTO();
            richRankingDTO.setMemberId(member.getId());
            richRankingDTO.setNickname(member.getNickname());
            richRankingDTO.setTotalPrice(member.getTotalPrice());

            // 이전 멤버와의 총 가격 비교하여 랭킹 순위 결정
            if (member.getTotalPrice().compareTo(previousTotalPrice) < 0) {
                rank = previousRank + 1; // 이전 순위에서 1을 증가시킴
            }

            richRankingDTO.setRank(rank);
            richRankingDTOS.add(richRankingDTO);

            previousTotalPrice = member.getTotalPrice(); // 이전 멤버의 총 가격 업데이트
            previousRank = rank; // 이전 순위 업데이트
        }

        return richRankingDTOS;
    }
}





