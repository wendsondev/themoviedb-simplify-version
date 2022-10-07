import { useTheme } from '@/hooks/useTheme';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 flex items-center px-4 bg-purple-700 md:justify-between md:px-28">
      <Link to="/" className="w-full">
        <img className="h-5" src="/logo.svg" alt="the movie db" />
      </Link>

      <button className="text-gray-200" onClick={toggleTheme}>
        {theme === 'dark' ? (
          <MdDarkMode size={38} className="animate-[spin_.5s_ease-in-out]" />
        ) : (
          <MdLightMode size={38} className="animate-[spin_.5s_ease-in-out]" />
        )}
      </button>
    </header>
  );
}
