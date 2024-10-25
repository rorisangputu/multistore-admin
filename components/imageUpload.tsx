"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {value && value.length > 0 ? (
        <></>
      ) : (
        <div
          className="w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200
                flex items-center justify-center flex-col gap-3"
        >
          {isLoading ? (
            <>
              <PuffLoader size={30} color="#555" />
              <p>{`${progress.toFixed(2)}%`}</p>
            </>
          ) : (
            <>
              <label>
                <div
                  className="w-full h-full flex flex-col gap-2 items-center
                        justify-center cursor-pointer"
                >
                  <ImagePlus className="h-4 w-4" />
                  <p>Image Upload</p>
                </div>
                <input type="file" accept="image/*" className="" />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
