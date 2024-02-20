import React, { memo, useState, useEffect } from 'react';
import { Tag, TdTagProps } from 'tdesign-react';
import { PLACEHOLDER } from '../../constants';
import { isUrlLike } from '../../utils';

interface IHealthStatusProps {
  url?: string;
  active?: boolean;
}

interface ITagData {
  theme?: TdTagProps['theme'],
  text?: '异常' | '正常' | '-'
}

const defaultStatus: ITagData = {
  theme: 'default',
  text: PLACEHOLDER,
};

/**
 *
 * @param props
 * @returns
 */
function HealthStatus(props: IHealthStatusProps): React.ReactElement {
  const { url, active = false } = props;
  const [tagMeta, setTagMeta] = useState<ITagData>(defaultStatus);

  useEffect(() => {
    if (!active) {
      setTagMeta(defaultStatus);
      return;
    }
    if (active && url && isUrlLike(url)) {
      fetch(url)
        .then(({ statusText, status }) => {
          if (status === 200 && statusText === 'OK') {
            setTagMeta({
              theme: 'success',
              text: '正常',
            });
          } else {
            setTagMeta({
              theme: 'danger',
              text: '异常',
            });
          }
        })
        .catch(() => {
          setTagMeta({
            theme: 'danger',
            text: '异常',
          });
        });
    } else if (active && !url) {
      setTagMeta({
        theme: 'danger',
        text: '异常',
      });
    }
  }, [active, url]);

  return (
    <Tag theme={tagMeta?.theme}>{tagMeta?.text || PLACEHOLDER}</Tag>
  );
}

export default memo(HealthStatus);
