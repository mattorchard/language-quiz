import "./Header.css";

const Header = () => (
  <header className="app-header">
    <h1
      className="app-header__brand"
      aria-label="Greek Verbs for Classics Nerds"
    />
    <nav className="app-header__nav">
      <a href="#home" className="app-header__nav__link">
        Home
      </a>
      <a href="#quiz" className="app-header__nav__link">
        Quiz
      </a>
      <a href="#stats" className="app-header__nav__link">
        Stats
      </a>
    </nav>
  </header>
);
export default Header;
