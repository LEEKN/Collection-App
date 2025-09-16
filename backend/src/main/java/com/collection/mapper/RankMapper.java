package com.collection.mapper;

import com.collection.controller.parameter.BookGetListParameter;
import com.collection.model.BookResultModel;
import com.collection.model.Rank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RankMapper {

    /**
     * 存入 Rank 資料並回傳處理後的 Rank 清單
     *
     * @param  id 要存入的 Rank 資料
     * @return 包含所有相關 Rank 的清單
     */
    int setRankData(@Param("id") int id, @Param("count") int count);

    List<Rank> getRankData();

    void UpdateRankData(@Param("id")int id);


    List<BookResultModel> getBookData(@Param("account")String account);

}
