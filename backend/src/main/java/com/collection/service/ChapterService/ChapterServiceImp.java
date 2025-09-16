package com.collection.service.ChapterService;

import com.collection.mapper.ChapterMapper;
import com.collection.model.ChapterModel;
import com.collection.model.dto.ChapterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ChapterServiceImp implements ChapterService {

    @Autowired
    ChapterMapper chapterMapper;
    @Override
    public CompletableFuture<List<ChapterModel>> getBookByIdAsync(Integer id) {
        var result =  CompletableFuture.supplyAsync(() -> this.chapterMapper.getBookByContent(id));
        return result;
    }

    @Override
    public ChapterRequest getBookById(Integer id, Integer chapterNumber) {
        var result = this.chapterMapper.getBookContentById(id, chapterNumber);
        return result;
    }
}
