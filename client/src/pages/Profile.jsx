import { ReactSession } from 'react-client-session'
import {Link} from 'react-router-dom'

function Profile() {
  
    return (
        <div className="profile">
          <Link to="/home">home</Link>
          <h1>Welcome { ReactSession.get("username") }</h1>
        </div>
      );
}
  
export default Profile;
  
