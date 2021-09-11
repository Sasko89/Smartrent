import Head from 'next/head';
import { useRecoilState } from 'recoil';
import Header from '../components/Header';

import OptionCard from '../components/OptionCard';
import { activeStepState } from '../data/atoms/rentData';

import rent_img from '../public/static/icons/rent.png';
import return_img from '../public/static/icons/return.png';

export default function Home() {
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);

  return (
    <>
      <Header />
      <h1 className="p-8 text-5xl font-thin text-center text-warmBlack">
        Vad vill du göra?
      </h1>
      <div className="grid h-full gap-8 px-8 py-8 md:px-20 lg:px-40 sm:grid-cols-2 ">
        <OptionCard
          pic={rent_img}
          title="Hyr ut ett fordon"
          path="/rental"
          mainMenu={true}
          onClick={() => setActiveStep('Fordon')}
        />
        <OptionCard
          pic={return_img}
          title="Återlämning av fordon"
          onClick={() => setActiveStep('Återlämna')}
          path="/returning"
          mainMenu={true}
        />
      </div>
    </>
  );
}
