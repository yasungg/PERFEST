package com.example.demo.controller;

import com.example.demo.dto.memberDTOs.MemberListDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.AdminService;
import com.example.demo.service.MemberService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/admin-member", method={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AdminMemberController {
    private final AdminService adminService;
    private final MemberRepository memberRepo;
    private final MemberService memberService;
    private final ObjectMapper objectMapper;

    //전체 회원정보 조회
    @GetMapping("/get-member-all")
    public ResponseEntity<Page<MemberListDTO>> getMemberAll(@RequestParam(defaultValue = "0") int pageNumber,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        log.info("get-member-all method 진입");
        return new ResponseEntity<>(memberService.getAllMembers(pageNumber, pageSize), HttpStatus.OK);
    }

    //회원 이름 검색 결과 조회
    @GetMapping("/get-member-searchresult")
    public ResponseEntity<List<MemberListDTO>> getMemberSearchResult(@NotNull @RequestParam String keyword) {
        log.info("location: admin controller/get-member-searchresult 진입!");

        List<MemberListDTO> result = memberService.memberSearchResult(keyword);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //회원 탈퇴 및 재가입을 위한 isEnabled 상태 변경
    @PutMapping(value = "/update-member-status")
    public ResponseEntity<Boolean> updateMemberStatus(@RequestBody Map<String, Object> changeSet) {
        log.info("location: admin controller / update-member-status 진입!!");
        List<Long> memberIds = new ArrayList<>();
        String tmp = changeSet.get("memberIds").toString();

        try { //받아온 회원번호 배열을 parsing
            memberIds = objectMapper.readValue(tmp, new TypeReference<List<Long>>() {});
        } catch(Exception e) {
            e.printStackTrace();
        }
        log.info("meberIds = {}", memberIds);
        return new ResponseEntity<>(memberService.changeMemberStatus(memberIds, false), HttpStatus.OK);
    }
}
