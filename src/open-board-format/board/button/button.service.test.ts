import * as OBF from '../../interfaces';
import { buttonService } from './button.service';
import { createButton } from './button';

describe('Button service', () => {
  test('add button', () => {
    const button = createButton({ id: '0', label: 'test' });
    const buttons: OBF.Button[] = [];

    const results = buttonService.add(button, buttons);

    expect(results[0]).toEqual(button);
  });

  test('remove button', () => {
    const buttons: OBF.Button[] = [createButton({ id: '0', label: 'test' })];

    const results = buttonService.remove('0', buttons);

    expect(results[0]).toBeUndefined();
  });

  test('remove multiple buttons', () => {
    const buttons: OBF.Button[] = [
      { id: '0', label: 'test' },
      { id: '1', label: 'test 1' },
      { id: '2', label: 'test 2' },
      { id: '3', label: 'test 3' },
    ];

    const results = buttonService.remove(['0', '3', '1'], buttons);

    expect(results[0]).toEqual({ id: '2', label: 'test 2' });
  });

  test('update button', () => {
    const button = createButton({
      id: '0',
      label: 'Home',
      load_board: { id: '1' },
    });

    const buttons: OBF.Button[] = [
      createButton({ id: '0', label: 'test', vocalization: 'Testing' }),
    ];

    const results = buttonService.update(button, buttons);

    expect(results[0]).toEqual({ ...button, vocalization: 'Testing' });
  });
});
