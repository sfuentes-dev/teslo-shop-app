import { CartState, ShippingAddress } from './';
import { ICartProduct } from '@/interfaces';

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - LoadAddress from cookies';
      payload: ShippingAddress;
    }
  | {
      type: '[Cart] - Update Address';
      payload: ShippingAddress;
    }
  | {
      type: '[Cart] - Update products in cart';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Change product quantity';
      payload: ICartProduct;
    }
  | {
      type: '[CART] - Remove Product in Cart';
      payload: ICartProduct;
    }
  | {
      type: '[CART] - Update Order Summary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      };

    case '[Cart] - Change product quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          product.quantity = action.payload.quantity;
          return action.payload;
        }),
      };

    case '[CART] - Remove Product in Cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

    case '[CART] - Update Order Summary':
      return {
        ...state,
        ...action.payload,
      };

    case '[Cart] - Update Address':
    case '[Cart] - LoadAddress from cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
