export default {
  DEV_DOMAIN: 'https://venicedev.dian.so',
  DOMAIN: 'https://venice.dian.so',
  DOMAIN_BDEV: 'https://bdev.dian.so',
  DOMAIN_B: 'https://b.dian.so',
  API_CODE_NEED_LOGIN: '206',

  // 发送验证码 - 业务类型 1.登录 2.注册 3.修改手机号码
  CODE_BIZ_TYPE_LOGIN: 1,
  CODE_BIZ_TYPE_REGISTER: 2,
  CODE_BIZ_TYPE_UPDATE: 3,
  CODE_BIZ_TYPE_WITHDRAWAL: 4,
  // 合同状态 - 1.审核中 2.已生效 3.已失效
  AGREEMENT_STATUS_VERIFY: 1,
  AGREEMENT_STATUS_EFFECT: 2,
  AGREEMENT_STATUS_EXPIRE: 3,
  // 用户角色 - 1.老板 2.管理员
  ROLE_BOSS: 1,
  ROLE_ADMIN: 2,
  // 认证状态 - 0：未认证（不存在这种状态），1：审核中，2：已认证，3：未通过，7：取消状态
  AUTH_STATUS_UNAUTH: 0,
  AUTH_STATUS_CHECKING: 1,
  AUTH_STATUS_SUCCESS: 2,
  AUTH_STATUS_REJECT: 3,
  AUTH_STATUS_CANCEL: 7,
  // 认证主体 - 1：企业，2：个人
  AUTH_TYPE_COMPANY: 1,
  AUTH_TYPE_PERSONAL: 2,
  // 结算主体 - 0：友电，1：伊甸园，2：代理商，3：运营型服务商
  SETTLE_SUBJECT_YOUDIAN: 0,
  SETTLE_SUBJECT_YIDIANYUAN: 1,
  SETTLE_SUBJECT_DAILI: 2,
  SETTLE_SUBJECT_FUWU: 3,

  // 图片上传大小限制
  MAX_FILE_SIZE: 10485760,

  // 投放渠道
  ADVERT_CHANNEL_WEAPP: '2',
  ADVERT_CHANNEL_ALIAPP: '12',
  ADVERT_CHANNEL_BOTH: '2,12',

  // 付费方式 1.广告账户 2.分成账户
  ADVERT_PAY_FOX: 1,
  ADVERT_PAY_LEO: 2,

  // 行业与城市 999999全部
  ADVERT_SELECT_TYPE_ALL: 999999,
  TIPS_SHARE_RATIO: '分成比例：当前生效中的分成比例',
  TIPS_SHARE_BASE: '参与分成基数=成功订单收款-订单退款',
  TIPS_SHARE_REVENUE:
    '分成收益：分成收益=参与分成基数*分成比例；每日6点左右更新截止昨日数据；数据仅供参考，实际数值以出账为准',

  // 账单商户类型
  ACCOUNT_TYPE_YOUDIAN: 1,
  ACCOUNT_TYPE_YIDIANYUAN: 2,
  ACCOUNT_TYPE_DOUBLE: 3,

  // settleSubjectId
  ACCOUNT_SUBJECT_ID_YOUDIAN: 0,
  ACCOUNT_SUBJECT_ID_YIDIANYUAN: 1,

  // authentType
  AUTHENT_TYPE_UNAUTH: 0,
  AUTHENT_TYPE_AUTHED: 1,
  AUTHENT_TYPE_AUTHING: 2,

  // settleAccountId
  SETTLE_ACCOUNT_ID: 'settleAccountId',

  // settleAccountType
  SETTLE_ACCOUNT_TYPE: 'settleAccountType',

  // settleSubjectId
  SETTLE_SUBJECT_ID: 'settleSubjectId',

  // settleSubjectType
  SETTLE_SUBJECT_TYPE: 'settleSubjectType',

  // tax
  SETTLE_TAX: 'tax',

  // invoice
  SETTLE_INVOICE: 'invoice',

  // subjectType
  SUBJECT_TYPE: 'subjectType',

  // subjectName
  SUBJECT_NAME: 'subjectName',

  // merchantType 1的时候是普通商家，不等于1的时候是KA
  MERCHANT_TYPE: 'merchantType',

  // authentType 0 未认证、1 已认证、2 认真中
  AUTHENT_TYPE: 'authentType',
}
