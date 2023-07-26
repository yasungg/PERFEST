package com.example.demo.controller;


import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberRepository memberRepository;
    private final ContextGetter info;
    @GetMapping("/get-name")
    ResponseEntity<String> getName() {
        Long id = info.getId();
        Member member = memberRepository.findMemberNameById(id);
        return new ResponseEntity<>(member.getMemberName(), HttpStatus.OK);
    }
}
