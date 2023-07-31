package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Community;
import com.example.demo.entity.Member;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.service.CalenderService;
import com.example.demo.service.FestivalService;
import com.example.demo.service.MyPageService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;
    private final ContextGetter info;
    private final HttpServletRequest request;
    private final TokenProvider tokenProvider;
    private final HttpServletResponse response;
    private final CalenderService calenderService;
    private final FestivalService festivalService;

    // 이메일로 회원 조회 API
    @GetMapping(value = "/email")
    public ResponseEntity<List<MemberDTO>> getMemberInfoByEmail() {
        log.info("1");
        String username = info.getUsername();
        log.info("2");
        List<MemberDTO> memberList = myPageService.getMemberByEmail(username);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }

    // 회원 닉네임 수정 API
    @PostMapping(value = "/nickname")
    public ResponseEntity<Boolean> updateNickname(@RequestBody Map<String, Object> updateData) {
        String username = info.getUsername();
//        String email = (String) updateData.get("username");
        String nickname = (String) updateData.get("nickname");
        boolean result = myPageService.updateNickname(username, nickname);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 닉네임 중복값 체크 API
    @GetMapping("/nicknameCheck")
    public ResponseEntity<Boolean> checkNicknameAvailability(@RequestParam String nickname) {
        boolean isAvailable = myPageService.isNicknameAvailable(nickname);
        tokenProvider.setNewAccessTokenToHeader(response);
        return ResponseEntity.ok(isAvailable);
    }

    // 회원 탈퇴 API
    @PostMapping(value = "/del")
    public ResponseEntity<Boolean> deleteMember(@RequestBody Map<String, Object> updateData) {
        String username = info.getUsername();
//        String email = (String) updateData.get("username");
        boolean result = myPageService.deleteMember(username);
        SecurityContextHolder.clearContext();
        request.getSession().invalidate();
        tokenProvider.setNewAccessTokenToHeader(response);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 주소 수정 API
    @PostMapping(value = "/updateAdd")
    public ResponseEntity<Boolean> updateAddress(@RequestBody Map<String, Object> updateData) {
//        String email = (String) updateData.get("username");
        String username = info.getUsername();
        String address = (String) updateData.get("address");
        boolean result = myPageService.updateAddress(username, address);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 동일 회원 주소 중복값 체크 API
//    @GetMapping("/addressCheck")
//    public ResponseEntity<Boolean> checkAddressDuplicate( @RequestParam("address") String address) {
//        String username = info.getUsername();
//        boolean isDuplicate = myPageService.isAddressAlreadyRegisteredForSelf(username, address);
//        return new ResponseEntity<>(isDuplicate, HttpStatus.OK);
//    }

    // 마이페이지 내 게시글 조회 API
    @GetMapping("/communities")
    public ResponseEntity<List<CommunityDTO>> getCommunitiesByMemberId() {
        Long memberId = info.getId();
        List<CommunityDTO> communities = myPageService.getCommunitiesByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(communities, HttpStatus.OK);
    }

    // 마이페이지에서 특정 회원의 게시글 일괄삭제 API
    @DeleteMapping("/deleteMyCommunities")
    public ResponseEntity<Boolean> deleteCommunitiesByMemberId() {
        Long memberId = info.getId();
        boolean result = myPageService.deleteCommunityPostsByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 게시글 삭제 API
    @DeleteMapping("/delCommunity")
    public ResponseEntity<Boolean> deleteCommunity(@RequestParam("communityId") Long communityId) {
        boolean result = myPageService.deleteCommunityPosts(communityId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 내 댓글 조회 API
    @GetMapping("/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByMemberId() {
        Long memberId = info.getId();
        List<CommentDTO> comments = myPageService.getCommentByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 마이페이지 내 댓글 일괄 삭제 API
    @DeleteMapping("/deleteMyComments")
    public ResponseEntity<Boolean> deleteCommentsByMemberId() {
        Long memberId = info.getId();
        boolean result = myPageService.deleteCommentPostsByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 내 댓글 선택 삭제 API
    @DeleteMapping("/delComment")
    public ResponseEntity<Boolean> deleteMyComment(@RequestParam("commentId") Long commentId) {
        boolean result = myPageService.deleteMyComment(commentId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 내 결제 조회 API
    @GetMapping("/payments")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByMemberId() {
        Long memberId = info.getId();
        List<PaymentDTO> payments = myPageService.getPaymentByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    // 회원 큰손 랭킹 조회 API
    @GetMapping("/ranking")
    public ResponseEntity<Integer> getRankingByTotalPrice() {
        Long memberId = info.getId();
        Member member = new Member();
        member.setId(memberId);


        int ranking = myPageService.getRankingByTotalPrice(member);
        tokenProvider.setNewAccessTokenToHeader(response);
        return ResponseEntity.ok(ranking);
    }

    // 회원 뱃지 랭킹 조회 API
    @GetMapping("/ranking/badges")
    public ResponseEntity<Integer> getRankingByBadges() {
        Long memberId = info.getId();
        Member member = new Member();
        member.setId(memberId);

        int ranking = myPageService.getRankingByBadges(member);
        tokenProvider.setNewAccessTokenToHeader(response);
        return ResponseEntity.ok(ranking);
    }

    // 마이페이지 내 리뷰 조회 API
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviewsByMemberId() {
        Long memberId = info.getId();
        List<ReviewDTO> reviews = myPageService.getReviewByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    // 마이페이지 내 리뷰 전체 삭제 API
    @DeleteMapping("/deleteMyReview")
    public ResponseEntity<Boolean> deleteReviewsByMemberId() {
        Long memberId = info.getId();
        boolean result = myPageService.deleteReviewPostsByMemberId(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 내 리뷰 개별 삭제
    @DeleteMapping("/delReview")
    public ResponseEntity<Boolean> deleteReviews(@RequestParam("reviewId") Long reviewId) {
        boolean result = myPageService.deleteReview(reviewId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 체험활동 예매 조회
    @GetMapping("/activities")
    public ResponseEntity<List<ActivityDTO>> getActivitiesByMemberId() {
        Long memberId = info.getId();
        List<ActivityDTO> activityDTOList = myPageService.getReservedActivitiesForMember(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(activityDTOList, HttpStatus.OK);
    }

    // 좋아요한 내 축제 일정 조회
    @GetMapping("/calender")
    public ResponseEntity<List<CalenderDTO>> getCalenderByMemberId() {
        Long memberId = info.getId();
        List<CalenderDTO> calenderDTOList = calenderService.getCalenderByUserId(memberId);
        return new ResponseEntity<>(calenderDTOList, HttpStatus.OK);
    }

    // 좋아요 한 내 축제 일정 개별 삭제
    @DeleteMapping("/delCalender")
    public ResponseEntity<Boolean> deleteCalender(@RequestParam("calenderId") Long calenderId) {
        boolean result = calenderService.deleteSelCalendar(calenderId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 좋아요한 내 축제 일정 전체 삭제
    @DeleteMapping("delAllCalender")
    public ResponseEntity<Boolean> deleteAllCalender() {
        Long memberId = info.getId();
        boolean result = calenderService.deleteAllCalendar(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 프로필 이미지 수정
    @PostMapping("/updateImg")
    public ResponseEntity<Boolean> insertProfileImage(@RequestBody Map<String, Object> updateImg) {
        Long memberId = info.getId();
        String img = (String) updateImg.get("img");
        Boolean result = myPageService.updateProfileImage(memberId, img);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 회원 프로필 이미지 가져오기
    @GetMapping("/getprofileimage")
    public ResponseEntity<String> getProfileImage() {
        Long memberId = info.getId();
        String result = myPageService.getProfileImage(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //회원 닉네임 가져오기
    @GetMapping("/getnickname")
    public ResponseEntity<String> getNickName() {
        Long memberId = info.getId();
        String result = myPageService.getNickName(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 해당 축제 내일정 추가
    @PostMapping("/addCal")
    public ResponseEntity<Boolean> addCalender(@RequestBody Map<String, Object> updateData) {
        Long memberId = info.getId();
        int festivalId = (Integer) updateData.get("festivalId");
        boolean result = festivalService.addCalender(memberId, (long)festivalId);
        tokenProvider.setNewAccessTokenToHeader(response);
        log.info(String.valueOf(festivalId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
