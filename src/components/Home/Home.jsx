import { useNavigate } from "react-router";
import { useEffect } from "react";
import UserList from "../UserList/UserList";
import Title from "../Title/Title";

const Home = ({ setCurrentUser, currentUser }) => {
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
        <>
          <Title userName={currentUser?.name} />
          <UserList handleSelectUser={setCurrentUser} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
