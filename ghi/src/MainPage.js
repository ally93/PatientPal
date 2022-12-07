import { Link } from 'react-router-dom';
import familyphoto from './images/familyphoto.jpeg'
function MainPage() {
  return (
    <>
      <h1>My Patient Portal</h1>


      <div>
        {/* <Link to="register"> register </Link> */}
        <img src={familyphoto} alt="fam" />
      </div>
    </>
  );
}

export default MainPage;
