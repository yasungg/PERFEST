package com.example.demo.service;

import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor

public class CommentService {
    private final CommentRepository commentRepository;

    // 댓글 작성(POST)
    public boolean insertComment(String commentBody) {
        Comment comment = new Comment();
        comment.setCommentBody(commentBody);
        comment.setCommentWrittenTime(LocalDateTime.now());
        commentRepository.save(comment);
        return true;
    }

    // 댓글 수정(POST)
    public boolean updateComment(Long id, String commentBody) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment comment = new Comment();
            comment.setCommentBody(commentBody);
            comment.setCommentWrittenTime(LocalDateTime.now());
            commentRepository.save(comment);
            return true;
        }
        return false;
    }
    // 댓글 개수 가져오기(GET)
    public long getCommentCount() {
        return commentRepository.count();
    }
}
