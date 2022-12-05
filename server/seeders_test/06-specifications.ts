import { v4 as uuid } from 'uuid';
import { smartphone, laptop } from './04-types';
import {
  smartphonesIds,
  laptopsIds,
  // accessoriesIds,
  // tabletIds,
} from './05-shop-products';

const smartphoneSpecifications = [];
const laptopSpecifications = [];
// const accessoriesSpecifications = [];
// const tabletSpecifications = [];

for (let laptopId = 0; laptopId < laptopsIds.length; laptopId += 1) {
  const odd = laptopId % 2;
  const even = !odd;
  const makeMacbook = even;
  // const makeHP = laptopsId % 2;
  for (let att = 0; att <= 1; att += 1) {
    const id = uuid();
    const specification = {
      category: 'Key specifications',
      value: makeMacbook ? 'Apple' : 'HP',
      key: 'Manufacturer',
      shopProductId: laptopsIds[laptopId],
      typeId: laptop,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    laptopSpecifications.push(specification);
  }
}

for (let smartphoneId = 0; smartphoneId < laptopsIds.length; smartphoneId += 1) {
  const odd = smartphoneId % 2;
  const even = !odd;
  const makeiPhone = even;
  const makeA53 = odd;
  for (let att = 0; att <= 36; att += 1) {
    const id = uuid();
    const specification = {
      category: '',
      value: 'Value',
      key: 'Key',
      shopProductId: smartphonesIds[smartphoneId],
      typeId: smartphone,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (att < 4) {
      specification.category = 'Key specifications';
    } else if (att < 8) {
      if (makeA53) {
        if (att === 5) {
          specification.key = 'Model name';
          specification.value = 'Galaxy A53';
        }
        if (att === 6) {
          specification.key = 'Manufacturer';
          specification.value = 'Samsung';
        }
        if (att === 7) {
          specification.key = 'Type';
          specification.value = 'Smartphone';
        }
      }
      if (makeiPhone) {
        if (att === 5) {
          specification.key = 'Model name';
          specification.value = 'iPhone 14';
        }
        if (att === 6) {
          specification.key = 'Manufacturer';
          specification.value = 'Apple';
        }
        if (att === 7) {
          specification.key = 'Type';
          specification.value = 'Smartphone';
        }
      }
      specification.category = 'General information';
    } else if (att < 10) {
      specification.category = 'Material';
    } else if (att < 15) {
      specification.category = 'Display properties';
      if (makeA53) {
        if (att === 10) {
          specification.key = 'Display size (in)';
          specification.value = '6.50"';
        }
        if (att === 11) {
          specification.key = 'Resolution';
          specification.value = '2400x1080';
        }
        if (att === 12) {
          specification.key = 'Ratio';
          specification.value = '20:9';
        }
      }
      if (makeiPhone) {
        if (att === 10) {
          specification.key = 'Display size (in)';
          specification.value = '6.10"';
        }
        if (att === 11) {
          specification.key = 'Resolution';
          specification.value = '2556x1179';
        }
        if (att === 13) {
          specification.key = 'Ratio';
          specification.value = '19.5:9';
        }
      }
    } else if (att < 17) {
      specification.category = 'Operating system';
      if (makeA53 && att === 15) {
        specification.key = 'Operating system';
        specification.value = 'Android 11';
      } else if (makeiPhone && att === 15) {
        specification.key = 'Operating system';
        specification.value = 'iOS 16';
      }
    } else if (att < 19) {
      specification.category = 'Camera';
      if (makeA53) {
        if (att === 17) {
          specification.key = 'Front';
          specification.value = '32MP';
        } else if (att === 18) {
          specification.key = 'Rear';
          specification.value = '64MP';
        }
      }
      if (makeiPhone) {
        if (att === 17) {
          specification.key = 'Front';
          specification.value = '12MP';
        } else if (att === 18) {
          specification.key = 'Rear';
          specification.value = '48MP';
        }
      }
    } else if (att < 22) {
      specification.category = 'Processor';
    } else if (att < 24) {
      specification.category = 'Data storage';
      if (smartphoneId > 4) {
        if (att === 23) {
          specification.key = 'Storage capacity';
          specification.value = '128GB';
        }
      } else if (att === 23) {
        specification.key = 'Storage capacity';
        specification.value = '256GB';
      }
      if (att === 22) {
        specification.key = 'Memory';
        specification.value = '6GB';
      }
    } else if (att < 27) {
      specification.category = 'SIM';
    } else if (att < 28) {
      specification.category = 'Battery';
      if (makeA53 && att === 27) {
        specification.key = 'Capacity';
        specification.value = '5,000mAH';
      } else {
        specification.key = 'Capacity';
        specification.value = '4,325mAh';
      }
    } else if (att < 32) {
      specification.category = 'Connectivity';
      if (att === 28) {
        specification.key = 'Standard';
        specification.value = '5G';
      }
    } else if (att <= 36) {
      specification.category = 'Dimensions';
    }
    smartphoneSpecifications.push(specification);
  }
}

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Specification', [
    ...smartphoneSpecifications,
    ...laptopSpecifications,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Specification', null, {}),
};
