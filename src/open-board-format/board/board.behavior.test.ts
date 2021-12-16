import * as OBF from '../../open-board-format';
import { createButtonClickHandler } from './board.behavior';

const CustomSpecialtyAction = 'PLAY_VIDEO';

describe('Board behavior', () => {
  const behaviorParams = {
    actionHandlers: {
      [OBF.SpecialtyActions.Clear]: jest.fn(),
      [OBF.SpecialtyActions.Home]: jest.fn(),
      [OBF.SpecialtyActions.Spell]: jest.fn(),
      [CustomSpecialtyAction]: jest.fn(),
    },
    getBoard: jest.fn(),
    fetchBoard: jest.fn(),
    redirect: jest.fn(),
    playAudio: jest.fn(),
    speak: jest.fn(),
    pushOutput: jest.fn(),
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
    });
  });

  describe('activate button with `label`', () => {
    it('should speak the `label` text and add button to output', () => {
      const buttonDTO: OBF.ButtonDTO = {
        id: '1',
        label: 'Hi',
      };

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.label);
      expect(behaviorParams.pushOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.vocalization);
      expect(behaviorParams.pushOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.pushOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.pushOutput).toHaveBeenCalledWith(buttonDTO);
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).toHaveBeenCalledWith(
        buttonDTO.sound.data
      );
      expect(behaviorParams.speak).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).toHaveBeenCalledWith(buttonDTO);
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.getBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.id
      );
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.getBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.id
      );
      expect(behaviorParams.speak).toHaveBeenCalledWith(buttonDTO.vocalization);
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.fetchBoard).toHaveBeenCalledWith(
        buttonDTO.loadBoard.dataUrl
      );
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.redirect).toHaveBeenCalledWith(
        buttonDTO.loadBoard.url
      );
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(behaviorParams.actionHandlers[':clear']).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Clear]
      ).toHaveBeenCalled();
      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Home]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(
        behaviorParams.actionHandlers[OBF.SpecialtyActions.Spell]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
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

      const handleButtonClick = createButtonClickHandler(behaviorParams);

      handleButtonClick(buttonDTO);

      expect(
        behaviorParams.actionHandlers[CustomSpecialtyAction]
      ).toHaveBeenCalled();
      expect(behaviorParams.redirect).not.toHaveBeenCalled();
      expect(behaviorParams.fetchBoard).not.toHaveBeenCalled();
      expect(behaviorParams.getBoard).not.toHaveBeenCalled();
      expect(behaviorParams.pushOutput).not.toHaveBeenCalled();
      expect(behaviorParams.playAudio).not.toHaveBeenCalled();
      expect(behaviorParams.speak).not.toHaveBeenCalled();
    });
  });
});
