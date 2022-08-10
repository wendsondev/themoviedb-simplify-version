import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="h-14 flex justify-center items-center bg-purple-700 md:justify-start">
      <Link to="/">
        <img className="h-5 md:ml-28" src="/logo.svg" alt="the movie db" />
      </Link>
    </header>
  );
}
