package com.example.demo.service;

import com.example.demo.dto.RichRankingDTO;
import com.example.demo.entity.Member;
import com.example.demo.entity.RichRanking;
import com.example.demo.repository.RichRankingRepository;
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
    private final RichRankingRepository richRankingRepository;

    // 큰손 랭킹 가져오기(GET)
    public List<RichRankingDTO> getRichRankingList() {
        List<RichRanking> richRankingList = richRankingRepository.findAllByOrderByMemberTotalPriceAsc();
        List<RichRankingDTO> richRankingDTOS = new ArrayList<>();
        for (RichRanking richRanking : richRankingList) {
            RichRankingDTO richRankingDTO = new RichRankingDTO();
            richRankingDTO.setRichRank(richRanking.getRichRank());

            Member member = richRanking.getMember();
            if (member != null) {
                richRankingDTO.setNickName(member.getNickname());
            }

            richRankingDTOS.add(richRankingDTO);
        }
        return richRankingDTOS;
    }

}
