import { Outlet, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to={"./"}>
          <img className='logoImg' src='../logo.png' width='100' height='100' alt='Superheroes' />
        </Link>
        <div className='navbar-nav'>
          <Link to={"./"} className={`nav-item nav-link`}>
            Home
          </Link>
          <Link to={"./superhero"} className={`nav-item nav-link`}>
            Superhero
          </Link>
          <Link to={"./add"} className={`nav-item nav-link`}>
            Add new Superhero
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
