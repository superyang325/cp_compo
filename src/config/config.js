const config = {
  development: {
    cp_plus: {
      ROOTPATH: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/',
      APIPATH: 'https://middle-gw-dev.cook.cpgroup.cn/srv-oms/',
      OTHERS: {
        COMPANYURL: '',
        SHOPURL: ''
      }
    },
    cp_cook: {
      ROOTPATH: 'https://api-dev.cook.cpgroup.cn/',
      APIPATH: 'https://middle-gw-dev.cook.cpgroup.cn/srv-oms/',
      OTHERS: {
        COMPANYURL: '',
        SHOPURL: ''
      }
    },
    cp_middle: {
      ROOTPATH: 'https://middle-gw-dev.cook.cpgroup.cn/srv-oms/',
      APIPATH: 'https://middle-gw-dev.cook.cpgroup.cn/srv-oms/'
    }
  },
  production: {
    cp_plus: {
      ROOTPATH: 'https://gateway-cp-kitchen-admin-api.cpgroupcloud.com/',
      APIPATH: 'https://middle-gw.cook.cpgroup.cn/srv-oms/',
      OTHERS: {
        COMPANYURL: '',
        SHOPURL: ''
      }
    },
    cp_cook: {
      ROOTPATH: 'https://api.cook.cpgroup.cn/',
      APIPATH: 'https://middle-gw.cook.cpgroup.cn/srv-oms/',
      OTHERS: {
        COMPANYURL: '',
        SHOPURL: ''
      }
    },
    cp_middle: {
      ROOTPATH: 'https://middle-gw.cook.cpgroup.cn/srv-oms/',
      APIPATH: 'https://middle-gw.cook.cpgroup.cn/srv-oms/',
    }
  },
};
export const getConfig = function () {
  const mp_env = window.localStorage.getItem('mp_env') || 'development'
  const mp_platform = window.localStorage.getItem('mp_platform') || 'cp_middle'
  const mp_company = JSON.parse(window.localStorage.getItem('mp_company'))
  const res = {
    APIPATH: config[mp_env][mp_platform]['APIPATH'],
    ROOTPATH: config[mp_env][mp_platform]['ROOTPATH'],
    basic: {
      mp_env,
      mp_platform,
      mp_company
    },
  }
  console.log('res~28::', res)
  return res
}
