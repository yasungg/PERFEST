package com.example.demo.service;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.entity.Community;
import com.example.demo.entity.Member;
import com.example.demo.repository.CommunityRepository;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    // 커뮤니티 게시글 전체 조회(GET)
    public List<CommunityDTO> getCommunityList() {
        List<Community> communitys = communityRepository.findAll();
        List<CommunityDTO> communityDTOS = new ArrayList<>();

        for(Community community : communitys) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());

            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
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
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 최신순 조회(GET)
    public List<CommunityDTO> getCommunityNewestList(CommunityCategory communityCategory) {
        List<Community> communityList = communityRepository.findByCommunityCategoryOrderByWrittenTimeDesc(communityCategory);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 인기순 조회(GET)
    public List<CommunityDTO> getCommunityLikestList(CommunityCategory communityCategory) {
        List<Community> communityList = communityRepository.findByCommunityCategoryOrderByLikeCountDesc(communityCategory);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 최신순 조회(GET)
    public List<CommunityDTO> getCommunityAllNewestList() {
        List<Community> communityList = communityRepository.findAllByOrderByWrittenTimeDesc();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 인기순 조회(GET)
    public List<CommunityDTO> getCommunityAllLikestList() {
        List<Community> communityList = communityRepository.findAllByOrderByLikeCountDesc();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 커뮤니티 게시글 본문 조회(GET)
    public List<CommunityDTO> getCommunityBoardArticle(Long communityId) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        CommunityDTO communityDTO = new CommunityDTO();
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }

    // 커뮤니티 게시글 좋아요 누르면 좋아요 +1(POST)
    public boolean insertHeart(Long communityId) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            int currentLikeCount = community.getLikeCount();
            community.setLikeCount(currentLikeCount + 1);
            communityRepository.save(community);
            return true;
        }
        return false;
    }

    // 커뮤니티 게시글 작성(POST)
    public boolean insertCommunity(String communityTitle, CommunityCategory communityCategory, String communityDesc, Long memberId, String communityImg) {
        Community community = new Community();
        community.setCommunityTitle(communityTitle);
        community.setCommunityCategory(communityCategory);
        community.setCommunityDesc(communityDesc);
        community.setWrittenTime(LocalDateTime.now());
        community.setCommunityImgLink(communityImg);

        Member member = new Member();
        member.setId(memberId);
        community.setMember(member);

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
    // 게시판 게시글 제목 검색(GET)
    public List<CommunityDTO> getCommunityBoardTitle(String communityTitle) {
        List<Community> communityList = communityRepository.findByCommunityTitleContaining(communityTitle);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for(Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityId(community.getId());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());
            Member member = community.getMember();
            if (member != null) {
                communityDTO.setNickname(member.getNickname());
            }
            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }
    // 게시판 닉네임으로 검색
    public List<CommunityDTO> getCommunityByNickName(String nickname) {
        List<Community> communityList = communityRepository.findAll();
        List<CommunityDTO> communityDTOs = new ArrayList<>();

        for (Community community : communityList) {
            Member member = community.getMember();
            if (member.getNickname().contains(nickname)) {
                CommunityDTO communityDTO = new CommunityDTO();
                communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
                communityDTO.setCommunityId(community.getId());
                communityDTO.setCommunityTitle(community.getCommunityTitle());
                communityDTO.setCommunityDesc(community.getCommunityDesc());
                communityDTO.setCommunityImgLink(community.getCommunityImgLink());
                communityDTO.setLikeCount(community.getLikeCount());
                communityDTO.setWrittenTime(community.getWrittenTime());
                communityDTO.setNickname(member.getNickname());
                communityDTOs.add(communityDTO);
            }
        }
        return communityDTOs;
    }

//    // insert Dummy Data service for Community
//    public Community createPost(CommunityDTO request){
//        Member member = memberRepository.findById(request.getMemberId())
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저 없음"));
//        CommunityDTO communityDTO = new CommunityDTO();
//        communityDTO.setCommunityTitle(request.getCommunityTitle());
//        communityDTO.setCommunityCategory(request.getCommunityCategory());
//        communityDTO.setCommunityDesc(request.getCommunityDesc());
//        communityDTO.setLikeCount(request.getLikeCount());
//        communityDTO.setCommunityImgLink(request.getCommunityImgLink());
//
//        Community community = communityDTO.toEn
//
//    }
}


