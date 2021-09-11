import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import { useRecoilState } from 'recoil';
import {
  activeStepState,
  PaymentState,
  removeIdState,
} from '../data/atoms/rentData';
import firebase from '../firebase/firebase';

function ReturnTable() {
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [payment, setPayment] = useRecoilState(PaymentState);
  const [removeId, setRemoveId] = useRecoilState(removeIdState);

  const [customers, customersLoading, customersError] = useCollection(
    firebase.firestore().collection('customers'),
    {}
  );

  return (
    <div className="flex flex-col items-center w-full h-full md:py-20 lg:col-span-10 md:col-span-9 ">
      {/* <div className="table w-full "> */}
      <div className="flex flex-col w-full">
        <div className="grid items-center w-full h-12 grid-cols-8 text-xs tracking-wide text-white bg-green-700 font-base md:rounded-t-lg md:text-sm lg:text-lg ">
          <div className="col-span-2 pl-2 truncate ">Personnr</div>
          <div className="col-span-2 truncate">Bokningsnr</div>
          <div className="col-span-1">Fordon</div>
          <div className="col-span-1">Datum</div>
          <div className="col-span-2">Mätarställning</div>
        </div>
        {customers?.docs.map((e) => (
          <div
            key={e.id}
            className="grid items-center w-full h-12 grid-cols-8 text-xs md:rounded-t-lg md:text-sm lg:text-lg hover:bg-gray-200 hover:cursor-pointer "
            onClick={() => {
              setPayment(e.data());
              setRemoveId(e.id);
              setActiveStep('Betalning');
            }}
          >
            <div className="col-span-2 pl-2 font-semibold">
              {e.data().personalId}
            </div>
            <div className="col-span-2 mr-6 font-light truncate">{e.id}</div>
            <div className="col-span-1 font-semibold tracking-wide ">
              {e.data().rentType}
            </div>
            <div className="col-span-1 font-light ">{e.data().startDate}</div>
            <div className="col-span-2 font-semibold text-center md:text-left ">
              {e.data().currentMilage}
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}

export default ReturnTable;
