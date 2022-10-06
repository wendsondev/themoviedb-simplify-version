import { Details } from '@Pages/Details';
import { Home } from '@Pages/Home';
import { Person } from '@Pages/Person';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":page" element={<Home />} />
      </Route>
      <Route path="movie/:id" element={<Details />} />
      <Route path="person/:id" element={<Person />} />
    </Routes>
  );
}
