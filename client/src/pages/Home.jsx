import { ReactSession } from 'react-client-session';
import { Navbar } from '../components/Navbar.jsx';
import { PinReccomendations } from '../components/PinReccomendations.jsx';

// style sheets
import './home.css';

function Home() {
  const userid = ReactSession.get("userid");

  return (
    <div className="Home-Pg pgMargin">
      <Navbar />
      <div className='movies-contianer'>
        <PinReccomendations userid= { userid }/>
      </div>
    </div>
  );
}

export default Home;