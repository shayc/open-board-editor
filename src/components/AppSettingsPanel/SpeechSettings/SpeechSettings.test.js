import { renderWithReactIntl } from '../../../setupTests';
import SpeechSettings from './SpeechSettings';
import { useSpeech } from '../../../features/speech';

jest.mock('../../../features/speech');

describe('<SpeechSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    useSpeech.mockReturnValue({ voices: [] });

    renderWithReactIntl(<SpeechSettings />);
    expect(spy).not.toHaveBeenCalled();
  });
});
