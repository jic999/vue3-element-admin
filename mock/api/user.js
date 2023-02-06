import R from '../utils/R'
export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: {
      code: 0,
      msg: '请求成功',
      'data|15': [
        {
          'id|+1': 130,
          name: '@cname',
          province: '@province',
          'gender|1': [0, 1],
          'isVip|1': [0, 1],
          'age|16-50': 50,
          description: '@cparagraph',
        },
      ],
    },
  },
]
