import fetch from './http'

// export const HOST = 'https://sniu.2dian.com/xcx/'
// export const AuthLoginByWeixin = HOST + 'login/goWebchat'

export const HOST = 'https://test-webchat.bianlimt.com'
// export const HOST = 'https://test.bianlimt.com'
// export const HOST = 'http://192.168.1.197:30006'
// export const AuthLoginByWeixin = HOST + '/Api/h5/chat/u/p/login'
export const AuthLoginByWeixin = HOST + '/Api/h5/user/p/small/login'

export async function getGoodsDetail (params) {
  let result = await fetch('/Api/h5/u/p/goods/getGoodsDetail', params, 'post')
  return result
}

// vip微信支付
export async function wxPay (params) {
  let result = await fetch('/Api/h5/u/small/pay/toWxVipPay', params, 'post')
  return result
}

// 合伙人微信支付
export async function wxPartnerPay (params) {
  let result = await fetch('/Api/h5/u/small/pay/toWxPartnerPay', params, 'post')
  return result
}

// 优惠券
export async function couponList (params) {
  let result = await fetch('/Api/h5/u/couponReturn/myList', params, 'post')
  return result
}

// 优惠券可用商铺
export async function couponShopList (params) {
  let result = await fetch('/Api/h5/u/usercouponreturn/getUserCouponReturnShoplist', params, 'post')
  return result
}

// 首页
export async function getIndexGoods (params) {
  let result = await fetch('Api/h5/m/p/getShopRecommendListForIndex', params, 'post')
  return result
}

// 百科
export async function getEncyList (params) {
  let result = await fetch('Api/h5/u/reading/articles/p/getReadInfoVOList', params, 'post')
  return result
}
// 百科详情
export async function getEncyListDetail (params) {
  let result = await fetch('Api/h5/u/reading/articles/p/detail', params, 'post')
  return result
}
// 百科-点赞
export async function encyLike (params) {
  let result = await fetch('Api/h5/u/reading/articles/read_like', params, 'post')
  return result
}
// 百科-收藏
export async function encyFollow (params) {
  let result = await fetch('Api/h5/u/reading/articles/read_follow', params, 'post')
  return result
}
// 百科-红包渲染完成
export async function encyRedFinish (params) {
  let result = await fetch('Api/h5/u/reading/articles/p/inform_read', params, 'post')
  return result
}
// 百科-是否可领取红包
export async function encyRedJudge (params) {
  let result = await fetch('Api/h5/u/reading/articles/judgeGain', params, 'post')
  return result
}
// 百科-领取红包接口
export async function encyRedGet (params) {
  let result = await fetch('Api/h5/u/reading/articles/getAward', params, 'post')
  return result
}

// 零元购
export async function getPurchaseList (params) {
  let result = await fetch('Api/h5/base/product/u/p/getSpellGroupList', params, 'post')
  return result
}

// 超值购商品详情
export async function getGreatValueGoods (params) {
  let result = await fetch('Api/h5/u/p/goods/getGoods', params, 'post')
  return result
}

// 超值购商品详情其他
export async function getGreatValueGoodsOther (params) {
  let result = await fetch('Api/h5/u/p/goods/getCount', params, 'post')
  return result
}

// 超值购商品收藏
export async function valueCollect (params) {
  let result = await fetch('Api/FollowGoods/isFollow', params, 'get')
  return result
}

// 获取城市列表
export async function getCityList (params) {
  let result = await fetch('Api/h5/u/memberaddress/getCityList', params, 'post')
  return result
}
// 获取城市列表-查询
export async function getCityByQuery (params) {
  let result = await fetch('Api/h5/u/memberaddress/getCityByQuery', params, 'post')
  return result
}
// 收货地址保存
export async function saveAddress (params) {
  let result = await fetch('Api/h5/u/memberaddress/saveMemberAddress', params, 'post')
  return result
}
// 店铺地图
export async function getShopMap (params) {
  let result = await fetch('Api/h5/m/p/getShopBySearch', params, 'post')
  return result
}

/**
 *
 * @param {*} m_phone 手机号
 * @param {*} m_pwd 手机号
 */
export async function phoneLogin (params) {
  let result = await fetch('/Api/Public/login', params, 'post')
  return result
}

/**
 *获取验证码
 * @param {*} mobile
 * @param {*} type login: 登录，register：注册，bindPhone：绑定手机号，forget忘记手机号，authentication 认证
 */
export async function getCode (params) {
  let result = await fetch('/Api/h5/base/msg/p/sendSms', params, 'post')
  return result
}

/**
 *查询邀请记录
 * @param {*} pageNo 分页参数
 * @param {*} pageSize 分页参数
 */
// export async function getInviterMemberList (params) {
//   let result = await fetch('/Api/h5/member/getInviterMemberList', params, 'post')
//   return result
// }
/**
 * 验证验证码-忘记密码
 * @param {*} params m_phone
 * @param {*} params  m_code
 */
export async function VerifyCode (params) {
  let result = await fetch('Api/h5/u/member/p/VerifyCode', params, 'post')
  return result
}
/**
 * 验证验证码-忘记密码
 * @param {*} params mobile
 * @param {*} params  code
 * @param {*} params pwd
 * @param {*} params  pwdTwo
 */
export async function forgetPwd (params) {
  let result = await fetch('Api/h5/u/member/p/forgetPwd', params, 'post')
  return result
}
/**
 * 修改密码
 * @param {*} params originalPwd
 * @param {*} params  pwd
 * @param {*} params  pwdTwo
 */
export async function changePwd (params) {
  let result = await fetch('Api/h5/u/member/changePwd', params, 'post')
  return result
}
/**
 * 修改支付密码
 * @param {*} params originalPwd
 * @param {*} params  pwd
 * @param {*} params  pwdTwo
 */
export async function changeUserPayPwd (params) {
  let result = await fetch('Api/h5/u/member/changeUserPayPwd', params, 'post')
  return result
}
/**
 * 足迹列表
 * @param {*} params
 * @param {*} params
 * @param {*} params
 */
export async function getMemberTrackGoodsList (params) {
  let result = await fetch('/Api/h5/u/memberTarck/getMemberTrackGoodsList', params, 'post')
  return result
}

// 增加商品浏览足迹
export async function addGoodTrack (params) {
  let result = await fetch('Api/h5/u/memberTarck/memberTrackGoods', params, 'post')
  return result
}

export async function getMemberTrackShopList (params) {
  let result = await fetch('Api/h5/u/memberTarck/getMemberTrackShopList', params, 'post')
  return result
}
// 增加店铺浏览足迹
export async function addShopTrack (params) {
  let result = await fetch('Api/h5/u/memberTarck/memberTrackShop', params, 'post')
  return result
}

/**
 * 店铺资质
 * @param {*} params
 * @param {*} params
 * @param {*} params
 */
export async function getshopzizhi (params) {
  let result = await fetch('Api/h5/m/p/shopDetail', params, 'post')
  return result
}

/**
 * 交易记录筛选条件类型
 * @param {*} params
 * @param {*} params
 * @param {*} params
 */
export async function getMpTypeList (params) {
  let result = await fetch('/Api/h5/u/member/p/getMpTypeList', params, 'post')
  return result
}
/**
 * 交易记录筛选条件类型
 * @param {*} params
 * @param {*} params
 * @param {*} params
 */
export async function getPriceDetail (params) {
  let result = await fetch('Api/h5/u/member/getPriceDetail', params, 'post')
  return result
}

// 店铺详情 - 自营/商城商品
export async function shopGoodsList (params) {
  let result = await fetch('Api/h5/m/p/smallgoodsList', params, 'post')
  return result
}
// 店铺详情 - 自营/商城 热销商品
export async function shopHotGoodsList (params) {
  let result = await fetch('Api/h5/m/p/actionTypeFirst', params, 'post')
  return result
}
// 店铺详情 - 自营/商城 添加商品
export async function shopAddGood (params) {
  let result = await fetch('Api/h5/u/ordercart/add_item', params, 'post')
  return result
}
// 店铺详情 - 自营/商城 删除商品
export async function shopDelGood (params) {
  let result = await fetch('Api/h5/u/ordercart/changeNum', params, 'post')
  return result
}
// 店铺详情 - 自营/商城 购物车列表
export async function shopCartList (params) {
  let result = await fetch('Api/h5/u/ordercart/p/myOrderCart', params, 'post')
  return result
}

// 提现初始化接口
export async function applyInit (params) {
  let result = await fetch('Api/h5/u/withdraw/init', params, 'post')
  return result
}

// 提现接口
export async function doApply (params) {
  let result = await fetch('Api/h5/u/withdraw/apply', params, 'post')
}
// 店铺详情 - 自营/商城 清空购物车
export async function shopCartClear (params) {
  let result = await fetch('Api/h5/u/ordercart/emptyCart', params, 'post')
  return result
}
// 退款申请提交
export async function goodRefundApply (params) {
  let result = await fetch('Api/h5/u/goodRefundApply/refundApplySubmit', params, 'post')
  return result
}
// 退款申请
export async function refundApplyRequest (params) {
  let result = await fetch('Api/h5/u/goodRefundApply/refundApplyRequest', params, 'post')
  return result
}
export async function orderlist (params) {
  let result = await fetch('Api/h5/u/order/list', params, 'post')
  return result
}
// 店铺详情 - 自营/商城 购物车结算校验
export async function shopCartVerify (params) {
  let result = await fetch('Api/h5/u/ordercart/checkOut', params, 'post')
  return result
}
// 用户信息
export async function getMyAccount (params) {
  let result = await fetch('Api/h5/u/member/getMyAccount', params, 'post')
  return result
}
// 订单列表
export async function orderList (params) {
  let result = await fetch('Api/h5/u/order/list', params, 'post')
  return result
}
// 订单详情
export async function orderDetail (params) {
  let result = await fetch('/Api/h5/u/order/detail', params, 'post')
  return result
}

// 结算时的订单信息
export async function checkGetOrderInfo (params) {
  let result = await fetch('Api/h5/u/orderCartCheckOut/getOrderInfo', params, 'post')
  return result
}

// 多级城市列表
export async function moreLevelCity (params) {
  let result = await fetch('Api/h5/base/area/p/getAreaList', params, 'post')
  return result
}
// 个人余额 ???码粒
export async function getMemberPrice (params) {
  let result = await fetch('/Api/h5/u/member/getMemberPrice', params, 'get')
  return result
}
// 提交订单
export async function generateOrder (params) {
  let result = await fetch('Api/h5/u/orderCartCheckOut/generateOrder', params, 'post')
  return result
}

// 支付订单信息
export async function getOrderInfo (params) {
  let result = await fetch('Api/h5/u/orderpay/getOrderInfo', params, 'post')
  return result
}

// 开始支付 (码粒支付)
export async function beginPay (params) {
  let result = await fetch('Api/h5/u/orderpay/pay', params, 'post')
  return result
}

// 商品微信支付
export async function wxGoodsPay (params) {
  let result = await fetch('Api/h5/u/small/pay/orderPay', params, 'post')
  return result
}
// 商品微信支付
export async function getShopDdetailAboutGoods (params) {
  let result = await fetch('Api/h5/m/p/getShopDdetailAboutGoods', params, 'post')
  return result
}
// 商铺列表
export async function getShopRecommendList (params) {
  let result = await fetch('/Api/h5/m/p/getShopRecommendList', params, 'post')
  return result
}
// 入驻申请
export async function applysShops (params) {
  let result = await fetch('Api/h5/u/p/shopApply/applysShops', params, 'post')
  return result
}
// 字符串转MD5
export async function getMd5Encryption (params) {
  let result = await fetch('Api/h5/base/area/p/getEncryption', params, 'post')
  return result
}

// 推广佣金以及返利
export async function getIndustryRate (params) {
  let result = await fetch('Api/h5/u/p/goods/getIndustryRate', params, 'post')
  return result
}

// 获取用户收货地址
export async function getUserAddress (params) {
  let result = await fetch('Api/h5/u/memberaddress/p/getUserAddress', params, 'post')
  return result
}
// 推广邀请记录接口
export async function getInviterMemberList (params) {
  let result = await fetch('/Api/h5/u/member/getInviterMemberList', params, 'post')
  return result
}
// 会员专享
export async function getMemberActivityList (params) {
  let result = await fetch('/Api/h5/u/member/rechargeRule', params, 'post')
  return result
}
// 入账记录
export async function findMemberBeanList (params) {
  let result = await fetch('Api/h5/u/member/findMemberBeanList', params, 'post')
  return result
}
export async function searchGoods (params) {
  let result = await fetch('Api/h5/u/search/p/searchGoods', params, 'post')
}
// 收藏列表(店铺)，(0元购)接口
export async function getShopCollectList (params) {
  let result = await fetch('Api/h5/u/follow/getFollowList', params, 'post')
  return result
}

// 收藏文章列表接口
export async function getAticleList (params) {
  let result = await fetch('Api/h5/u/reading/articles/getReadInfoFollowList', params, 'post')
  return result
}
// 超值购订单接口
export async function CarDetailGoods (params) {
  let result = await fetch('/Api/h5/u/ordercart/order-group/CarDetailGoods', params, 'post')
  return result
}
// 绑定手机号
export async function bindingPhoneNum (params) {
  let result = await fetch('Api/h5/u/member/bindingPhoneNum', params, 'post')
  return result
}
// 设置与重置支付密码
export async function setUserPayPwd (params) {
  let result = await fetch('Api/h5/u/member/setUserPayPwd', params, 'post')
  return result
}
//

// 生成付款二维码接口
export async function getPayQrcode (params) {
  let result = await fetch('Api/h5/u/member/qrCode', params, 'post')
  return result
}

// 付款码是否使用接口
export async function getFKMState (params) {
  let result = await fetch('Api/h5/u/member/getFKMState', params, 'post')
  return result
}

// 会员活动微信支付使用接口
export async function payWxCoupon (params) {
  let result = await fetch('Api/h5/u/member/addCouponRule-wxBySmall', params, 'post')
  return result
}

// 超值购订单微信支付接口
export async function payWxLittle (params) {
  let result = await fetch('Api/h5/u/orderpay/goodsOrder', params, 'post')
  return result
}

// 超值购提交订单初始化接口
export async function littleBuynow (params) {
  let result = await fetch('Api/h5/u/ordercart/order-group/buyNow', params, 'post')
  return result
}

// 立即缴费(合伙人码粒支付)
export async function toPricePartnerPay (params) {
  let result = await fetch('Api/h5/u/member/toPricePartnerPay', params, 'post')
  return result
}

// 立即缴费(会员码粒支付)
export async function toPriceVipPay (params) {
  let result = await fetch('Api/h5/u/member/toPriceVipPay', params, 'post')
  return result
}

// 点击店铺取消收藏接口
export async function doFollowShop (params) {
  let result = await fetch('/Api/h5/u/follow/isFollowShop', params, 'post')
  return result
}
