const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/8c923c4ccbee61ba681b1df6d04f6d5e/api'
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/8c923c4ccbee61ba681b1df6d04f6d5e/api'
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/8c923c4ccbee61ba681b1df6d04f6d5e/api'
  },
}


export default {
  env,
  mock: false,
  ...EnvConfig[env],
//   命名空间
namespace:'manage1'
}