package com.example.demo.service;

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
        List<Member> memberList = memberRepository.findAllByOrderByBadgesDesc();
        List<RichRankingDTO> richRankingDTOS = new ArrayList<>();
        for(Member member: memberList) {
            RichRankingDTO richRankingDTO = new RichRankingDTO();
            richRankingDTO.setMemberId(member.getId());
            richRankingDTO.setNickname(member.getNickname());
            richRankingDTO.setTotalPrice(member.getTotalPrice());
            richRankingDTOS.add(richRankingDTO);
        }
        return richRankingDTOS;
    }

}



