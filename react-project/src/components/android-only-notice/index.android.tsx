import React from 'react';

import { AndroidOnlyNoticeProps } from './types';

// No app os recursos existem de verdade; o aviso é só para a Web.
const AndroidOnlyNoticeAndroid: React.FC<AndroidOnlyNoticeProps> = () => null;

export { AndroidOnlyNoticeAndroid as AndroidOnlyNotice };
export default AndroidOnlyNoticeAndroid;
