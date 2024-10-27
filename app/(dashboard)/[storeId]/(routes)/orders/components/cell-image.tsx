"use client";

import Image from "next/image";

interface CellImageProps {
  imageUrl: string[];
}

export const CellImage = ({ imageUrl }: CellImageProps) => {
  return (
    <>
      {imageUrl.map((img, i) => (
        <div
          key={i}
          className="overflow-hidden w-32 min-h-16 min-w-32 relative rounded-md shadow-md"
        >
          <Image fill src={img} alt="Billboard image" />
        </div>
      ))}
    </>
  );
};
