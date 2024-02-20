import React from 'react';
import { Badge, Button } from 'tdesign-react';
import s from './index.module.scss';

interface IMicroFePopup {
  count?: number;
  onClick?: () => void;
}

/**
 *
 * @param props
 * @returns
 */
export default function microFePopup(props: IMicroFePopup): React.ReactElement {
  const { count = 0 } = props;

  const onClickHandle = () => {
    props.onClick?.();
  };

  return (
    <div className={s['micro-fe-popup']}>
      <Badge count={count} dot={false} maxCount={99} shape="circle" showZero={false} size="medium">
        <Button
          block={false}
          ghost={false}
          loading={false}
          shape="rectangle"
          size="medium"
          type="button"
          variant="base"
          theme="warning"
          onClick={onClickHandle}
        >
          Micro Config
        </Button>
      </Badge>
    </div>
  );
}
