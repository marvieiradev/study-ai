import { useEffect, useState } from "react";
import { FaMicrochip } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";
import { MdLaptopChromebook } from "react-icons/md";

export function Loading({ open }: { open: boolean }) {
  const [index, setIndex] = useState(0);

  const components = [
    <GiBrain className="w-18 h-18 text-xl md:text-3xl  text-violet-600" />,
    <MdLaptopChromebook className="w-18 h-18 text-xl md:text-3xl  text-violet-500" />,
    <FaMicrochip className="w-18 h-18 text-xl md:text-3xl  text-sky-600" />,
    <IoSparkles className="w-18 h-18 text-xl md:text-3xl  text-sky-500" />,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % components.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [components.length]);

  if (!open) return null;

  return (
    <>
      <div className="w-full h-full bg-white/90 fixed inset-x-0 z-50 p-5">
        <div className="flex justify-center items-center h-full w-full">
          <div className="h-xl w-xl flex flex-col items-center bg-gray-50 border-4 border-gray-200 rounded-2xl text-gray-800 p-4 inset-x-0 z-50">
            <div className="justify-center items-center w-full flex flex-col gap-6 mt-8">
              <div className="flex gap-2 items-center justify-center max-w-5xl mb-8">
                <div className="flex flex-col gap-4 items-center">
                  <div
                    key={index}
                    className="animate-in fade-in zoom-in duration-300"
                  >
                    {components[index]}
                  </div>

                  <h1 className="text-lg md:text-2xl bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-sky-500 font-bold">
                    Gerando Estudo...
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
