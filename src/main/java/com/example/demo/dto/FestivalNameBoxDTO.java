package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class FestivalNameBoxDTO {
    private String festivalName;
    private String festivalDesc;
    private long likeCount;
    private long reviewCount;

    @Builder
    public FestivalNameBoxDTO(String festivalName, String festivalDesc, long likeCount, long reviewCount) {
        this.festivalName = festivalName;
        this.festivalDesc = festivalDesc;
        this.likeCount = likeCount;
        this.reviewCount = reviewCount;
    }

}
