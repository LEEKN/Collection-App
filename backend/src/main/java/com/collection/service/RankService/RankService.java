package com.collection.service.RankService;

import com.collection.controller.parameter.BookGetListParameter;
import com.collection.model.BookResultModel;
import com.collection.model.Rank;

import java.util.List;

public interface RankService {
    /**
     * 寫入-排行榜資料
     * @param id 書本Id
     */
    void setRankData(Integer id);


    /**
     * 查詢-排行榜一覽表
     * @return 排行榜資料
     */
    List<BookResultModel> getBookData(String account );
}
