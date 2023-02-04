import { useToasts } from '@geist-ui/core';
import { useCallback } from 'react';
import { useStorageState } from 'react-use-storage-state';
type TAddCartArgs = { movieId: number; movieTitle: string };

const useCart = () => {
  const [state, setState] = useStorageState<TAddCartArgs[]>('cart', []);

  const { setToast } = useToasts();

  const addToCart = useCallback(
    (newItem: TAddCartArgs) => {
      setState((prevState) => [...prevState, newItem]);
      setToast({ text: `added "${newItem.movieTitle}" to cart`, delay: 2000 });
    },
    [setState, setToast]
  );

  const removeFromCart = useCallback(
    (movieId: number) => {
      const item = state.find((movie) => movie.movieId === movieId);
      if (item) {
        setState((prevState) =>
          prevState.filter((item) => item.movieId !== movieId)
        );

        setToast({
          text: `removed "${item.movieTitle}" from cart`,
          delay: 2000
        });
      }
    },
    [setState, setToast, state]
  );

  const contains = useCallback(
    (movieId: number) => {
      return state.some((item) => item.movieId === movieId);
    },
    [state]
  );
  return { addToCart, cart: state, contains, removeFromCart };
};

export default useCart;
export type { TAddCartArgs as TCartItem };
