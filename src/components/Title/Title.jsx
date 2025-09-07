import css from "./Title.module.css";
import { Link } from "react-router";

const Title = ({ userName ,isOpen, setIsOpen }) => {
  return (
    <h1 className={css.title}>
      <Link
        to="/notes"
        className={css.arrowButton}
        onClick={() => setIsOpen(false)}
      >
        {isOpen && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 12H6M6 12L12 6M6 12L12 18"
              stroke="#4E61F6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>
      {userName ? userName : "My Notes App"}
    </h1>
  );
};

export default Title;
