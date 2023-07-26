package com.example.demo.dto.memberDTOs;


import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.*;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberListDTO {
    private Long id;
    private String username;
    private boolean isEnabled;
    private String memberName;
    private String nickname;
    private int badges;
    private BigDecimal totalPrice;
    private LocalDateTime joinTime;
    private String address;
    private Authority authority;

    public MemberListDTO(Long id, int badges, boolean isEnabled, String username, String nickname, BigDecimal totalPrice, String memberName, LocalDateTime joinTime, String address, Authority authority) {
        this.id = id;
        this.badges = badges;
        this.isEnabled = isEnabled;
        this.username = username;
        this.nickname = nickname;
        this.totalPrice = totalPrice;
        this.memberName = memberName;
        this.joinTime = joinTime;
        this.address = address;
        this.authority = authority;
    }
    public static MemberListDTO in(Member member) {
        return MemberListDTO.builder()
                .username(member.getUsername())
                .memberName(member.getMemberName())
                .nickname(member.getNickname())
                .badges(member.getBadges())
                .totalPrice(member.getTotalPrice())
                .joinTime(member.getJoinTime())
                .authority(member.getAuthority())
                .build();
    }
}
