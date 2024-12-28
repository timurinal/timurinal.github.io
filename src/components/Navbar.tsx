import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Page {
  name: string;
  href: string;
}

interface Props {
  heading: string;
  pages: Page[];
}

function Navbar(props: Props) {
  const location = useLocation(); // Hook to get the current URL path
  const activePage = props.pages.findIndex(
    (page) => page.href === location.pathname
  );

  // State to manage the theme: 'light', 'dark', or 'system'
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  // Apply the theme to the <html> tag on mount or when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement; // Refers to the <html> element

    if (theme === 'system') {
      // 'System' mode uses the user's OS preferences
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      htmlElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      htmlElement.setAttribute('data-bs-theme', theme); // Apply 'light' or 'dark' theme directly
    }
  }, [theme]);

  // Function to change the theme
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme); // Update the theme state
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.heading}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {props.pages.map((page, index) =>
              index === activePage ? (
                <Link
                  key={index}
                  className="nav-link active"
                  aria-current="page"
                  to={page.href}
                >
                  {page.name}
                </Link>
              ) : (
                <Link key={index} className="nav-link" to={page.href}>
                  {page.name}
                </Link>
              )
            )}
          </div>
          {/* Right-aligned theme icon controls */}
          <div className="ms-auto d-flex align-items-center mode-switch">
            <button
              title="Use dark mode"
              id="dark"
              className={`btn btn-sm ${
                theme === 'dark' ? 'btn-primary' : 'btn-default text-secondary'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              <i className="bi bi-moon"></i>
            </button>
            <button
              title="Use light mode"
              id="light"
              className={`btn btn-sm ${
                theme === 'light' ? 'btn-primary' : 'btn-default text-secondary'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              <i className="bi bi-sun"></i>
            </button>
            <button
              title="Use system preferred mode"
              id="system"
              className={`btn btn-sm ${
                theme === 'system'
                  ? 'btn-primary'
                  : 'btn-default text-secondary'
              }`}
              onClick={() => handleThemeChange('system')}
            >
              <i className="bi bi-display"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
