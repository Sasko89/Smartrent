import { useRecoilState, useRecoilValue } from 'recoil';
import { returnSteps } from '../data/steps';
import {
  activeStepState,
  distanceCostState,
  endDateState,
  PaymentState,
  removeIdState,
  returnMilageState,
  totalCostState,
} from '../data/atoms/rentData';

import Sidebar from '../components/Sidebar';
import ReturnTable from '../components/ReturnTable';
import Button from '../components/Button';
import { useEffect } from 'react';
import db from '../firebase/db';

function returning() {
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [returnMilage, setReturnMilage] = useRecoilState(returnMilageState);
  const payment = useRecoilValue(PaymentState);
  const removeId = useRecoilValue(removeIdState);
  const distanceCost = useRecoilValue(distanceCostState);
  const totalCost = useRecoilValue(totalCostState);

  useEffect(() => {
    activeStep === '' && setActiveStep('Återlämna');
  }, [activeStep]);

  const deleteRent = async (id) => {
    await db.collection('customers').doc(id).delete();
  };

  return (
    <div className="grid gap-8 md:grid-cols-12 ">
      <Sidebar systemType="Återlämning" steps={returnSteps} />
      {activeStep === 'Återlämna' && (
        <div className="grid w-full h-full py-2 md:px-6 lg:mr-10 md:col-span-9 lg:col-span-10">
          <ReturnTable />
        </div>
      )}

      {activeStep === 'Betalning' && (
        <div className="grid h-40 gap-6 px-6 py-10 lg:mr-10 md:grid-cols-3 md:col-span-9 lg:col-span-10">
          <div className="flex flex-col items-center justify-center w-full h-full md:col-span-8 lg:col-span-9 ">
            <div>
              <h1 className="py-4 text-xl font-light">
                Personnummer:{' '}
                <span className="text-lg font-bold">{payment.personalId}</span>
              </h1>
              <h1 className="py-4 text-xl font-light">
                Bokningsnummer:{' '}
                <span className="text-base font-bold">{removeId}</span>
              </h1>
              <h1 className="py-4 text-xl font-light">
                Fordon:{' '}
                <span className="text-lg font-bold">{payment.rentType}</span>
              </h1>
              <h1 className="py-4 text-xl font-light">
                Uthyrningsdatum:{' '}
                <span className="text-lg font-bold">{payment.startDate}</span>
              </h1>
              {payment.rentType != 'Cykel' && (
                <>
                  <h1 className="py-4 text-xl font-light">
                    Mätarställning vi uthyrning:{' '}
                    <span className="text-lg font-bold">
                      {payment.currentMilage}
                    </span>
                  </h1>
                  <h1 className="py-4 text-lg ">Nuvarande mätarställning: </h1>

                  <input
                    className="w-full px-4 py-2 text-lg bg-white border-2 rounded-lg"
                    type="text"
                    onChange={(e) => setReturnMilage(parseInt(e.target.value))}
                  />
                  <br />
                </>
              )}
              <h1 className="py-4 text-lg ">Återlämningsdatum: </h1>

              <input
                className="w-full px-4 py-2 text-lg bg-white border-2 rounded-lg"
                type="date"
                onChange={(e) => {
                  setEndDate(Date.parse(e.target.value));
                }}
              />
              <h1 className="p-2 mt-8 text-xl font-light ">
                Distanskostnad:{' '}
                <span className="font-semibold">
                  {distanceCost < 0 ? '-' : distanceCost}kr
                </span>
              </h1>
              <h1 className="p-2 text-2xl font-light ">
                Totalt:{' '}
                <span className="font-semibold">
                  {totalCost < 0 ? '-' : totalCost}kr
                </span>
              </h1>
              <div className="flex flex-col">
                <Button
                  description="Bekräfta"
                  css="w-full  py-4 mt-8  bg-green-500 active:bg-green-700"
                  onClick={() => {
                    setEndDate(null);
                    setReturnMilage(null);
                    deleteRent(removeId);
                    setActiveStep('Bekräftelse');
                  }}
                />
                <Button
                  description="Tillbaka"
                  css="w-full py-2 my-4  bg-red-500 active:bg-red-600"
                  onClick={() => {
                    setActiveStep('Återlämna');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeStep === 'Bekräftelse' && (
        <div className="flex justify-center mt-40 md:col-span-8 lg:col-span-9">
          <h1 className="text-5xl font-light text-center">
            Återlämning slutförd
          </h1>
        </div>
      )}
    </div>
  );
}

export default returning;
