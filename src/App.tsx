import { Route, Routes } from 'react-router-dom';
import { Details } from './pages/Details';
import { Home } from './pages/Home';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":page" element={<Home />} />
      </Route>
      <Route path="movie/:id" element={<Details />} />
    </Routes>
  );
}
