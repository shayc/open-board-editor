import PropTypes from 'prop-types';
import * as OBF from '../../open-board-format';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useBoardOutput } from '../../hooks/board';
import {
  Board,
  NavBar,
  Tile,
  Pictogram,
  Output,
  OutputActions,
} from '../../components';

import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const {
    actionHandlers,
    board,
    navProps,
    onBoardRequested,
    onFetchRequested,
    onRedirectRequested,
    style,
  } = props;

  const { isSmallScreen } = useMediaQuery();
  const { board: boardSettings } = useSettings();
  const speech = useSpeech();

  const navBarProps = {
    backHidden: !navProps.onBackClick,
    forwardHidden: !navProps.onForwardClick,
    homeHidden: !navProps.onHomeClick,
    ...navProps,
  };

  const navBarPropsHidden = {
    backHidden: true,
    forwardHidden: true,
    homeHidden: true,
  };

  const output = useBoardOutput({
    speak,
    playAudio,
  });

  const outputActions = (
    <OutputActions
      clearHidden={!output.values.length}
      onClearClick={output.clear}
      onBackspaceClick={output.pop}
      size={'large'}
    />
  );

  const handleButtonClick = OBF.createButtonClickHandler({
    speak,
    playAudio,
    actionHandlers: { ...actionHandlers, ...output.actionHandlers },
    requestBoard: onBoardRequested,
    fetchBoard: onFetchRequested,
    redirect: onRedirectRequested,
    pushOutput: output.push,
  });

  function speak(text) {
    speech.speak(text);
  }

  function playAudio(url) {
    utils.playAudio(url);
  }

  function renderTile(button) {
    const { backgroundColor, borderColor, image, label, loadBoard } = button;

    const variant = loadBoard ? 'folder' : 'button';
    const pictogramSrc = image?.data || image?.url;

    function handleClick(event) {
      handleButtonClick(button);
    }

    function handleKeyDown(event) {
      if (event.keyCode === 32) {
        event.preventDefault();
      }
    }

    return (
      <Tile
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        variant={variant}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Pictogram
          key={image?.url}
          label={label}
          labelHidden={boardSettings.isLabelHidden}
          labelPosition={boardSettings.labelPosition}
          src={pictogramSrc}
        />
      </Tile>
    );
  }

  function renderOutputValue(value) {
    const { image, label } = value;
    const imageSrc = image?.data || image?.url;
    const preserveContainerRatio = true;

    return imageSrc ? (
      <Pictogram
        preserveContainerRatio={preserveContainerRatio}
        label={label}
        src={imageSrc}
        labelHidden={boardSettings.isLabelHidden}
        labelPosition={boardSettings.labelPosition}
      />
    ) : (
      <span className={styles.outputTextValue}>{label}</span>
    );
  }

  return (
    <div className={styles.root} style={style}>
      <div className={`${styles.outputWrapper} ${styles.safeAreaInsetX}`}>
        <Output
          actions={outputActions}
          className={styles.output}
          onClick={output.activate}
          renderValue={renderOutputValue}
          values={output.values}
        />
      </div>

      <div className={styles.safeAreaInsetX}>
        <NavBar
          {...(isSmallScreen ? navBarPropsHidden : navBarProps)}
          text={board?.name}
        />
      </div>

      <div className={`${styles.boardWrapper} ${styles.safeAreaInsetX}`}>
        <Board
          buttons={board?.buttons}
          grid={board?.grid}
          renderButton={renderTile}
          scrollSnap={true}
          scrollDirection="vertical"
        />
      </div>

      {isSmallScreen && (
        <div className={styles.smallScreenBottomBar}>
          <NavBar {...navBarProps} />
        </div>
      )}
    </div>
  );
}

BoardViewer.propTypes = {
  /**
   *
   */
  actionHandlers: PropTypes.object,
  /**
   *
   */
  board: PropTypes.object,
  /**
   *
   */
  onBoardRequested: PropTypes.func,
  /**
   *
   */
  onFetchRequested: PropTypes.func,
  /**
   *
   */
  onRedirectRequested: PropTypes.func,
};

export default BoardViewer;
