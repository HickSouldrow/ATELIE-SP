import React from 'react';

import { AppTopBarProps } from './types';

// Na Web as telas usam o Header; esta barra é só do app.
const AppTopBarWeb: React.FC<AppTopBarProps> = () => null;

export { AppTopBarWeb as AppTopBar };
export default AppTopBarWeb;
