import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCollection } from 'react-firebase-hooks/firestore';

import {
  rentTypeState,
  rentDaysState,
  activeStepState,
  BookingPriceState,
  personalIdState,
  currentMilageState,
  startDateState,
  calcDateState,
} from '../data/atoms/rentData';
import rentOptions from '../data/rentOptions';

import Button from './Button';
import db from '../firebase/db';

function Form() {
  const rentType = useRecoilValue(rentTypeState);
  const bookingPrice = useRecoilValue(BookingPriceState);

  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [rentDays, setRentDays] = useRecoilState(rentDaysState);
  const [personalId, setPersonalId] = useRecoilState(personalIdState);
  const [currentMilage, setCurrentMilage] = useRecoilState(currentMilageState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [calcDate, setCalcDate] = useRecoilState(calcDateState);

  const sendRent = async () => {
    await db.collection('customers').doc().set({
      rentType: rentType,
      personalId: personalId,
      currentMilage: currentMilage,
      startDate: startDate,
      calcDate: calcDate,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-4 rounded-lg lg:col-span-10 md:col-span-9">
      <div className="flex flex-col p-8 border-2">
        {rentType == 'Cykel' && (
          <>
            <div className="w-40 mx-auto">
              <Image src={rentOptions[0].pic} className="" />
            </div>
            <h1 className="my-6 text-2xl text-center">
              {rentOptions[0].title}
            </h1>
          </>
        )}
        {rentType == 'Bil' && (
          <>
            <div className="w-40 mx-auto">
              <Image src={rentOptions[1].pic} className="" />
            </div>
            <h1 className="my-6 text-2xl text-center">
              {rentOptions[1].title}
            </h1>
          </>
        )}
        {rentType == 'Husbil' && (
          <>
            <div className="w-40 mx-auto">
              <Image src={rentOptions[2].pic} className="" />
            </div>
            <h1 className="my-6 text-2xl text-center">
              {rentOptions[2].title}
            </h1>
          </>
        )}

        <h1 className="mb-2 text-lg font-light text-center">
          Antal dagar att hyra:{' '}
          <span className="font-semibold ">{rentDays}</span>
        </h1>
        <input
          className="mb-4"
          type="range"
          id="rent"
          min="1"
          max="90"
          step="1"
          value={rentDays}
          onChange={(e) => setRentDays(Number(e.target.value))}
        />

        <h1 className="mb-6 text-3xl font-bold text-center">
          <p className="text-base font-light">Prisexempel:</p>
          {bookingPrice}
          <span className="ml-0.5 text-sm font-light">kr</span>
          {rentType !== 'Cykel' && (
            <p className="mt-0.5 text-xs font-thin">exkl distanskostnader</p>
          )}
        </h1>

        <h1 className="my-2 text-lg font-light text-center">Personnummer:</h1>
        <input
          className="p-2 text-lg bg-white border-2 rounded-lg"
          type="text"
          onChange={(e) => setPersonalId(parseInt(e.target.value))}
        />
        {rentType !== 'Cykel' && (
          <>
            <h1 className="my-2 text-lg font-light text-center">
              Mätarställning:<span className="text-xs ml-0.5">(km)</span>
            </h1>
            <input
              className="p-2 text-lg bg-white border-2 rounded-lg"
              type="text"
              onChange={(e) => setCurrentMilage(parseInt(e.target.value))}
            />
          </>
        )}
        <h1 className="my-2 text-lg font-light text-center">Startdatum:</h1>
        <input
          className="p-2 text-lg bg-white border-2 rounded-lg"
          type="date"
          onChange={(e) => {
            setCalcDate(Date.parse(e.target.value));
            setStartDate(e.target.value);
          }}
        />
        <Button
          description="Bekräfta"
          css="mx-auto w-60 py-4 mt-14  p-1 mt-8 bg-green-500 active:bg-green-700"
          onClick={() => {
            sendRent();
            setActiveStep('Uthyrd');
          }}
        />
        <Button
          description="Tillbaka"
          css="mx-auto w-60 py-2 mt-4 bg-red-500 active:bg-red-600"
          onClick={() => {
            setCurrentMilage(null);
            setActiveStep('Fordon');
          }}
        />
      </div>
    </div>
  );
}

export default Form;
