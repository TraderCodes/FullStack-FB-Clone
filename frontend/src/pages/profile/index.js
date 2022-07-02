import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Profile() {
  const { username } = useParams();
  const {user} = useSelector((state) => ({ ...state })); 
    // if username not in the link we send user to current user logged in  
    var userName = username === undefined ? user.username: username
  console.log(username);
  console.log(userName);
  return <div>Profile</div>;
}
