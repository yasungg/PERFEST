package com.example.demo.dto.memberDTOs;

import com.example.demo.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponseDTO {
    private String mail;
    private String userName;

    public static MemberResponseDTO of(Member member) {
        return MemberResponseDTO.builder()
                .mail(member.getUsername())
                .userName(member.getMemberName())
                .build();
    }
}
