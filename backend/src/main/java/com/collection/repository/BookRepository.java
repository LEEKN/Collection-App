package com.collection.repository;

import com.collection.controller.parameter.BookGetListParameter;
import com.collection.model.BookResultModel;
import com.collection.model.condition.BookGetListCondition;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 查詢-書本 Repository Interface
 */
public interface BookRepository {

    /**
     * 查詢-書本
     * @param id 書本Id
     * @param account 使用者
     * @return 書本資料
     */
    CompletableFuture<BookResultModel> getAsync(int id, String account);

    /**
     * 查詢-書本一覽表
     * @param condition 查詢條件
     * @return 書本資料
     */
    CompletableFuture<List<BookResultModel>> getListAsync(BookGetListCondition condition);
}
