import Image, { StaticImageData } from 'next/image';

export const ProfilePicture = ({
  src,
  alt,
  className,
  size,
}: {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  size: number;
}) => {
  return (
    <div>
      <Image
        src={src}
        className={`rounded-full outline outline-primary-dark outline-2 outline-offset-2 ${className}`}
        width={size}
        height={size}
        alt={alt}
      />
    </div>
  );
};
