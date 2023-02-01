import React from 'react';
import ShownInView from '../ShownInView';

interface BoxProps {
  Icon: any;
  description: string;
  title: string;
}

function Box({
  Icon,
  description,
  title,
}: BoxProps) {
  return (
    <ShownInView className="box">
      <Icon />
      <h2 className="title">
        {title}
      </h2>
      <p className="description">
        {description}
      </p>
    </ShownInView>
  );
}

export default Box;
