package com.example.demo.user;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.Collection;

@Component("userDetailsService")
@RequiredArgsConstructor
@Slf4j
public class PerfestUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername = {}", memberRepository.findByUsername(username));
        if(memberRepository.findByUsername(username).isPresent()) {
            Member member = memberRepository.findByUsername(username).get();
            return new PerfestUserDetails(member);
        }
        throw new UsernameNotFoundException("사용자를 찾을 수 없습니다!");
    }
}
