import { v4 as uuid } from 'uuid';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('ShopElement', [
    {
      reference: 'front-page-slider-foreground',
      image: 'seeder-f81f2d60-cc20-413d-b2fb-8cf48ca8e3de.png',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-one',
      image: 'seeder-912a591b-d7cc-4887-944c-85a0c3752fef.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-two',
      image: 'seeder-8ef718f3-770d-423d-88c1-d49f6e7b422d.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-three',
      image: 'seeder-8560ead6-9afc-4da5-aca4-41a22f1401f4.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-four',
      image: 'seeder-73c02458-fda6-4e8d-92e5-e490e47a3cdb.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-five',
      image: 'seeder-445dda37-bdff-4a2c-9e50-9ce031216910.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-six',
      image: 'seeder-31ca5625-795e-441d-9a40-858d661556cb.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-seven',
      image: 'seeder-7946c06f-5402-4b76-bc16-cbc9d296109d.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-eight',
      image: 'seeder-6e99ecac-2fdc-49da-942b-359187bea43a.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-nine',
      image: 'seeder-a1cedec9-ebaf-469f-8ee9-f040d1de9ecb.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-ten',
      image: 'seeder-03ebf11d-39b8-4bcd-bd48-5d3c89de7554.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-eleven',
      image: 'seeder-c8d439da-b54a-477c-9cb2-39dba419c8c0.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reference: 'front-page-links-row-box-twelve',
      image: 'seeder-3e161864-77e2-417c-ad72-396a0d3ca2bd.jpg',
      to: 'shop',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ShopElement', null, {}),
};
