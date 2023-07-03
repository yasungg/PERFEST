package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Community;
import com.example.demo.entity.Member;
import com.example.demo.entity.Payment;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.CommunityRepository;
import com.example.demo.repository.MyPageRepository;
import com.example.demo.repository.PaymentRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;
    private final PaymentRepository paymentRepository;
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
        return true;
    }

    // 회원 탈퇴
    @Transactional
    public boolean deleteMember(String email) {
        List<Member> memberList = myPageRepository.findByUsername(email);
        if(memberList.isEmpty()) {
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
        if(memberList.isEmpty()) {
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
        for(Community community : communityList) {
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
            if(payment.getMember() != null) {
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
        for(Comment comment : commentList) {
            commentRepository.delete(comment);
        }
        return true;
    }

    // totalPrice 기준으로 회원 큰손랭킹 조회
    public List<Member> getMemberPayRanking() {
        String query = "SELECT m, " +
                "(SELECT COUNT(*) FROM Member m2 WHERE m2.totalPrice >= m.totalPrice) AS rank " +
                "FROM Member m ORDER BY m.totalPrice DESC";

        return entityManager.createQuery(query, Member.class)
                .getResultList();
    }

    // badge 개수 기준으로 회원 뱃지랭킹 조회
    public List<Member> getMemberBadgeRanking() {
        String query = "SELECT m, " +
                "(SELECT COUNT(*) FROM MEMBER m2 where m2.badges >= m.badges) AS rank " +
                "FROM MEMBER m ORDER BY m.badges DESC";

        return entityManager.createQuery(query, Member.class)
                .getResultList();
    }

}
