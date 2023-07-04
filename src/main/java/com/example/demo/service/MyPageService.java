package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    @PersistenceContext
    private EntityManager entityManager;

    // 회원 이메일로 회원정보 조회
    public List<MemberDTO> getMemberByEmail(String email) {
        List<Member> memberList = myPageRepository.findByUsername(email); // 파라미터값(?)
        List<MemberDTO> memberDTOS = new ArrayList<>();

        for (Member member : memberList) {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setId(member.getId()); // 회원식별자
            memberDTO.setEmail(member.getUsername()); // 이메일;
            memberDTO.setMemberName(member.getMemberName()); // 이름
            memberDTO.setNickName(member.getNickname());
            memberDTO.setAddress(member.getAddress()); // 주소
            memberDTO.setImg(member.getImg());
            memberDTO.setBadges(member.getBadges());
            memberDTO.setTotalPrice(member.getTotalPrice());
            memberDTO.setIsDelete(member.getIsDelete());

            memberDTOS.add(memberDTO);
        }
        return memberDTOS;
    }

    // 욕설 또는 비속어 필터링 기능
    public boolean containsProfanity(String text) {
        String profanityPattern = "(븅신|개새끼|병신|씨발|바보|멍청이)";
        return text.matches(".*(" + profanityPattern + ").*");
    }


    // 회원 닉네임 수정
    public boolean updateNickname(String email, String newNickname) {
        List<Member> members = myPageRepository.findByUsername(email);
        if (!members.isEmpty()) {
            Member member = members.get(0);
            Optional<Member> existingMemberWithNewNickname = myPageRepository.findByNickname(newNickname);
            if (!existingMemberWithNewNickname.isPresent()) {
                if (containsProfanity(newNickname)) {
                    // 닉네임에 욕설 또는 비속어가 포함되어 있는 경우
                    return false;
                }
                member.setNickname(newNickname);
                log.info(newNickname + " => 로 닉네임 변경완료");
                myPageRepository.save(member);
                return true;
            }
        }
        return false;
    }

    // 닉네임 중복 체크
    public boolean isNicknameAvailable(String nickname) {
        // 대소문자를 구분하지 않기 위해 닉네임을 소문자로 변환
        String lowercaseNickname = nickname.toLowerCase();
        // 동일한 닉네임을 가진 다른 회원을 조회
        Optional<Member> existingMember = myPageRepository.findByNickname(lowercaseNickname);
        // 동일 닉네임이 있는 경우에는 중복된 닉네임이 있다고 판단하여 false 를 반환
        if (existingMember.isPresent()) {
            System.out.println("닉네임 중복");
            return false;
        }
        // 동일 닉네임이 없는 경우에는 중복된 닉네임이 없다고 판단하여 true 를 반환
        log.info("동일 닉네임이 없음");
        return true;
    }

    // 회원 탈퇴
    @Transactional
    public boolean deleteMember(String email) {
        List<Member> memberList = myPageRepository.findByUsername(email);
        if (memberList.isEmpty()) {
            throw new IllegalArgumentException("회원 없음");
        }
        Member member = memberList.get(0);
        member.setIsDelete("Y");
        myPageRepository.save(member);
        return true;
    }

    // 회원 주소 수정
    public boolean updateAddress(String email, String address) {
        List<Member> memberList = myPageRepository.findByUsername(email);
        if (memberList.isEmpty()) {
            throw new IllegalArgumentException("회원 없음");
        }
        Member member = memberList.get(0);
        member.setAddress(address);
        myPageRepository.save(member);
        return true;
    }

    // 주소 유효성 체크
    public boolean isValidAddress(String address) {
        // 어떻게 로직을 구성할지 고민중..

        return true;
    }


    // 동일 주소 중복값 체크(동일한 주소인 경우 false 반환)
    public boolean isAddressAlreadyRegisteredForSelf(String email, String newAddress) {
        List<Member> memberList = myPageRepository.findByUsername(email);
        if (!memberList.isEmpty()) {
            Member member = memberList.get(0);
            String currentAddress = member.getAddress();
            return !currentAddress.equals(newAddress);
        }
        return true; // 회원이 존재하지 않을 때도 true 로 처리
    }

    // 마이페이지 내 게시글 조회
    public List<CommunityDTO> getCommunitiesByMemberId(Long memberId) {
        List<Community> communityList = communityRepository.findByMemberId(memberId);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for (Community community : communityList) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setCommunityId(community.getId());
            communityDTO.setMemberId(community.getMember().getId());
            communityDTO.setCommunityCategory(String.valueOf(community.getCommunityCategory()));
            communityDTO.setCommunityDesc(community.getCommunityDesc());
            communityDTO.setCommunityTitle(community.getCommunityTitle());
            communityDTO.setCommunityImgLink(community.getCommunityImgLink());
            communityDTO.setLikeCount(community.getLikeCount());
            communityDTO.setWrittenTime(community.getWrittenTime());

            communityDTOS.add(communityDTO);
        }
        return communityDTOS;
    }

    // 마이페이지 내 게시글 삭제
    @Transactional
    public boolean deleteCommunityPostsByMemberId(Long memberId) {
        List<Community> communityList = communityRepository.findByMemberId(memberId);
        for (Community community : communityList) {
            communityRepository.delete(community);
        }
        log.info("내 게시글 삭제 완료");
        return true;
    }

    // 마이페이지 내 댓글 조회
    public List<CommentDTO> getCommentByMemberId(Long memberId) {
        List<Comment> commentList = commentRepository.findByMemberId(memberId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for (Comment comment : commentList) {
            if (comment.getMember() != null && comment.getCommunity() != null) {
                CommentDTO commentDTO = new CommentDTO();
                commentDTO.setCommentId(comment.getId());
                commentDTO.setMemberId(comment.getMember().getId());
                commentDTO.setCommunityId(comment.getCommunity().getId());
                commentDTO.setCommentBody(comment.getCommentBody());
                commentDTO.setCommentWrittenTime(comment.getCommentWrittenTime());
                commentDTO.setCommentLikeCount(comment.getCommentLikeCount());

                commentDTOS.add(commentDTO);
            }
        }
        return commentDTOS;
    }

    //마이페이지 내 결제 조회
    public List<PaymentDTO> getPaymentByMemberId(Long memberId) {
        List<Payment> paymentList = paymentRepository.findByMemberId(memberId);
        List<PaymentDTO> paymentDTOS = new ArrayList<>();
        for (Payment payment : paymentList) {
            if (payment.getMember() != null) {
                PaymentDTO paymentDTO = new PaymentDTO();
                paymentDTO.setPaymentId(payment.getId());
                paymentDTO.setMemberId(payment.getMember().getId());
                paymentDTO.setPrice(payment.getPrice());
                paymentDTO.setProductId(payment.getProduct().getId());
                paymentDTO.setTid(payment.getTidKey());
                paymentDTO.setQuantity(payment.getQuantity());
                paymentDTO.setCreate_date(payment.getCreateDate());
                paymentDTO.setPaymentStatus(String.valueOf(payment.getPaymentStatus()));


                paymentDTOS.add(paymentDTO);
            }
        }
        return paymentDTOS;
    }


    // 마이페이지 내 댓글 삭제
    @Transactional
    public boolean deleteCommentPostsByMemberId(Long memberId) {
        List<Comment> commentList = commentRepository.findByMemberId(memberId);
        for (Comment comment : commentList) {
            commentRepository.delete(comment);
        }
        log.info("내 댓글삭제 완료 확인");
        return true;
    }

    // 전체 회원 큰손 랭킹 조회(totalPrice 를 기준으로 순위 조회)
    public int getRankingByTotalPrice(Member member) {
        List<Member> allMembers = myPageRepository.findAll();
        // totalPrice 를 기준으로 내림차순으로 정렬
        Collections.sort(allMembers, (m1, m2) -> m2.getTotalPrice().compareTo(m1.getTotalPrice()));

        int myRichRank = 0;
        for (int i = 0; i < allMembers.size(); i++) {
            if (allMembers.get(i).getId().equals(member.getId())) {
                myRichRank = i + 1; // 0-based index 를 1-based 순위로 변환
                break;
            }
        }
        log.info("내 큰손랭킹은 " + myRichRank + "등 입니다.");
        return myRichRank;
    }

    // 내 뱃지 랭킹 조회 (badges 를 기준으로 순위 조회)
    public int getRankingByBadges(Member member) {
        List<Member> allMembers = myPageRepository.findAll();
        // badges 를 기준으로 내림차순으로 정렬
        Collections.sort(allMembers, (m1, m2) -> m2.getBadges() - m1.getBadges());

        int myBadgesRank = 0;
        for (int i = 0; i < allMembers.size(); i++) {
            if (allMembers.get(i).getId().equals(member.getId())) {
                myBadgesRank = i + 1; // 0-based index 를 1-based 순위로 변환
                break;
            }
        }
        log.info("내 뱃지랭킹은 " + myBadgesRank + "등 입니다.");
        return myBadgesRank;
    }

    // 리뷰 조회
    public List<ReviewDTO> getReviewByMemberId(Long memberId) {
        List<Review> reviewList = reviewRepository.findByMemberId(memberId);
        List<ReviewDTO> reviewDTOS = new ArrayList<>();
        for (Review review : reviewList) {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReviewId(review.getId());
            reviewDTO.setMemberId(reviewDTO.getMemberId());
            reviewDTO.setReviewImg(review.getReviewImg());
            reviewDTO.setReviewTitle(review.getReviewTitle());
            reviewDTO.setReviewContent(review.getReviewContent());
            reviewDTO.setReviewWrittenTime(review.getReviewWrittenTime());

            reviewDTOS.add(reviewDTO);
        }
        return reviewDTOS;
    }

    // 마이페이지 내 리뷰 삭제
    @Transactional
    public boolean deleteReviewPostsByMemberId(Long memberId) {
        List<Review> reviewList = reviewRepository.findByMemberId(memberId);
        for(Review review : reviewList) {
            reviewRepository.delete(review);
        }
        log.info("내 리뷰 삭제 완료");
        return true;
    }


}
