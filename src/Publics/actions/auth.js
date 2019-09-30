import axios from 'axios';
export const getUserById = id => {
  return {
    type: 'GET_USER_ID',
    payload: axios.get(`http://192.168.100.69:3020/rentapp/users/${id}`),
  };
};

export const login = data => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'post',
      url: 'http://192.168.100.69:3020/rentapp/users/signin',
      data: data,
    })
      .then()
      .catch(err => {
        console.log('gagal nk\n' + err);
      }),
  };
};

export const register = data => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'post',
      url: 'http://192.168.100.69:3020/rentapp/users/signup',
      data: data,
    })
      .then()
      .catch(err => {
        console.log('gagal nk\n' + err);
      }),
  };
};
export const logout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};
