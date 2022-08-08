type CardProps = {
  imageUrl: string;
  title: string;
  date?: Date;
}

export function MovieCard({ imageUrl, title, date }: CardProps) {
  return (
    <div className="max-w-[calc(50%-.5rem)] flex flex-col md:max-w-[calc(33.3%-1rem)] lg:max-w-[11rem]">
      <img
        className="object-cover rounded lg:w-[11rem] lg:h-[16.5rem] shadow bg-gray-200"
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
    </div>
  );
}
