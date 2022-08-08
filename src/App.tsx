import { Home } from './pages/Home';

export function App() {
  return (
    <>
      <header className="h-14 flex justify-center items-center bg-purple-700 md:justify-start">
        <img className="h-5 md:ml-28" src="/logo.svg" alt="" />
      </header>

      <Home />
    </>
  );
}
