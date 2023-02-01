import React from 'react';
import { ReactComponent as RepairsIcon } from '../../assets/icons/Repairs.svg';
import { ReactComponent as DeliveryIcon } from '../../assets/icons/Delivery.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/Chat.svg';
import SectionHeader from './SectionHeader';
import Box from './Box';

function Guarantees() {
  return (
    <div className="guarantees" id="guarantees">
      <SectionHeader
        header="Why DeviceShop?"
        colorStyle="light"
      />
      <div className="bg" />
      <div className="row">
        <Box
          title="Repairs &amp; spare parts"
          description="Mail-in replacement service or get spare parts shipped to your home."
          Icon={RepairsIcon}
        />
        <Box
          title="Tracked delivery"
          description="Enjoy reliable, prompt delivery for all goods."
          Icon={DeliveryIcon}
        />
        <Box
          title="24/7 support"
          description="Our trained technicians can assist  you at any time."
          Icon={ChatIcon}
        />
      </div>
    </div>
  );
}

export default Guarantees;
