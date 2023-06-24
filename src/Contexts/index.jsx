import { useReducer } from 'react';
import { xadrezContext } from './context';
import { data } from './data';
import { xadrezReducer } from './reducer';
import P from 'prop-types';

export const xadrezProvider = ({ children }) => {
  const [xadrezState, setXadrezState] = useReducer(xadrezReducer, data);
  return (
    <xadrezContext.Provider value={{ xadrezState, setXadrezState }}>
      {children}
    </xadrezContext.Provider>
  );
};

xadrezProvider.propTypes = {
  children: P.node.isRequired,
};
