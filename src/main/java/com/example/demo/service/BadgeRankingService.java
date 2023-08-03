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

    public List<BadgeRankingDTO> getBadgeRankingList() {
        List<Member> memberList = memberRepository.findAllByOrderByBadgesDesc();
        List<BadgeRankingDTO> badgeRankingDTOS = new ArrayList<>();

        int rank = 1; // 초기 랭킹 순위 설정
        int previousBadges = memberList.get(0).getBadges(); // 첫 번째 멤버의 뱃지 수로 초기화
        int previousRank = 1; // 이전 순위 초기화

        // Process only the top 10 members or until the end of the list if it has less than 10 members.
        int maxEntries = Math.min(10, memberList.size());
        for (int i = 0; i < maxEntries; i++) {
            Member member = memberList.get(i);
            BadgeRankingDTO badgeRankingDTO = new BadgeRankingDTO();
            badgeRankingDTO.setMemberId(member.getId());
            badgeRankingDTO.setNickname(member.getNickname());
            badgeRankingDTO.setBadges(member.getBadges());

            if (member.getBadges() < previousBadges) { // 현재 멤버의 뱃지수가 이전 멤버의 뱃지수 보다 작을 경우만 랭킹 순위 업데이트
                rank = previousRank + 1; // 이전 순위에서 1을 증가시킴
            }

            badgeRankingDTO.setRank(rank);
            badgeRankingDTOS.add(badgeRankingDTO);

            previousBadges = member.getBadges(); // 이전 멤버의 뱃지 수 업데이트
            previousRank = rank; // 이전 순위 업데이트
        }

        return badgeRankingDTOS;
    }

}

