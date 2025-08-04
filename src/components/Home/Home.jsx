import { useNavigate } from "react-router";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/notes");
    }, [navigate]);
  return <div>Home</div>;
};

export default Home;
