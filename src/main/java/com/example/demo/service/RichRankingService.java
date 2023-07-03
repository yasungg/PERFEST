package com.example.demo.service;

import com.example.demo.dto.BadgeRankingDTO;
import com.example.demo.dto.RichRankingDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        for (int i = 0; i < memberList.size(); i++) {
            Member member = memberList.get(i);
            RichRankingDTO richRankingDTO = new RichRankingDTO();
            richRankingDTO.setMemberId(member.getId());
            richRankingDTO.setNickname(member.getNickname());
            richRankingDTO.setTotalPrice(member.getTotalPrice());
            richRankingDTO.setRank(rank); // 순위 설정
            richRankingDTOS.add(richRankingDTO);

            // 다음 멤버와 비교하여 랭킹 순위 증가
            if (i + 1 < memberList.size()) {
                Member nextMember = memberList.get(i + 1);
                if (nextMember.getTotalPrice().compareTo(member.getTotalPrice()) < 0) {
                    rank++;
                }
            }
        }
            return richRankingDTOS;
        }
    }





