import { Link } from "react-router-dom"; //to avoid reloading of browser (as anchor tag does) we use Link from react router dom

import { logOut } from '../utilities/users-service';

function NavBar(props) {
  const {user,setUser}=props;

  const handleLogOut=()=>{
  
  logOut();
setUser(null);

  }
  return (
    <nav>
      <Link to="/orders"> Order History </Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new"> New Order </Link>
      <span>Welcome, {user.name}</span>{" "}<Link to="" onClick={handleLogOut}>LogOut</Link>
    </nav>
  );
}
export default NavBar;
