
import Main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {
  Logo
} from '../components';
import {Link} from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>Job <span>Tracking</span> App</h1>

          <p>
          An app that ONLY has jobs intended for the youth all 
          in one place so that you can see all of your local 
          opportunities. No need to spend your weekends searching 
          online and handing out resumes. You can conveniently skim 
          through all of the local jobs in your area and visit 
          the respective employer's job portal to apply!
          </p>

          <Link
            to='/register'
            className='btn btn-hero'
          >
            Login/Register
          </Link>
        </div>

        <img src={Main} className='main-img img' alt='Main img' />
      </div>
    </Wrapper>
  )
}

export default Landing;