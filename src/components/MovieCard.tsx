import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

type CardProps = {
  imageUrl: string;
  title: string;
  date?: Date;
  path?: string;
  responsive?: boolean;
};

export function MovieCard({
  imageUrl,
  title,
  date,
  path = '#',
  responsive = true,
}: CardProps) {
  const { theme } = useTheme();

  return (
    <Link
      className={`flex flex-col hover:opacity-80 lg:max-w-[11rem] ${
        responsive
          ? 'max-w-[calc(50%-.5rem)] md:max-w-[calc(33.3%-1rem)]'
          : 'w-[11rem]'
      }`}
      to={path}
      title={title}
    >
      <img
        className="object-cover rounded shadow text-transparent lg:w-[11rem] lg:h-[16.5rem] lg:max-h-[16.5rem]"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            theme === 'light' ? '/error-light.svg' : '/error.svg';
          currentTarget.style.border = '3px solid #A4A4A4';
        }}
        src={imageUrl}
        alt={title}
      />
      <strong className="text-sm mt-2.5 capitalize text-black dark:text-gray-300">
        {title}
      </strong>
      <time className="text-xs leading-[1.125rem] text-gray-600 uppercase font-bold dark:text-gray-500">
        {date
          ? Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(date)
          : ''}
      </time>
    </Link>
  );
}
