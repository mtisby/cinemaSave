import { MovieSM } from '../components/MovieSM'; 

function ShowMovie() {

    return (
        <div className="showMovie">
          <a href="/home">link to home</a>
            <h1>I show da movies</h1>
            <MovieSM />
        </div>
      );
}
  
export default ShowMovie;
  
