import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { MovieCard } from '../components/MovieCard';
import { useFetch } from '../hooks/useFetch';

type Genre = {
  id: number;
  name: string;
}

type Video = {
  iso_639_1: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}

type ReleaseDate = {
  iso_639_1: string;
  certification: string;
}

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

type Crew = {
  id: number;
  name: string;
  job: string;

}

type Recommendation = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

type MovieDetailsType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
  videos: {
    results: Video[];
  };
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: ReleaseDate[];
    }[];
  };
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  recommendations: {
    results: Recommendation[];
  }
}

type MathOperationType = 'floor' | 'ceil' | 'round';

export function Details() {
  const { id } = useParams();
  const { data } = useFetch<MovieDetailsType>(`movie/${id}`, {
    params: {
      append_to_response: 'recommendations,videos,credits,release_dates'
    }
  });

  const decimalAdjust = (type: MathOperationType, value: number, exp?: number) => {
    // If the exp is undefined or zero
    if (typeof exp === 'undefined' || exp === 0) {
      return Math[type](value);
    }

    // If the value is not a number or the exp is not an integer
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    let valueArray = value.toString().split('e');
    value = Math[type](+(valueArray[0] + 'e' + (valueArray[1] ? (+valueArray[1] - exp) : -exp)));
    // Shift back
    valueArray = value.toString().split('e');
    return +(valueArray[0] + 'e' + (valueArray[1] ? (+valueArray[1] + exp) : exp));
  };

  if (!data) {
    return <Loading />;
  }

  const movieNote = decimalAdjust('ceil', data.vote_average, -1) * 10;
  const trailer = data.videos.results.find(video => video.official === true && video.type === 'Trailer' && video.iso_639_1 === 'en' && video.site === 'YouTube');

  const movieDate = data.release_date
    ? Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(new Date(data.release_date))
    : '';

  const postImage = data.poster_path ? import.meta.env.VITE_API_IMAGE_BASE_URL + data.poster_path : '';
  const releaseCertification = data.release_dates.results.find(releases => releases.iso_3166_1 === 'US')?.release_dates
    .find(releases => releases.iso_639_1 === 'en' && releases.certification);

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 mb-6">
        <section className="flex flex-col bg-purple-900 py-9 px-4 md:flex-row md:justify-center md:gap-8">
          <img
            className="max-w-[23rem] w-3/5 min-h-72 rounded-lg drop-shadow-md object-cover bg-purple-700 mx-auto mb-8 md:mx-0 md:mt-auto md:-mb-20"
            src={postImage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/error.svg';
            }}
            alt={data.title}
          />

          <div className="md:mt-auto md:max-w-[60%]">
            <div>
              <h1 className="font-bold text-3xl text-white">
                {data.title}
              </h1>
              <div className="flex flex-col text-white text-lg">
                {
                  releaseCertification &&
                  <span>{releaseCertification.certification}</span>
                }
                <span>{movieDate}</span>
                <span>{data.genres.map(genre => genre.name)}</span>
                <span>{`${Math.floor(data.runtime / 60)}h ${Math.ceil(data.runtime % 60)}m`}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 my-6">
              <svg width="60" viewBox="0 0 55 55" className="-rotate-90 bg-white/10 rounded-full">
                <circle
                  className="stroke-green-500 stroke-[5px]"
                  cx="27"
                  cy="27" r="24"
                  fill="none"
                  strokeDasharray="148"
                  strokeDashoffset={148 - (148 * (movieNote) / 100)}
                  strokeLinecap="round"
                />
                <text
                  className="text-sm font-bold fill-green-500"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  transform="rotate(90, 28, 27)"
                  x="27"
                  y="28"
                >
                  {movieNote}%
                </text>
              </svg>
              <span className="w-28 text-white">
                User Score
              </span>
            </div>

            <strong className="text-white text-xl leading-6 mb-2">
              Synopsis
            </strong>

            <p className="text-gray-200">
              {data.overview || 'We don\'t have an overview translated in English.'}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {
                data.credits.crew && data.credits.crew.length > 7
                  ? data.credits.crew.slice(0, 6).map(person => {
                    return (
                      <div key={`${person.id}-job`} className="flex flex-col text-white">
                        <span className="font-bold">{person.name}</span>
                        <span className="text-sm">{person.job}</span>
                      </div>
                    );
                  })
                  : data.credits.crew && data.credits.crew.length > 0

                    ? data.credits.crew.map(person => {
                      return (
                        <div key={`${person.id}-job`} className="flex flex-col text-white">
                          <span className="font-bold">{person.name}</span>
                          <span className="text-sm">{person.job}</span>
                        </div>
                      );
                    })

                    : (
                      <span className="text-gray-200">
                        {'We don\'t have a crew list for this film.'}
                      </span>)
              }
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6 md:w-[90%] md:mx-auto lg:w-[80%] md:min-h-[50vh]">
          <section className="flex flex-col gap-3 md:mt-12">
            <h2 className="text-3xl font-bold text-gray-800 ml-4">Original cast</h2>

            <div className="w-full grid grid-flow-col overflow-x-auto gap-4 px-4 pb-4 justify-start">
              {
                data.credits.cast && data.credits.cast.length > 13
                  ? data.credits.cast.slice(0, 12).map(person => {
                    const imageUrl = person.profile_path ? import.meta.env.VITE_API_IMAGE_BASE_URL + person.profile_path : '';
                    return (
                      <Card
                        key={person.id}
                        imageUrl={imageUrl}
                        title={person.name}
                        description={person.character}
                        path={`../person/${person.id}`}
                      />
                    );
                  })

                  : data.credits.cast && data.credits.cast.length > 0
                    ? data.credits.cast.map(person => {
                      const imageUrl = person.profile_path ? import.meta.env.VITE_API_IMAGE_BASE_URL + person.profile_path : '';
                      return (
                        <Card
                          key={person.id}
                          imageUrl={imageUrl}
                          title={person.name}
                          description={person.character}
                          path={`../person/${person.id}`}
                        />
                      );
                    })

                    : <span className="text-gray-800 text-lg">
                      {'We don\'t have a cast list for this movie.'}
                    </span>
              }
            </div>
          </section>

          {
            trailer &&
            <section className="flex flex-col gap-3 px-4 md:w-[80%] lg:w-[70%]">
              <h2 className="text-2xl leading-8 font-bold text-gray-800">Trailer</h2>

              <div className="flex justify-center bg-gray-800 rounded overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  id="ytplayer"
                  itemType="text/html"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0" />
              </div>
            </section>
          }

          <section className="flex flex-col gap-4 px-4">
            <h2 className="text-3xl font-bold text-gray-800">Recommendations</h2>

            <div className="flex flex-wrap gap-4">
              {
                data.recommendations.results && data.recommendations.results.length > 8
                  ? data.recommendations.results.slice(0, 7).map(movie => {
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

                  : data.recommendations.results && data.recommendations.results.length > 0

                    ? data.recommendations.results.map(movie => {
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

                    : <span className="text-lg text-gray-800">
                      {'We don\'t have a recommendation list for this movie.'}
                    </span>
              }
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
