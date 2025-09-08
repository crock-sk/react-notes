import { useNavigate } from "react-router";
import { useEffect } from "react";
import UserList from "../UserList/UserList";

const Home = ({ setCurrentUser }) => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate("/notes");
    }
  }, [isMobile, navigate]);
  return (
    <div>
      {isMobile ? (
        <UserList handleSelectUser={setCurrentUser} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
