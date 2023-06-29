package com.example.demo.service;

import com.example.demo.dto.MemberDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MyPageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;

    // 회원 이메일로 회원정보 조회
    public List<MemberDTO> getMemberByEmail(String email) {
        List<Member> memberList = myPageRepository.findByUsername(email); // 파라미터값(?)
        List<MemberDTO> memberDTOS = new ArrayList<>();

        for (Member member : memberList) {
            MemberDTO memberDTO = new MemberDTO();
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

    //회원 닉네임 수정
    public boolean updateNickname(String email, String newNickname) {
        List<Member> members = myPageRepository.findByUsername(email);
        if (!members.isEmpty()) {
            Member member = members.get(0);
            Optional<Member> existingMemberWithNewNickname = myPageRepository.findByNickname(newNickname);
            if (!existingMemberWithNewNickname.isPresent()) {
                member.setNickname(newNickname);
                System.out.println(newNickname + "닉네임 변경@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
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

}
