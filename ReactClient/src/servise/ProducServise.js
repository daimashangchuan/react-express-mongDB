/**
 *  商品的接口地址 
 */
import axios from '../api/axios';

export default {
    /**
     * 品牌管理
     */
    // 品牌一级分类列表
    reqCategorys({ parentId }) {
        return axios('/manage/category/list',{ parentId },'POST');
    },
    // 品牌添加分类
    reqAddCategory({parentId, categoryName}) {
        return axios('/manage/category/add',{parentId, categoryName},'POST');
    },
    // 品牌修改分类
    reqUpdateCategory({categoryId, categoryName}) {
        return axios('/manage/category/update',{categoryId, categoryName},'POST');
    },
    // 品牌根据分类id获取二级分类
    reqCategory({categoryId}) {
        return axios('/manage/category/info',{categoryId},'POST');
    },

    
    /**
     * 商品管理
     */
    // 商品分页列表
    reqProducts({ pageNum, pageSize }) {
        return axios('/manage/product/list',{ pageNum, pageSize },'POST');
    },
    // 商品搜索列表
    reqSearchProducts({ searchType,searchName, pageNum, pageSize }) {
        return axios('/manage/product/search',{ searchType,searchName, pageNum, pageSize },'POST');
    },
    // 商品详情获取一级分类名称
    reqProductOne({ categoryId }) {
        return axios('/manage/product/classOne',{ categoryId },'POST');
    },
    // 商品详情获取二级分类名称
    reqProductTwo({ pCategoryId }) {
        return axios('/manage/product/classTwo',{ pCategoryId },'POST');
    },
    // 商品列表更新上架/下架的 status
    reqUpdataStatus({ parentId,status }) {
        return axios('/manage/product/updataStatus',{ parentId, status },'POST');
    },
    // 删除上传的图片
    reqDeleceImg({ name }) {
        return axios('/manage/product/deleceImg',{ name },'POST');
    },
    // 添加商品信息
    reqProductAdd({ name, status, imgs, desc, price, pCategoryId, categoryId, detail }) {
        return axios('/manage/product/add',{ name, status, imgs, desc, price, pCategoryId, categoryId, detail },'POST');
    },
    // 修改商品信息
    reqProductUpdata({ name, status, imgs, desc, price, pCategoryId, categoryId, detail, _id }) {
        return axios('/manage/product/updata',{ name, status, imgs, desc, price, pCategoryId, categoryId, detail, _id },'POST');
    }
}


