import { Link } from 'react-router-dom';

type CardProps = {
  imageUrl: string;
  title: string;
  date?: Date;
  path?: string;
}

export function MovieCard({ imageUrl, title, date, path = '#' }: CardProps) {
  return (
    <Link
      className="max-w-[calc(50%-.5rem)] flex flex-col hover:opacity-80 md:max-w-[calc(33.3%-1rem)] lg:max-w-[11rem]"
      to={path}
      title={title}
    >
      <img
        className="object-cover rounded lg:w-[11rem] lg:h-[16.5rem] shadow bg-gray-200 text-transparent lg:max-h-[16.5rem]"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = '/error-light.svg';
        }}
        src={imageUrl}
        alt={title}
      />
      <strong className="text-sm mt-2.5 capitalize text-black">
        {title}
      </strong>
      <time className="text-xs leading-[1.125rem] text-gray-600 uppercase font-bold">
        {
          date
            ? Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }).format(date)
            : ''
        }
      </time>
    </Link>
  );
}
