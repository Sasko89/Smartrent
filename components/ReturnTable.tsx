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
    <div className="flex flex-col items-center justify-center w-full h-full py-2 space-y-4 rounded-lg lg:col-span-10 md:col-span-9 ">
      <div className="table w-full ">
        <div className="table-row-group ">
          <div className="table-row text-sm text-white bg-green-700 md:text-base ">
            <div className="table-cell p-4 ">Personnummer</div>
            <div className="table-cell ">Bokningsnummer</div>
            <div className="table-cell ">Fordon</div>
            <div className="table-cell ">Datum</div>
            <div className="table-cell ">Mätarställning</div>
          </div>
          {customers?.docs.map((e) => (
            <div
              key={e.id}
              className="table-row text-xs md:text-sm hover:bg-gray-200 hover:cursor-pointer "
              onClick={() => {
                setPayment(e.data());
                setRemoveId(e.id);
                setActiveStep('Betalning');
              }}
            >
              <div className="table-cell p-4 ">{e.data().personalId}</div>
              <div className="table-cell ">{e.id}</div>
              <div className="table-cell ">{e.data().rentType}</div>
              <div className="table-cell ">{e.data().startDate}</div>
              <div className="table-cell ">{e.data().currentMilage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReturnTable;
