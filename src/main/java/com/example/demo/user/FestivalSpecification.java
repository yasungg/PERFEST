package com.example.demo.user;

import com.example.demo.entity.Festival;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

public class FestivalSpecification {
    public static Specification<Festival> likeLocation(List<String> location) {
        return new Specification<Festival>() {
            @Override
            public Predicate toPredicate(Root<Festival> root,
                                         CriteriaQuery<?> query,
                                         CriteriaBuilder criteriaBuilder) {
//                if(location != null) {
                    String joinedLocation = String.join(",", location);
                    return criteriaBuilder.like(root.get("festivalLocation"), "%" + joinedLocation + "%");
//                }
//                else {
//                    return criteriaBuilder.isTrue(criteriaBuilder.literal(false));
//                }
            }
        };
    }

    public static Specification<Festival> betweenCreatedDatetime(Map<String, String> period) {
        return new Specification<Festival>() {
            @Override
            public Predicate toPredicate(Root<Festival> root,
                                         CriteriaQuery<?> query,
                                         CriteriaBuilder criteriaBuilder) {
                // 시작일이나 종료일이 둘 다 들어왔을 때만 로직 실행
                // 아닐 경우에는 다음 조건문 실행되도록 함
//                try {
//                    if (period != null || period.get("startDate") != null && period.get("endDate") != null) {
//                        return criteriaBuilder.isTrue(criteriaBuilder.literal(false));
//                    }
                    // 선택한 기간의 시작일과 종료일을 가져옵니다.
                    String startDateStr = period.get("startDate");
                    String endDateStr = period.get("endDate");

                    LocalDate startDate = LocalDate.parse(startDateStr);
                    LocalDate endDate = LocalDate.parse(endDateStr);

                    // LocalDateTime으로 변환 후 Timestamp로 변환합니다.
                    Timestamp startTimestamp = Timestamp.valueOf(startDate.atTime(LocalTime.MIDNIGHT));
                    Timestamp endTimestamp = Timestamp.valueOf(endDate.atTime(LocalTime.MIDNIGHT));
                    System.out.println(startTimestamp);

                    return criteriaBuilder.between(root.get("startDate"), startTimestamp, endTimestamp);
//                }
//                catch (Exception e) {
//                    return criteriaBuilder.isTrue(criteriaBuilder.literal(false));
//                }
            }
        };
    }
}
