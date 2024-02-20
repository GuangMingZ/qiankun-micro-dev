export interface IMicroDevConfig {
  [key: string]: {
    devSwitch?: boolean;
    url?: string;
  }
}

export interface IMicroDevTableRow {
  appKey?: string;
  appName?: string;
  devAddress?: string;
  devStatus?: boolean;
  devSwitch?: boolean;
}
