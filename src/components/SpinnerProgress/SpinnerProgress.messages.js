/*
 * SpinnerProgress Messages
 *
 * This contains all the text for the SpinnerProgress component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SpinnerProgress';

export default defineMessages({
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading...',
  },
});
