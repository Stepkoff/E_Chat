import React from 'react';
import s from './modal.module.scss';

const Modal = ({active, setActive, children}) => {
  return (
    <div
      className={`${s.modal} ${active && s.active}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${s.modal__content} ${active && s.activeContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;