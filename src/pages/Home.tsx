import { Loading } from '../components/Loading';
import { MovieCard } from '../components/MovieCard';
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
  const { data } = useFetch<{ genres: Genre[] }>('/genre/movie/list?language=en-US');
  const { data: movies } = useFetch<MovieFetch>('/movie/popular?language=en-US&page=1');

  return (
    <main>
      <div className="bg-purple-900">
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
                return (
                  <button
                    key={genre.id}
                    className="bg-white text-gray-800 font-bold py-1.5 px-5 rounded transition-colors hover:bg-orange-700 hover:text-white md:py-2 md:px-4">
                    {genre.name}
                  </button>
                );
              })
            }
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-8 px-4 mx-auto lg:w-4/5">
        {
          movies
            ? (
              <>
                {
                  movies.results.map(movie => {
                    return (
                      <MovieCard
                        key={movie.id}
                        imageUrl={import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path}
                        title={movie.title}
                        date={new Date()}
                      />
                    );
                  })
                }
              </>)
            : (
              <Loading />)
        }
      </div>
    </main>
  );
}
