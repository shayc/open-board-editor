import PropTypes from 'prop-types';
import { DefaultButton, getRTL } from '@fluentui/react';
import * as OBF from '../../open-board-format';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
import { useMediaQuery } from '../../contexts/media-query';
import { useBoardOutput, useBoardNavigation } from '../../hooks/board';
import { Board, NavBar, Tile, Pictogram, Output, Seo } from '../../components';
import BackspaceSvg from './BackspaceSvg';
import ClearSvg from './ClearSvg';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const {
    actionHandlers,
    board,
    onBackClick,
    onBoardRequested,
    onFetchBoardRequested,
    onForwardClick,
    onHomeClick,
    onRedirectRequested,
    rootId,
  } = props;

  const isRTL = getRTL();
  const { isSmallScreen } = useMediaQuery();
  const { board: boardSettings } = useSettings();
  const speech = useSpeech();

  const navigation = useBoardNavigation({
    history: [{ id: board?.id }],
    index: 0,
  });

  const navBarProps = {
    backDisabled: navigation.backDisabled,
    forwardDisabled: navigation.forwardDisabled,
    onForwardClick: handleForwardClick,
    onBackClick: handleBackClick,
    onHomeClick: handleHomeClick,
  };

  const output = useBoardOutput({
    speak,
    playAudio,
  });

  const outputActions = (
    <>
      <DefaultButton
        className={styles.button}
        aria-label="Clear"
        disabled={!output.values.length}
        onClick={output.clear}
        style={{ visibility: !output.values.length ? 'hidden' : 'visible' }}
      >
        <ClearSvg
          className={styles.icon}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </DefaultButton>
      <DefaultButton
        className={styles.button}
        aria-label="Backspace"
        onClick={output.pop}
      >
        <BackspaceSvg
          className={styles.icon}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </DefaultButton>
    </>
  );

  const handleButtonClick = OBF.createButtonClickHandler({
    speak,
    playAudio,
    actionHandlers: { ...actionHandlers, ...output.actionHandlers },
    requestBoard: handleBoardRequested,
    fetchBoard: onFetchBoardRequested,
    redirect: onRedirectRequested,
    pushOutput: output.push,
  });

  function handleHomeClick() {
    navigation.reset({ id: rootId });
    onHomeClick?.(rootId);
  }

  function handleBackClick() {
    navigation.goBack();
    onBackClick?.();
  }

  function handleForwardClick() {
    navigation.goForward();
    onForwardClick?.();
  }

  function handleBoardRequested(id) {
    navigation.goTo({ id });
    onBoardRequested?.(id);
  }

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

    function handleClick() {
      handleButtonClick(button);
    }

    return (
      <Tile
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        variant={variant}
        onClick={handleClick}
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

    return imageSrc ? (
      <Pictogram
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
    <div className={styles.root}>
      <Seo title={board?.name} />

      <div className={styles.outputWrapper}>
        <Output
          actions={!isSmallScreen && outputActions}
          className={styles.output}
          onClick={output.activate}
          renderValue={renderOutputValue}
          values={output.values}
        />
      </div>

      <div className={styles.navBarWrapper}>
        <NavBar
          {...(isSmallScreen
            ? { backHidden: true, forwardHidden: true, homeHidden: true }
            : navBarProps)}
          text={board?.name}
        />
      </div>

      <div className={styles.boardWrapper}>
        <Board
          buttons={board?.buttons}
          grid={board?.grid}
          renderButton={renderTile}
          scrollSnap={true}
          scrollDirection="vertical"
        />
      </div>

      {isSmallScreen ? (
        <div className={styles.smallScreenBottomBar}>
          <NavBar {...navBarProps} actions={outputActions} />
        </div>
      ) : null}
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
  onBackClick: PropTypes.func,
  /**
   *
   */
  onBoardRequested: PropTypes.func,
  /**
   *
   */
  onFetchBoardRequested: PropTypes.func,
  /**
   *
   */
  onForwardClick: PropTypes.func,
  /**
   *
   */
  onHomeClick: PropTypes.func,
  /**
   *
   */
  onRedirectRequested: PropTypes.func,
  /**
   *
   */
  rootId: PropTypes.string,
};

export default BoardViewer;
