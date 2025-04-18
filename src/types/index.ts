import React, { SetStateAction } from "react";

export type Note = {
  title: string;
  description: string;
  checked: boolean;
};

export type loginFormType = {
  email: string;
  password: string;
};

export type CardProps = {
  title: string;
  description: string;
  id: string;
  // uid: string;
  // isModalOpen: boolean;
  // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
};

export type ModalProps = {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  children: any;
  title: string;
};

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type onClickEvent = React.MouseEvent<HTMLButtonElement>;
export type onChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type setDispatchEvent = React.Dispatch<SetStateAction<boolean | string>>;
