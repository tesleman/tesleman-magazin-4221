import { Control } from 'react-hook-form';

export interface formUserdataI {
  email: string;
  phone: string;
  name: string;
}

export interface errorsI {
  message: string;
  type: string;
}
export interface ref {
  current: HTMLButtonElement;
}
export interface StepperFormPropsI {
  hendleSubmitClick: (ref: ref) => void;
  handleSetStateCallback: (data: formUserdataI) => any;
  handleSubmit: any;
  errors?: any;
  control?: any;
}
