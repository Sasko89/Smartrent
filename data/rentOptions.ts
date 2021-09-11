import carImg from '../public/static/icons/car.png';
import motorHomeImg from '../public/static/icons/motorhome.png';
import bikeImg from '../public/static/icons/bike.png';

const basePrice: number = 299;

interface options {
  title: string;
  pic: string;
  price: number;
}

export default [
  {
    title: 'Cykel',
    pic: bikeImg,
    price: basePrice,
  },
  {
    title: 'Bil',
    pic: carImg,
    price: basePrice * 1.3,
  },
  {
    title: 'Husbil',
    pic: motorHomeImg,
    price: basePrice * 1.8,
  },
];
