/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from 'react';
import { Card, Table, Tag, Tooltip, Input, Switch, InputValue, SwitchValue } from 'tdesign-react';
import { PrimaryTableCol, TableRowData } from 'tdesign-react/lib/table/type';
import { cloneDeep } from 'lodash';
import Context, { ACTION } from '../../context';
import HealthStatus from '../health-status';
import { PLACEHOLDER } from '../../constants';
import useMicroDevData from '../../hooks/use-micro-dev-data';
import { isUrlLike } from '../../utils';
import s from './index.module.scss';

const ROW_KEY = 'appKey';
/**
 *
 * @returns
 */
export default function MicroFeTable(): React.ReactElement {
  const [data, updateData] = useMicroDevData();
  const { dispatchContext } = useContext(Context);

  useEffect(() => {
    if (data) {
      dispatchContext?.({ type: ACTION.SAVE_CONFIG_DATA, data });
    }
  }, [data]);

  const columns: PrimaryTableCol<TableRowData>[] = [
    {
      colKey: 'appKey',
      title: '应用',
      width: 120,
      cell: ({ col, row }: { col: any; row: any }) => {
        const colVal: Required<PrimaryTableCol> = col;
        const appKey: string = row[colVal.colKey];
        const appName: string = row?.appName || PLACEHOLDER;
        return (
          <Tooltip content={appName} destroyOnClose placement="top" theme="default">
            <Tag className={s.appNameTag} size="large">{appKey}</Tag>
          </Tooltip>
        );
      },
    },
    {
      colKey: 'devAddress',
      title: '服务地址',
      width: 220,
      cell: ({ col, row, rowIndex }: { col: any; row: any; rowIndex: number }) => {
        const colVal: Required<PrimaryTableCol> = col;
        const address = row[colVal.colKey];
        return (
          <Input
            value={address}
            onChange={(value) => {
              onUrlChangeHandle(value, rowIndex);
            }}
            placeholder="like http://localhost:3000"
          />
        );
      },
    },
    {
      colKey: 'devStatus',
      title: '应用状态',
      width: 70,
      cell: ({ row }: { col: any; row: any }) => {
        const url = row?.devAddress;
        const active = row.devSwitch;
        return <HealthStatus url={url} active={active} />;
      },
    },
    {
      colKey: 'devSwitch',
      title: '联调开关',
      width: 70,
      cell: ({ col, row, rowIndex }: { col: any; row: any; rowIndex: number }) => {
        const colVal: Required<PrimaryTableCol> = col;
        const val = row[colVal.colKey];
        const url = row?.devAddress;
        return (
          <Switch
            label={[]}
            disabled={!isUrlLike(url)}
            loading={row?.loading ?? false}
            size="medium"
            defaultValue={val}
            onChange={(value) => {
              onDevSwitchChange(value, rowIndex);
            }}
          />
        );
      },
    },
  ];

  const onUrlChangeHandle = (value: InputValue, rowIndex: number) => {
    const newData = cloneDeep(data);
    Object.assign(newData[rowIndex], {}, { devAddress: value });
    updateData(newData);
  };

  const onDevSwitchChange = (value: SwitchValue, rowIndex: number) => {
    const newData = cloneDeep(data);
    Object.assign(newData[rowIndex], {}, { devSwitch: value });
    updateData(newData);
  };

  return (
    <Card className={s.microFeTable}>
      <Table rowKey={ROW_KEY} columns={columns} data={data} />
    </Card>
  );
}
