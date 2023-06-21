package com.example.demo.service;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.entity.Community;
import com.example.demo.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
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
}
