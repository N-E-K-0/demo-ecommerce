import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type ShowImageProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ShowImage({
  src,
  alt,
  width,
  height,
  className,
}: ShowImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={"rounded-md" + className}
    />
  );
}
