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
                System.out.println(newNickname + "닉 변경");
                myPageRepository.save(member);
                return true;
            }
        }
        return false;
    }

    // 닉네임 중복 체크(다른 회원과 중복체크)
    public boolean isNicknameAvailable(String nickname) {
        Optional<Member> checkNickname = myPageRepository.findByNickname(nickname);
        if(!checkNickname.isPresent()) {
            System.out.println("중복되지 않은 닉네임");
            return true;
        }
        return false;
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
