import { MovieSM } from '../components/MovieSM'; 
import { Navbar } from '../components/Navbar';
import { PinReccomendations } from '../components/PinReccomendations.jsx';
import { ReactSession } from 'react-client-session';


function ShowMovie() {
  const userid = ReactSession.get("userid");

    return (
      <div className="showMovie pgMargin">
          <Navbar />
          <MovieSM />
          <hr />
          <PinReccomendations userid= { userid } />
        </div>
      );
}
  
export default ShowMovie;
  
