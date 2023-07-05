package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class NoticeDTO {
    private Long id;
    private String contents;
    private LocalDateTime created;
}
