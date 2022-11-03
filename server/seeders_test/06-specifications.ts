import { v4 as uuid } from 'uuid';
import { smartphone } from './04-types';
import {
  smartphonesIds,
  // laptopsIds,
  // accessoriesIds,
  // tabletIds,
} from './05-shop-products';

const smartphoneSpecifications = [];
// const laptopSpecifications = [];
// const accessoriesSpecifications = [];
// const tabletSpecifications = [];

for (let smartphoneId = 0; smartphoneId < smartphonesIds.length; smartphoneId += 1) {
  const makeiPhone = smartphoneId % 2 === 0;
  const makeA53 = smartphoneId % 2;
  for (let m = 0; m <= 36; m += 1) {
    const id = uuid();
    const specification = {
      category: '',
      value: 'Value',
      key: 'Key specifications',
      shopProductId: smartphonesIds[smartphoneId],
      typeId: smartphone,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (m < 4) {
      specification.category = 'Key specifications';
    } else if (m < 8) {
      if (makeA53 && m === 5) {
        specification.key = 'Model name';
        specification.value = 'Galaxy A53';
      } else if (makeiPhone && m === 5) {
        specification.key = 'Model name';
        specification.value = 'iPhone 14';
      }
      if (makeA53 && m === 6) {
        specification.key = 'Manufacturer';
        specification.value = 'Samsung';
      } else if (makeiPhone && m === 6) {
        specification.key = 'Manufacturer';
        specification.value = 'Apple';
      }
      specification.category = 'General information';
    } else if (m < 10) {
      specification.category = 'Material';
    } else if (m < 15) {
      specification.category = 'Display properties';
      if (makeA53) {
        if (m === 10) {
          specification.key = 'Display size (in)';
          specification.value = '6.50"';
        }
        if (m === 11) {
          specification.key = 'Resolution';
          specification.value = '2400x1080';
        }
        if (m === 12) {
          specification.key = 'Ratio';
          specification.value = '20:9';
        }
      }
      if (makeiPhone) {
        if (m === 10) {
          specification.key = 'Display size (in)';
          specification.value = '6.10"';
        }
        if (m === 11) {
          specification.key = 'Resolution';
          specification.value = '2556x1179';
        }
        if (m === 13) {
          specification.key = 'Ratio';
          specification.value = '19.5:9';
        }
      }
    } else if (m < 17) {
      specification.category = 'Operating system';
      if (makeA53 && m === 15) {
        specification.key = 'Operating system';
        specification.value = 'Android 11';
      } else if (makeiPhone && m === 15) {
        specification.key = 'Operating system';
        specification.value = 'iOS 16';
      }
    } else if (m < 19) {
      specification.category = 'Camera';
      if (makeA53) {
        if (m === 17) {
          specification.key = 'Front';
          specification.value = '32MP';
        } else if (m === 18) {
          specification.key = 'Rear';
          specification.value = '64MP';
        }
      }
      if (makeiPhone) {
        if (m === 17) {
          specification.key = 'Front';
          specification.value = '12MP';
        } else if (m === 18) {
          specification.key = 'Rear';
          specification.value = '48MP';
        }
      }
    } else if (m < 22) {
      specification.category = 'Processor';
    } else if (m < 24) {
      specification.category = 'Storage';
      if (smartphoneId > 4 && m === 22) {
        specification.key = 'Memory';
        specification.value = '128GB';
      } else if (m === 22) {
        specification.key = 'Memory';
        specification.value = '256GB';
      }
    } else if (m < 27) {
      specification.category = 'SIM';
    } else if (m < 28) {
      specification.category = 'Battery';
      if (makeA53 && m === 27) {
        specification.key = 'Capacity';
        specification.value = '5,000mAH';
      } else {
        specification.key = 'Capacity';
        specification.value = '4,325mAh';
      }
    } else if (m < 32) {
      specification.category = 'Connectivity';
      if (m === 28) {
        specification.key = 'Standard';
        specification.value = '5G';
      }
    } else if (m <= 36) {
      specification.category = 'Dimensions';
    }
    smartphoneSpecifications.push(specification);
  }
}

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Specification', [
    ...smartphoneSpecifications,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Specification', null, {}),
};
