import * as OBF from '../../open-board-format';
import { createBoardBehavior } from './board.behavior';

const CustomSpecialtyAction = 'PLAY_VIDEO';

describe('Board behavior', () => {
  const behaviorParams = {
    actionHandlers: {
      [OBF.SpecialtyActions.Clear]: jest.fn(),
      [OBF.SpecialtyActions.Home]: jest.fn(),
      [OBF.SpecialtyActions.Spell]: jest.fn(),
      [CustomSpecialtyAction]: jest.fn(),
    },
    changeBoard: jest.fn(),
    fetchBoard: jest.fn(),
    redirect: jest.fn(),
    playAudio: jest.fn(),
    speak: jest.fn(),
    addOutput: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('activate empty button', () => {
    it('should do nothing', () => {
      const buttonDTO: OBF.ButtonDTO = {
        id: '1',
        label: '',
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `label`', () => {
    it('should speak the `label` text and add button to output', () => {
      const buttonDTO: OBF.ButtonDTO = {
        id: '1',
        label: 'Hi',
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.label);
      expect(behaviorParams.addOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `label` and `vocalization`', () => {
    it('should speak the `vocalization` text and add button to output', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        vocalization: 'This text should override the label text',
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.vocalization);
      expect(behaviorParams.addOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `label` and `sound.data`', () => {
    it('should play audio and add button to output', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        sound: {
          id: '1',
          data: 'mock-data',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.addOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `label`, `vocalization` and `sound.data`', () => {
    it('should play audio and add button to output', () => {
      const buttonDTO = {
        id: '1',
        label: 'Greeting',
        vocalization: 'Welcome everyone!',
        sound: {
          id: '1',
          data: 'mock-data',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.addOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `sound.data`', () => {
    it('should play audio and add button to output', () => {
      const buttonDTO = {
        id: '1',
        label: '',
        sound: {
          id: '1',
          data: 'mock-data',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).toHaveBeenCalledWith(buttonDTO);
    });
  });

  describe('activate button with `loadBoard.id`', () => {
    it('should change board', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        loadBoard: {
          id: '1',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.changeBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.id
      );
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `loadBoard.id` and `vocalization`', () => {
    it('should change board and speak `vocalization` text', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        vocalization: 'Welcome all!',
        loadBoard: {
          id: '1',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.changeBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.id
      );
      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.vocalization);
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `loadBoard.dataUrl`', () => {
    it('should fetch board', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        loadBoard: {
          dataUrl: 'http://data-url',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.fetchBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.dataUrl
      );
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `loadBoard.url`', () => {
    it('should redirect window', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        loadBoard: {
          url: 'http://data-url',
        },
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.redirect).toHaveBeenCalledWith(
        buttonDTO.loadBoard.url
      );
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `:clear` action', () => {
    it('should call the clear action handler', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        actions: [OBF.SpecialtyActions.Clear],
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(behaviorParams.actionHandlers[':clear']).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `:clear` and `:home` action', () => {
    it('should call the clear and home action handlers', () => {
      const buttonDTO = {
        id: '1',
        label: 'Hi',
        actions: [OBF.SpecialtyActions.Clear, OBF.SpecialtyActions.Home],
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Clear]
      ).toHaveBeenCalled();
      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Home]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with spell `+` action', () => {
    it('should call the spell action handler', () => {
      const buttonDTO = {
        id: '1',
        label: 'less',
        actions: ['+less'] as any,
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Spell]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });

  describe('activate button with custom action', () => {
    it('should call the custom action handler', () => {
      const buttonDTO = {
        id: '1',
        label: '',
        actions: [CustomSpecialtyAction] as any,
      };

      const { activateButton } = createBoardBehavior(behaviorParams);

      activateButton(buttonDTO);

      expect(
        behaviorParams.actionHandlers[CustomSpecialtyAction]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.changeBoard).not.toHaveBeenCalled();
      expect(behaviorParams.addOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });
});
