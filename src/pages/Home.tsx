import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { MovieCard } from '../components/MovieCard';
import { PaginationController } from '../components/PaginationController';
import { useFetch } from '../hooks/useFetch';

type Genre = {
  id: number;
  name: string;
}

type MovieFetch = {
  page: number;
  total_pages: number;
  results: {
    id: number,
    title: string;
    poster_path: string;
    genre_ids: number[],
    release_date: string;
  }[];
}

export function Home() {
  const { page } = useParams();
  const navigate = useNavigate();
  const { data } = useFetch<{ genres: Genre[] }>('/genre/movie/list?language=en-US');
  const [genresFiltered, setGenresFiltered] = useState<number[]>([]);
  const { data: movies } = useFetch<MovieFetch>(`/movie/popular?language=en-US&page=${page}`);

  const filteredMovies = genresFiltered.length > 0 && movies
    ? { ...movies, results: movies.results.filter(movie => genresFiltered.every(id => movie.genre_ids.includes(id))) }
    : movies;

  const handleFilteringChange = (genreId: number) => {
    const newList = genresFiltered.some(id => id === genreId)
      ? genresFiltered.filter(id => id !== genreId)
      : [...genresFiltered, genreId];

    setGenresFiltered(newList);

    localStorage.setItem('themoviedb@genres-filtered', JSON.stringify(newList));
  };

  const handleChangePage = (page: number) => {
    navigate(`../${page}`);
  };

  useEffect(() => {
    const storageJson = localStorage.getItem('themoviedb@genres-filtered');
    const storage = storageJson ? JSON.parse(storageJson) as number[] : [];

    if (storage.length > 0) {
      setGenresFiltered(storage);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="bg-purple-900">
          <div className="max-w-5xl flex flex-col px-4 py-10 text-white mx-auto md:items-center">
            <h1 className="text-2xl leading-[1.75rem] font-bold md:text-5xl md:text-center">
              Millions of movies, series and people to discover. Explore now.
            </h1>

            <span className="mt-9 font-bold text-sm uppercase">
              filter by:
            </span>

            <div className="mt-2 flex flex-wrap gap-3 md:justify-center">
              {
                data?.genres.map(genre => {
                  const filterIsActive = genresFiltered.includes(genre.id);

                  return (
                    <button
                      key={genre.id}
                      onClick={() => handleFilteringChange(genre.id)}
                      className={`flex gap-2 items-center text-gray-800 font-bold py-1.5 px-5 rounded transition-colors hover:bg-orange-700 hover:text-white md:py-2 md:px-4 ${filterIsActive ? 'bg-orange-700 text-white' : 'bg-white'}`}>
                      {genre.name}
                      {filterIsActive && <AiFillCloseCircle className="text-white" size={18} />}
                    </button>
                  );
                })
              }
            </div>
          </div>
        </section>

        <section className="min-h-screen">
          {
            filteredMovies && movies
              ? <>
                <div className={`flex flex-wrap gap-4 py-8 px-4 mx-auto 
                  ${filteredMovies.results.length > 0
                    ? 'md:w-4/5 lg:grid lg:w-5/6 lg:grid-cols-[repeat(6,_minmax(0,_11rem))] xl:grid-cols-[repeat(7,_minmax(0,_11rem))] 2xl:grid-cols-[repeat(8,_minmax(0,_11rem))]'
                    : 'justify-center items-center min-h-[70vh]'}
                  `}
                >
                  {
                    filteredMovies.results.length > 0
                      ? filteredMovies.results.map(movie => {
                        const date = movie.release_date ? new Date(movie.release_date) : undefined;
                        const imageUrl = movie.poster_path ? import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path : '';
                        return (
                          <MovieCard
                            key={movie.id}
                            imageUrl={imageUrl}
                            title={movie.title}
                            date={date}
                            path={`../movie/${movie.id}`}
                          />
                        );
                      })
                      : <p className="text-4xl text-bold text-gray-600">No movies found</p>
                  }
                </div>
                {
                  genresFiltered.length === 0 &&
                  <PaginationController
                    currentPage={movies.page}
                    maxItems={5}
                    totalPages={movies.total_pages > 500 ? 500 : movies.total_pages}
                    setPage={handleChangePage}
                  />
                }
              </>
              : <Loading />
          }
        </section>
      </main>
    </>
  );
}
