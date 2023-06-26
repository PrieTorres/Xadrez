import { useReducer } from 'react';
import { XadrezContext } from './context';
import { data } from './data';
import { xadrezReducer } from './reducer';
import P from 'prop-types';

export const XadrezProvider = ({ children }) => {
  const [xadrezState, xadrezDispatch] = useReducer(xadrezReducer, data);

  return (
    <XadrezContext.Provider value={{ xadrezState, xadrezDispatch }}>
      {children}
    </XadrezContext.Provider>
  );
};

XadrezProvider.propTypes = {
  children: P.node.isRequired,
};
