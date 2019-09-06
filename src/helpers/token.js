import jwt from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-community/async-storage';

const getCurrentUser = async () => {
  let toe = await AsyncStorage.getItem('token', (err, res) => {
    console.log(err, res);
  });
  const objJwt = await jwt.decode(
    toe, // the token
    '23r3f-W3155m4n', // the secret
    {
      skipValidation: true, // to skip signature and exp verification
    },
  );
  if (objJwt) {
    return objJwt.payload;
  }
  return null;
};

export {getCurrentUser};
