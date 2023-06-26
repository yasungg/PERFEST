package com.example.demo.service;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.entity.Community;
import com.example.demo.entity.Member;
import com.example.demo.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;

    // 커뮤니티 게시글 전체 조회(GET)
    public List<CommunityDTO> getCommunityList() {
        List<Community> communityList = communityRepository.findAll();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 카테고리별 조회(GET)
    public List<CommunityDTO> getCommunitySelectList(CommunityCategory communityCategory) {
        List<Community> communityList = communityRepository.findByCommunityCategory(communityCategory);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 최신순 조회(GET)
    public List<CommunityDTO> getCommunityNewestList() {
        List<Community> communityList = communityRepository.findByOrderByWrittenTimeDesc();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 본문 조회(GET)
    public List<CommunityDTO> getCommunityBoardArticle() {
        List<Community> communityList = communityRepository.findAll();
        List<CommunityDTO> communityDTOs = new ArrayList<>();
        for (Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());

            List<MemberDTO> memberDTOs = new ArrayList<>();
            Member member = community.getMember();
            if (member != null) {
                MemberDTO memberDTO = new MemberDTO();
                memberDTO.setNickName(member.getNickname());
                memberDTOs.add(memberDTO);
            }

            if (!memberDTOs.isEmpty()) {
                communityDTO.setMemberDTOs(Collections.singletonList(memberDTOs.get(0)));
            }

            communityDTOs.add(communityDTO);
        }
        return communityDTOs;
    }

    // 커뮤니티 게시글 작성(POST)
    public boolean insertCommunity(String communityTitle, CommunityCategory communityCategory, String communityDesc) {
        Community community = new Community();
        community.setCommunityTitle(communityTitle);
        community.setCommunityCategory(communityCategory);
        community.setCommunityDesc(communityDesc);
        community.setWrittenTime(LocalDateTime.now());
        communityRepository.save(community);
        return true;
    }
    // 커뮤니티 게시글 수정(POST)
    public boolean updateCommunity(Long id, String communityTitle, CommunityCategory communityCategory, String communityDesc) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            community.setCommunityTitle(communityTitle);
            community.setCommunityCategory(communityCategory);
            community.setCommunityDesc(communityDesc);
            community.setWrittenTime(LocalDateTime.now());
            communityRepository.save(community);
            return true;
        }
        return false;
    }

}
