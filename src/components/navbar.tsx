import { useEffect, useRef, useState } from "react";
import { A, H1, H2 } from "./typography";
import { TestIds } from "~/constants/test";

export const Navbar = () => {
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((show) => !show);
  useEffect(() => {
    // eslint-disable-next-line
    const listener = (e: any) => {
      // @ts-ignore
      // eslint-disable-next-line
      if (
        showMenu &&
        menuRef.current &&
        // eslint-disable-next-line
        !menuRef.current.contains(e.target) &&
        // eslint-disable-next-line
        !buttonRef.current?.contains(e.target)
      ) {
        console.log("hide menu");
        setShowMenu(false);
      }
    };
    window.addEventListener("click", listener);
    window.addEventListener("touchstart", listener);
    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("touchstart", listener);
    };
    // eslint-disable-next-line
  }, [menuRef, showMenu]);
  return (
    <nav className="sticky left-0 top-0 z-50 m-0 w-full bg-sky-950 text-center text-white shadow-lg">
      <div className="ml-auto inline-flex flex-col p-3">
        <H1>The Funro Map</H1>
        <H2>{"Because size isn't everything..."}</H2>
      </div>
      <span
        className="absolute right-0 top-0 m-6 inline-flex flex-col items-center justify-center"
        ref={buttonRef}
      >
        <button
          onClick={toggleMenu}
          className="text-white"
          data-cy={TestIds.HAMBURGER_MENU}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </span>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } relative w-auto  text-black`}
      >
        <ul
          className="absolute right-0 top-0 flex flex-col items-center bg-white p-5 drop-shadow-lg"
          ref={menuRef}
        >
          <li>
            <A target="_blank" className="" href="/privacy">
              Privacy Policy
            </A>
          </li>
          <li>
            <A target="_blank" className="" href="/terms">
              Terms & Conditions
            </A>
          </li>
        </ul>
      </div>
    </nav>
  );
};
