import { Modal } from '@geist-ui/core';
import React, { useCallback, useEffect } from 'react';

import { Button } from '@geist-ui/core';
import Eye from '@geist-ui/icons/eye';
import XCircle from '@geist-ui/icons/xCircle';
import { useNavigate } from 'react-router-dom';
import { useCart } from '~/hooks';

type TCartModalProps = {
  isOpen: boolean;
  closeHandler: () => void;
};
const CartModal = ({ isOpen, closeHandler }: TCartModalProps) => {
  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();
  useEffect(() => {
    if (!cart.length) {
      closeHandler();
    }
  }, [cart.length, closeHandler]);

  const viewHandler = useCallback(
    (id: number) => () => {
      closeHandler();
      navigate(`/movie/${id}`);
    },
    [closeHandler, navigate]
  );
  return (
    <Modal visible={isOpen} onClose={closeHandler}>
      <Modal.Title>Cart</Modal.Title>
      <Modal.Subtitle>Selected Movies</Modal.Subtitle>
      <Modal.Content>
        {cart.map((item, index) => (
          <div className="cart-item" key={item.movieId}>
            <div>{`${index + 1}.`}</div>
            <div className="name">{item.movieTitle}</div>
            <div className="flex-expand"></div>
            <Button
              iconRight={<Eye />}
              onClick={viewHandler(item.movieId)}
              auto
              scale={2 / 3}
            />
            <Button
              iconRight={<XCircle />}
              onClick={() => removeFromCart(item.movieId)}
              auto
              scale={2 / 3}
            />
          </div>
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default CartModal;
