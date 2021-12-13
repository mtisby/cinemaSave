import { MovieSM } from '../components/MovieSM'; 
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom';

function ShowMovie() {

    return (
        <div className="showMovie">
          <Link to="/home">home</Link>
          <h1>I show da movies</h1>
          <MovieSM />
          <p>hello? { ReactSession.get("username") }</p>
        </div>
      );
}
  
export default ShowMovie;
  
