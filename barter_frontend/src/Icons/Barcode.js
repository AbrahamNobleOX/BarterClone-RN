import * as React from 'react';
import {Svg, Path} from 'react-native-svg';
import {theme} from '../components';

export default ({width, height}) => {
  return (
    <Svg
      {...{width, height}}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M0 0v5h5V0H0zm6 0v2h2V1H7V0H6zm3 0v2h1V0H9zm2 0v1h1v2h1V2h1V1h-1V0h-2zm2 3v1h-1V3h-1v1h-1v1h1v1h1V5h2V3h-1zm-1 3v2h1V6h-1zm0 2h-2V5H9v1H8v1h1v2h3V8zm0 1v1h1v1h1v-1h1V8h1V7h2V6h-3v1h-1v2h-2zm6-2v1h1v2h1V6h-1v1h-1zm1 3h-1V9h-1v1h-2v1h3v2h1v-1h1v-1h-1v-1zm0 3v1h1v-1h-1zm0 1h-1v1h1v-1zm-1 0v-1h-1v1h1zm-1 0h-2v1h1v2h1v-3zm0 3v1h1v-1h-1zm1 0h2v-1h-2v1zm-1 1h-1v-1h-1v3h1v-1h1v-1zm0 1v1h3v-2h-1v1h-2zm-2-2v-1h-1v1h1zm-1-1v-1h-1v-2h-1v1h-1v-1H9v1h1v1h2v2h-1v1h1v1h1v1h1v-2h-1v-2h1zm-3 1v-1h-1v1h1zm-1 0H9v-1H8v1H7v1h1v1H7v-1H6v2h5v-1H9v-1h1v-1zm-3 0v-2h2v-1H7v-1H5v1h1v3h1zm-2-4v-1h2v1h1v-1h1v-1H7V9H6v2H5v-1H4v1H3v1h1v1h1zm-1-3V9H3v1h1zm0-1h1V8h1V7H4V6H3v1H1V6H0v2h4v1zm3 0h1V7H7v2zm1 0v1h1V9H8zm1 1v1h1v1h1v1h1v-2h-1v-1H9zm4 3h1v1h1v-1h2v-1h-2v-1h-1v1h-1v1zm4-4V8h-1v1h1zm-7-5V3H7v1H6v2h1V5h1V4h2zm5-4v5h5V0h-5zM1 1h3v3H1V1zm15 0h3v3h-3V1zM2 2v1h1V2H2zm15 0v1h1V2h-1zM0 9v2h1v-1h1V9H0zm1 2v2H0v1h3v-1H2v-2H1zm-1 4v5h5v-5H0zm1 1h3v3H1v-3zm1 1v1h1v-1H2z"
        fill="#222"
      />
    </Svg>
  );
};
