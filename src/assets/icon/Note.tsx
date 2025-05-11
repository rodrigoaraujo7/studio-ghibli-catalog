import type { CSSProperties } from "react";

const Note = ({ style }: { style?: CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
    <path
      id="SVGRepo_iconCarrier"
      stroke={style?.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19.82 14H15.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C14 14.76 14 15.04 14 15.6v4.22m6-7.093V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C18.48 4 17.92 4 16.8 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C5.52 20 6.08 20 7.2 20h5.75c.508 0 .762 0 1-.06a2 2 0 0 0 .595-.256c.207-.132.381-.317.73-.686l3.85-4.073c.324-.342.485-.513.6-.71q.155-.263.224-.56c.051-.223.051-.458.051-.928"
    ></path>
  </svg>
);

export default Note;
