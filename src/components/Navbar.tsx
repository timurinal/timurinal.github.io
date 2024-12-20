import { Link, useLocation } from 'react-router-dom';

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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
