import signupImage from './login.jpg';
import loginImage from './signup.jpg';

const images = {
  signup: signupImage,
  login: loginImage,
};

export default (imageType) => images[imageType];
