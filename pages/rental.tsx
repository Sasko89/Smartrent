import Form from '../components/Form';
import { rentSteps } from '../data/steps';

import OptionCard from '../components/OptionCard';
import Sidebar from '../components/Sidebar';

import { useRecoilState } from 'recoil';
import { activeStepState, rentTypeState } from '../data/atoms/rentData';

import rentOptions from '../data/rentOptions';
import { useEffect } from 'react';

function rental() {
  const [rentType, setRentType] = useRecoilState<string>(rentTypeState);
  const [activeStep, setActiveStep] = useRecoilState<string>(activeStepState);

  useEffect(() => {
    activeStep === '' && setActiveStep('Fordon');
  }, [activeStep]);

  return (
    <div className="grid gap-8 md:grid-cols-12 ">
      <Sidebar systemType="Uthyrning" steps={rentSteps} />
      {activeStep === 'Fordon' && (
        <div className="grid h-40 gap-6 px-6 py-10 lg:mr-10 md:grid-cols-3 md:col-span-9 lg:col-span-10">
          {rentOptions.map((e) => (
            <OptionCard
              key={e.title}
              pic={e.pic}
              title={e.title}
              price={e.price}
              mainMenu={false}
              onClick={() => {
                setRentType(e.title);
                setActiveStep('Uppgifter');
              }}
            />
          ))}
        </div>
      )}

      {activeStep === 'Uppgifter' && <Form />}
      {activeStep === 'Uthyrd' && (
        <div className="flex justify-center mt-40 md:col-span-8 lg:col-span-9">
          <h1 className="text-5xl text-center font-regular">
            Bokningen är slutförd
          </h1>
        </div>
      )}
    </div>
  );
}

export default rental;
