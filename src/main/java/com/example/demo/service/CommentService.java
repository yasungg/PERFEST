package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Community;
import com.example.demo.entity.Member;
import com.example.demo.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor

public class CommentService {
    private final CommentRepository commentRepository;

    // 댓글 작성(POST)
    public boolean insertComment(String commentBody, Long communityId, Long memberId) {
        Comment comment = new Comment();
        comment.setCommentBody(commentBody);
        comment.setCommentWrittenTime(LocalDateTime.now());

        Community community = new Community();
        community.setId(communityId);
        comment.setCommunity(community);

        Member member = new Member();
        member.setId(memberId);
        comment.setMember(member);

        commentRepository.save(comment);
        return true;
    }
    // 대댓글 작성(POST)
    public boolean insertReplyComment(Long parentId,Long memberId, String replyBody) {
        Comment parentComment = commentRepository.findById(parentId)
                .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));

        Comment reply = new Comment();
        reply.setCommentBody(replyBody);
        reply.setCommentWrittenTime(LocalDateTime.now());
        reply.setParent(parentComment);

        Member member = new Member();
        member.setId(memberId);
        reply.setMember(member);

        parentComment.getChildren().add(reply);
        commentRepository.save(reply);
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
    public long getCommentCount(Long communityId) {
        return commentRepository.countByCommunityId(communityId);
    }
    // 해당 게시글 댓글 조회하기
    public List<CommentDTO> getCommentList(Long communityId) {
        List<Comment> commentList = commentRepository.findByCommunityId(communityId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for(Comment comment : commentList) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setCommentId(comment.getId());
            commentDTO.setCommentBody(comment.getCommentBody());
            commentDTO.setCommentWrittenTime(comment.getCommentWrittenTime());
            commentDTO.setCommentLikeCount(comment.getCommentLikeCount());
            commentDTOS.add(commentDTO);
        }
        return commentDTOS;
    }
    // 해당 댓글 좋아요 추가하기
    public boolean insertHeart(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            int currentLikeCount = comment.getCommentLikeCount();
            comment.setCommentLikeCount(currentLikeCount + 1);
            commentRepository.save(comment);
            return true;
        }
        return false;
    }
}
