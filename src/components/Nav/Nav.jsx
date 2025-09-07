import css from "./Nav.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Nav = ({ currentUser, setCurrentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={() => setIsModalOpen(true)}>
        Switch
      </button>
      <svg
        className={css.icon}
        width="25"
        height="27"
        viewBox="0 0 25 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.06299 21.8182V20.0909C5.06299 16.2249 8.197 13.0909 12.063 13.0909H12.2391C16.1051 13.0909 19.2391 16.2249 19.2391 20.0909V21.8182"
          stroke="#131927"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1509 13.0909C14.3878 13.0909 16.2012 11.1373 16.2012 8.72728C16.2012 6.31731 14.3878 4.36365 12.1509 4.36365C9.91397 4.36365 8.10059 6.31731 8.10059 8.72728C8.10059 11.1373 9.91397 13.0909 12.1509 13.0909Z"
          stroke="#131927"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <h3 className={css.title}>{currentUser ? currentUser.name : "None"}</h3>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default Nav;
