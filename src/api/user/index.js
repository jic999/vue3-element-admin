import req from '@/api/request'

export default {
  reqCreate: (params) => req.post('/user', params),
  reqDelete: (id) => req.delete(`/user/${id}`),
  reqUpdate: (params) => req.put('/user', params),
  reqPage: ({ pageNo, pageSize, keyword }) =>
    req.get(`/user/page?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`),
  reqList: (params) => req.get('/user/list'),
}
