import { Header } from '@Components/Header';
import { Loading } from '@Components/Loading';
import { MovieCard } from '@Components/MovieCard';
import { useFetch } from '@Hooks/useFetch';
import { useParams } from 'react-router-dom';

type Cast = {
  id: number;
  title: string;
  poster_path: string;
};

type PersonData = {
  id: number;
  name: string;
  profile_path: string;
  place_of_birth: string;
  biography: string;
  birthday: string;
  known_for_department: string;
  also_known_as: string[];
  gender: number;
  movie_credits: {
    cast: Cast[];
  };
};

export function Person() {
  const { id } = useParams();
  const { data } = useFetch<PersonData>(
    `https://api.themoviedb.org/3/person/${id}`,
    {
      params: {
        append_to_response: 'movie_credits',
      },
    }
  );

  const birthday = data && data.birthday?.length > 0 && new Date(data.birthday);

  const calculateAge = (birthday: Date) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen grid grid-cols-1 justify-center gap-8 py-8 px-4 text-gray-800 md:grid-cols-[25%,60%] md:py-12">
        <section className="flex flex-col gap-4">
          <img
            className="max-w-[23rem] w-4/5 min-h-72 rounded-lg drop-shadow-md object-cover bg-purple-700 mx-auto md:w-full"
            src={
              import.meta.env.VITE_API_IMAGE_BASE_URL + data.profile_path || ''
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/error.svg';
            }}
            alt={data.name}
          />

          <h2 className="text-xl font-bold">Personal Info</h2>

          <p className="grid">
            <strong>Known For</strong>
            <span>{data.known_for_department}</span>
          </p>

          <p className="grid">
            <strong>Known Credits</strong>
            <span>{data.movie_credits.cast.length}</span>
          </p>

          <p className="grid">
            <strong>Gender</strong>
            <span>{data.gender > 1 ? 'Male' : 'Female'}</span>
          </p>

          <p className="grid">
            <strong>Birthday</strong>
            {birthday && (
              <span className="flex gap-1">
                {Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }).format(birthday)}

                <span>({calculateAge(birthday)} years old)</span>
              </span>
            )}
          </p>

          <p className="grid">
            <strong>Place of Birth</strong>
            <span>{data.place_of_birth}</span>
          </p>

          <div className="grid">
            <strong>Also Known As</strong>
            <div className="flex flex-col gap-2">
              {data.also_known_as.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold mb-8">{data.name}</h1>

          <h2 className="text-xl font-bold">Biography</h2>
          <p>
            {data.biography ||
              "We don't have an overview translated in English."}
          </p>

          <strong className="text-lg font-bold mt-4 mb-4 md:mt-8">
            Known For
          </strong>
          <div className="w-full grid grid-flow-col overflow-x-auto gap-4 px-4 pb-4 justify-start text-center">
            {data.movie_credits.cast && data.movie_credits.cast.length > 13 ? (
              data.movie_credits.cast.slice(0, 12).map((movie) => {
                const imageUrl = movie.poster_path
                  ? import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path
                  : '';
                return (
                  <MovieCard
                    key={movie.id}
                    imageUrl={imageUrl}
                    title={movie.title}
                    path={`../movie/${movie.id}`}
                    responsive={false}
                  />
                );
              })
            ) : data.movie_credits.cast &&
              data.movie_credits.cast.length > 0 ? (
              data.movie_credits.cast.map((movie) => {
                const imageUrl = movie.poster_path
                  ? import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path
                  : '';
                return (
                  <MovieCard
                    key={movie.id}
                    imageUrl={imageUrl}
                    title={movie.title}
                    path={`../movie/${movie.id}`}
                    responsive={false}
                  />
                );
              })
            ) : (
              <span className="text-gray-800 text-lg">
                {"We don't have a cast list for this movie."}
              </span>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
