import {ICustomer} from "./customer.interface";

export interface IConfiguration {
  id?: string;
  customer: ICustomer;
  // form: IForm;
  title: string;
  preview?: {
    approval?: {
      name?: string;
      date?: string;
      value?: string;
    };
  };
  values?: IConfigurationItem[];
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface IConfigurationItem {
  page: string;
  values: IConfigurationItemValue[];
}

export interface IConfigurationItemValue {
  id?: string;
  type: string;
  image?: string;
  title: string;
  subtitle?: string;
  fields?: any;
  value?: any;
  columns?: IConfigurationItemValue[];
}

export interface IConfigurationAttachment {
  id: string;
  configuration?: IConfiguration;
  external?: string;
  field?: string;
  name?: string;
  type?: string;
  url?: string;
}
