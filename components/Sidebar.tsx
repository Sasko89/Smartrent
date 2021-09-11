import Image from 'next/image';
import Link from 'next/link';

import arrowBack from '../public/static/icons/arrow_back.png';

import { useRecoilValue } from 'recoil';
import { activeStepState } from '../data/atoms/rentData';

const Step = ({ title, pic, activePic }) => {
  const activeStep = useRecoilValue(activeStepState);

  return (
    <>
      {activeStep == title ? (
        <div className="flex items-center justify-center w-full h-16 rounded-t-md md:ml-10 md:rounded-l-full bg-sand md:justify-start">
          <div className="flex items-center justify-center object-cover h-full p-3 transition md:my-auto w-14 md:mr-1 ">
            <Image src={activePic} alt={title} className="" />
          </div>
          <p className="font-bold text-md text-warmBlack ">{title}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-16 md:ml-10 md:rounded-l-full md:justify-start ">
          <div className="flex items-center justify-center invisible object-cover h-full p-3 transition md:my-auto w-14 md:visible ">
            <Image src={pic} alt="fordon" className="text-white" />
          </div>
          <p className="text-white text-md font-regular ">{title}</p>
        </div>
      )}
    </>
  );
};

function Sidebar({ systemType, steps }) {
  return (
    <div className="flex flex-col w-full md:items-center md:col-span-3 lg:col-span-2 md:h-screen bg-warmBlack">
      <div className="flex pr-8 md:mb-10 ">
        <div className="flex items-center justify-center object-cover w-10 h-full p-2 my-auto mr-2 ">
          <div className="transition hover:scale-110">
            <Link href="/">
              <a>
                <Image
                  src={arrowBack}
                  alt="arrow back"
                  className="cursor-pointer "
                />
              </a>
            </Link>
          </div>
        </div>
        <h1 className="py-8 text-xl font-medium text-gray-50">
          Smart<span className="text-green-400">Rent</span>
          <p className="text-xs tracking-widest text-center text-gray-100 ">
            {systemType}
          </p>
        </h1>
      </div>
      <div className="flex md:w-full md:mt-20 md:flex-col md:items-center ">
        {steps.map((e) => (
          <Step
            key={e.title}
            title={e.title}
            activePic={e.activePic}
            pic={e.pic}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
