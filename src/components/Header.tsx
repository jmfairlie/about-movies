import { Badge, Button } from '@geist-ui/core';
import Github from '@geist-ui/icons/github';
import ShoppingCart from '@geist-ui/icons/shoppingCart';
import React, { useState } from 'react';
import { useCart } from '~/hooks';
import CartModal from './CartModal';
const Header = () => {
  const { cart } = useCart();
  const cartIsEmpty = cart.length === 0;

  const [cartOpen, setCartOpen] = useState(false);
  const openHandler = () => {
    setCartOpen(true);
  };
  const closeHandler = () => {
    setCartOpen(false);
  };

  return (
    <div className="header max-width transform-center-x">
      <CartModal isOpen={cartOpen} closeHandler={closeHandler} />
      <div className="flex-expand" />
      <div className="Logo">About Movies</div>
      <div className="flex-expand" />
      <Badge.Anchor>
        <Badge scale={0.5}>{cart.length}</Badge>
        <Button
          iconRight={<ShoppingCart />}
          disabled={cartIsEmpty}
          onClick={openHandler}
          auto
          scale={3 / 2}
          type="success"
        />
      </Badge.Anchor>
      <div className="flex-expand" />
      <a href="https://github.com/jmfairlie/about-movies" target="_blank" title="check me out on github">
        <Github className="github-link" size={36} />
      </a>
    </div>
  );
};

export default Header;
