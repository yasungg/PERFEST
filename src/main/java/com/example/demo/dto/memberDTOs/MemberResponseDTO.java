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
    private String username;
    private String memberName;

    public static MemberResponseDTO of(Member member) {
        return MemberResponseDTO.builder()
                .username(member.getUsername())
                .memberName(member.getMemberName())
                .build();
    }
}
