import { createBoard } from './board';
import { boardService } from './board.service';
import { createButton } from './button/button';

describe('Board service', () => {
  describe('setName', () => {
    it('should set name', () => {
      const board = createBoard();

      const result = boardService.setName('test', board);

      expect(result.name).toBe('test');
    });
  });

  describe('addButton', () => {
    it('should add button', () => {
      const button1 = createButton({ id: '1', label: 'hi' });
      const button2 = createButton({ id: '2', label: 'bye' });
      const board = createBoard({ buttons: [button2] });

      const result = boardService.addButton(button1, board);

      expect(result.buttons[1]).toBe(button1);
    });

    it('should add multiple buttons', () => {
      const button1 = createButton({ id: '1', label: 'hi' });
      const button2 = createButton({ id: '2', label: 'bye' });
      const board = createBoard();

      const result = boardService.addButton([button1, button2], board);

      expect(result.buttons[0]).toBe(button1);
      expect(result.buttons[1]).toBe(button2);
    });
  });

  describe('removeButton', () => {
    it('should remove button', () => {
      const button = createButton({ id: '1', label: 'hi' });
      const board = createBoard({ buttons: [button] });

      const result = boardService.removeButton(button.id, board);

      expect(result.buttons[0]).toBe(undefined);
    });

    it('should remove multiple buttons', () => {
      const button1 = createButton({ id: '1', label: 'hi' });
      const button2 = createButton({ id: '2', label: 'bye' });
      const button3 = createButton({ id: '3', label: 'shay' });
      const board = createBoard({ buttons: [button1, button2, button3] });

      const result = boardService.removeButton([button1.id, button2.id], board);

      expect(result.buttons[0]).toEqual(button3);
    });
  });
});
