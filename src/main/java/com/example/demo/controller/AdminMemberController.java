package com.example.demo.controller;

import com.example.demo.dto.memberDTOs.MemberListDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.AdminService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/admin-member")
public class AdminMemberController {
    private final AdminService adminService;
    private final MemberRepository memberRepo;
    private final MemberService memberService;

    @GetMapping("/get-member-all")
    public ResponseEntity<Page<MemberListDTO>> getMemberAll(@RequestParam(defaultValue = "0") int pageNumber,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        log.info("get-member-all method 진입");
        return new ResponseEntity<>(memberService.getAllMembers(pageNumber, pageSize), HttpStatus.OK);
    }
//    @GetMapping("/get-member-sortedby")
//    public ResponseEntity<Page<Member>> getMemberSoretedBy(@RequestParam(defaultValue = "0") int pageNumber,
//                                                           @RequestParam(defaultValue = "10") int pageSize, String)
}
