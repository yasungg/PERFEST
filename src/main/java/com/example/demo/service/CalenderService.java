package com.example.demo.service;

import com.example.demo.dto.CalenderDTO;
import com.example.demo.dto.FestivalDTO;
import com.example.demo.entity.Calender;
import com.example.demo.entity.Festival;
import com.example.demo.entity.Member;
import com.example.demo.repository.CalenderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CalenderService {

    private final CalenderRepository calenderRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // 회원 아이디로 캘린더 일정 조회
    public List<CalenderDTO> getCalenderByUserId(Long memberId) {
        List<Calender> calenderList = calenderRepository.findByMemberId(memberId);
        List<CalenderDTO> calenderDTOS = new ArrayList<>();

        for (Calender calender : calenderList) {
            CalenderDTO calenderDTO = new CalenderDTO();
            calenderDTO.setId(calender.getId());

            Festival festival = calender.getFestival();
            if (festival != null) {
                calenderDTO.setId(calender.getId());
                calenderDTO.setFestivalName(festival.getFestivalName());
                calenderDTO.setStartDate(festival.getStartDate());
                calenderDTO.setEndDate(festival.getEndDate());
            }

            calenderDTO.setLikeDate(calender.getLikedDate());
            calenderDTOS.add(calenderDTO);
        }
        return calenderDTOS;
    }

    // 선택한 일정 삭제
    @Transactional
    public boolean deleteSelCalendar(Long calendarId) {
        Optional<Calender> calendar = calenderRepository.findById(calendarId);
        if (calendar.isPresent()) {
            calenderRepository.delete(calendar.get());
            log.info("캘린더 삭제 완료");
            return true;
        } else {
            log.info("해당 일정 없음");
            return false;
        }
    }
    // 전체 일정 삭제
    @Transactional
    public boolean deleteAllCalendar(Long memberId) {
        List<Calender> calendarList = calenderRepository.findByMemberId(memberId);
        if (!calendarList.isEmpty()) {
            calenderRepository.deleteAll(calendarList);
            log.info("일정 전체 삭제 완료");
            return true;
        } else {
            return false;
        }
    }
}
