import signupImage from '../../assets/images/login.jpg'
import loginImage from '../../assets/images/signup.jpg'

const images = {
  signup: signupImage,
  login: loginImage
}

export default (imageType) => images[imageType]
