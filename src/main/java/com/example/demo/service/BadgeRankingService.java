package com.example.demo.service;

import com.example.demo.dto.BadgeRankingDTO;
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
public class BadgeRankingService {
    private final MemberRepository memberRepository;

    public List<BadgeRankingDTO> getBadgeRankingList(){
        List<Member> memberList = memberRepository.findAllByOrderByTotalPriceDesc();
        List<BadgeRankingDTO> badgeRankingDTOS = new ArrayList<>();
        for(Member member : memberList) {
            BadgeRankingDTO badgeRankingDTO = new BadgeRankingDTO();
            badgeRankingDTO.setMemberId(member.getId());
            badgeRankingDTO.setNickname(member.getNickname());
            badgeRankingDTO.setBadges(member.getTotalPrice());
            badgeRankingDTOS.add(badgeRankingDTO);
        }
        return badgeRankingDTOS;
    }

}
