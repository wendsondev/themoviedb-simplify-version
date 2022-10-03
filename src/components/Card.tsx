import { Link } from 'react-router-dom';

type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
  path?: string;
};

export function Card({ imageUrl, title, description, path = '#' }: CardProps) {
  return (
    <Link
      className="w-48 flex flex-col gap-4 p-2 bg-white drop-shadow-md transition-opacity hover:opacity-80"
      to={path}
      title={title}
    >
      <img
        className="object-cover rounded bg-gray-200 w-96 min-h-[16.5rem] text-bold text-transparent text-center"
        loading="lazy"
        src={imageUrl}
        alt={title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = '/error-light.svg';
        }}
      />
      <div>
        <strong className="text-lg mt-2.5 capitalize text-black">
          {title}
        </strong>
        <p className="text-gray-800 capitalize">{description}</p>
      </div>
    </Link>
  );
}
