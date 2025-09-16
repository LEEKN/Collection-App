package com.collection.service.ChapterService;

import com.collection.model.ChapterModel;
import com.collection.model.dto.ChapterRequest;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ChapterService {


    CompletableFuture<List<ChapterModel>> getBookByIdAsync(Integer id);

    ChapterRequest getBookById(Integer id, Integer chapterNumber);
}
