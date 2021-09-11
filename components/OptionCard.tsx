import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';

interface Props {
  pic: any;
  price?: number;
  path?: string;
  mainMenu: boolean;
  title: string;
  onClick: any;
}

function OptionCard({ pic, price, path, mainMenu, title, onClick }: Props) {
  return (
    <div className="flex flex-col items-center p-8 transition bg-white border-2 rounded-md hover:shadow-xl hover:scale-105 min-h-20 ">
      <div className="flex object-cover w-40 h-full p-2 my-6 ">
        <Image src={pic} alt="rental" />
      </div>
      <h1 className="text-2xl font-light text-center text-gray-900 md:text-3xl">
        {title}
      </h1>
      {mainMenu ? (
        <Link href={path ? path : '#'}>
          <a>
            <Button
              description="Välj"
              onClick={onClick}
              css={'w-40 p-1 mt-8 bg-green-500 active:bg-green-700'}
            />
          </a>
        </Link>
      ) : (
        <>
          <div>
            <h1 className="mt-3 text-xl font-light text-center">
              Pris från{' '}
              <span className="font-medium ">{Math.floor(price)}</span>
              <span className="ml-1 text-sm">kr</span>
            </h1>
          </div>
          <Button
            description="Välj"
            onClick={onClick}
            css="w-40 p-1 mt-8 bg-green-500 active:bg-green-700"
          />
        </>
      )}
    </div>
  );
}

export default OptionCard;
