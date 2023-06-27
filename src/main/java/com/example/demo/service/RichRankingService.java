package com.example.demo.service;

import com.example.demo.dto.RichRankingDTO;
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

    public List<RichRankingDTO> getRichRankingList() {
        List<RichRanking> richRankingList = richRankingRepository.findAllByOrderByRichRankDesc();
        List<RichRankingDTO> richRankingDTOS = new ArrayList<>();
        for(RichRanking richRanking : richRankingList) {
            RichRankingDTO richRankingDTO = new RichRankingDTO();
            richRankingDTO.setRichRank(richRanking.getRichRank());
            richRankingDTOS.add(richRankingDTO);
        }
        return richRankingDTOS;
    }
}
