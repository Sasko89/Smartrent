import { atom, selector } from 'recoil';
import rentOptions from '../rentOptions';

export const rentTypeState = atom<string>({
  key: 'rentTypeState',
  default: '',
});

export const rentDaysState = atom<number>({
  key: 'rentDaysState',
  default: 1,
});

export const activeStepState = atom<string>({
  key: 'activeStepState',
  default: '',
});

export const personalIdState = atom<number>({
  key: 'personalIdState',
  default: 0,
});

export const currentMilageState = atom<number>({
  key: 'currentMilageState',
  default: 0,
});

export const returnMilageState = atom<number>({
  key: 'returnMilageState',
  default: 0,
});

export const startDateState = atom<string>({
  key: 'startDateState',
  default: '',
});

export const calcDateState = atom<number>({
  key: 'calcDateState',
  default: null,
});

export const endDateState = atom<number>({
  key: 'endDateState',
  default: null,
});

export const PaymentState = atom({
  key: 'PaymentState',
  default: null,
});

export const removeIdState = atom({
  key: 'removeIdState',
  default: null,
});

export const BookingPriceState = selector<number>({
  key: 'BookingPriceState',
  get: ({ get }) => {
    const rentType = get(rentTypeState);
    const rentDays = get(rentDaysState);

    switch (rentType) {
      case 'Cykel':
        return Math.floor(rentOptions[0].price * rentDays);
      case 'Bil':
        return Math.floor(rentOptions[1].price * rentDays);
      case 'Husbil':
        return Math.floor(rentOptions[2].price * rentDays);
    }
  },
});

export const rentCostState = selector<number>({
  key: 'rentCostState',
  get: ({ get }) => {
    const payment = get(PaymentState);
    const endDate: number = get(endDateState);
    if (payment) {
      const timeDiff = endDate - payment.calcDate;
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      switch (payment.rentType) {
        case 'Cykel':
          return Math.floor(rentOptions[0].price * dayDiff);
        case 'Bil':
          return Math.floor(rentOptions[1].price * dayDiff);
        case 'Husbil':
          return Math.floor(rentOptions[2].price * dayDiff);
      }
    }
  },
});

export const distanceCostState = selector<number>({
  key: 'distanceCostState',
  get: ({ get }) => {
    const payment = get(PaymentState);
    const returnMilage = get(returnMilageState);

    if (payment) {
      const baseFee: number = 29;
      const distanceDiff: number = returnMilage - payment.currentMilage;

      switch (payment.rentType) {
        case 'Cykel':
          return 0;
        case 'Bil':
          return Math.floor(baseFee * distanceDiff);
        case 'Husbil':
          return Math.floor(baseFee * distanceDiff * 1.3);
      }
    }
  },
});

export const totalCostState = selector<number>({
  key: 'totalCostState',
  get: ({ get }) => {
    const payment = get(PaymentState);
    const rentCost = get(rentCostState);
    const distanceCost = get(distanceCostState);

    if (payment) {
      return rentCost + distanceCost;
    }
  },
});
