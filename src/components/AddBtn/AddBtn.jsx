import css from './AddBtn.module.css'

const AddBtn = ({text, handleAddClick}) => {
  return (
    <button className={css.button} onClick={handleAddClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12H12M18 12H12M12 12V6M12 12V18"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={css.textBtn}>{text}</span>
    </button>
  );
}

export default AddBtn