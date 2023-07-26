package com.example.demo.user;

import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class PerfestUserDetails implements UserDetails {

    private final Member user;
    public PerfestUserDetails(Member member) {
        this.user = member;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        switch(user.getAuthority()) {
            case ROLE_USER: GrantedAuthority userAuthority = new SimpleGrantedAuthority(Authority.ROLE_USER.name());
                return Collections.singleton(userAuthority);
            case ROLE_KAKAO: GrantedAuthority kakaoAuthority = new SimpleGrantedAuthority(Authority.ROLE_KAKAO.name());
                return Collections.singleton(kakaoAuthority);
            case ROLE_ADMIN: GrantedAuthority adminAuthority = new SimpleGrantedAuthority(Authority.ROLE_ADMIN.name());
                return Collections.singleton(adminAuthority);
        }
        return Collections.emptyList();
    }
    @Override
    public String getPassword() {
        return user.getPassword();
    }
    @Override
    public String getUsername() {
        return user.getUsername();
    }
    public Long getId() { return user.getId(); }
    public String getNickname() { return user.getNickname(); }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}
