import { useContext } from "react"
import AuthContext from "../context/AuthContextProvider";

const Profile = () => {

  const {auth} = useContext(AuthContext);
console.log(auth.user);
  return (
    <div>
      <h1 className="heading">Profile</h1>

      <p className="info"><span>Username :</span> {auth.user}</p>
      <p className="info"><span>Password :</span> {auth.pwd}</p>
      <p className="info"><span>Email :</span> {auth.email}</p>

    </div>
  )
}

export default Profile