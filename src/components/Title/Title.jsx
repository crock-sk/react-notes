import css from './Title.module.css'

const Title = ({ setIsOpen }) => {
  return (
    <h1 className={css.title}>
      <button className={css.arrowButton} onClick={() => setIsOpen(false)}>
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
      </button>
      My Notes App
    </h1>
  );
};

export default Title