import css from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Oleksandr Mykhailenko</p>
          <p>
            Contact us:
            <a href="mailto:saniamykhailenko@gmail.com">
              saniamykhailenko@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
