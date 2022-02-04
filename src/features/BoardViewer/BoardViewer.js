import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import * as OBF from '../../open-board-format';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
import { useBoardOutput, useBoardNavigation } from '../../hooks/board';
import {
  Board,
  Pictogram,
  Output,
  OutputActions,
  NavButtons,
} from '../../components';
import Tile, { TileVariant } from '../../components/Tile/Tile';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const {
    actionHandlers,
    barEnd,
    board,
    onFetchRequested,
    onRedirectRequested,
    rootBoard,
    ...other
  } = props;

  const { board: boardSettings } = useSettings();
  const speech = useSpeech();

  const boardNav = useBoardNavigation({
    navigate: useNavigate(),
  });

  const output = useBoardOutput({
    speak,
    playAudio,
  });

  const outputActions = (
    <OutputActions
      clearHidden={!output.values.length}
      onClearClick={output.clear}
      onBackspaceClick={output.pop}
      size="large"
    />
  );

  const handleButtonClick = OBF.createButtonClickHandler({
    speak,
    playAudio,
    actionHandlers: { ...actionHandlers, ...output.actionHandlers },
    changeBoard: handleChangeRequest,
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

  function handleChangeRequest(board) {
    boardNav.push(board);
  }

  function handleBackClick() {
    boardNav.goBack();
  }

  function handleForwardClick() {
    boardNav.goForward();
  }

  function handleHomeClick() {
    const { id, name } = rootBoard;
    boardNav.reset({ id, name });
  }

  function renderTile(button) {
    const { backgroundColor, borderColor, image, label, loadBoard } = button;

    const variant = loadBoard ? TileVariant.Folder : TileVariant.Button;
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
    <div className={styles.root} {...other}>
      <Output
        className={styles.output}
        values={output.values}
        renderValue={renderOutputValue}
        actions={outputActions}
        onClick={output.activate}
      />

      <Board
        className={styles.board}
        title={board?.name}
        barStart={
          <NavButtons
            backDisabled={boardNav.backDisabled}
            forwardDisabled={boardNav.forwardDisabled}
            onBackClick={handleBackClick}
            onForwardClick={handleForwardClick}
            onHomeClick={handleHomeClick}
          />
        }
        barEnd={barEnd}
        grid={board?.grid}
        buttons={board?.buttons}
        renderButton={renderTile}
        scrollSnap={true}
        scrollDirection="vertical"
      />
    </div>
  );
}

BoardViewer.propTypes = {
  /**
   * Used for handling custom button actions
   */
  actionHandlers: PropTypes.object,
  /**
   * Bar end content
   */
  barEnd: PropTypes.node,
  /**
   * Board to display
   */
  board: PropTypes.object,
  /**
   * Callback for fetching a board
   */
  onFetchRequested: PropTypes.func,
  /**
   * Callback for redirecting to a board on another website
   */
  onRedirectRequested: PropTypes.func,
  /**
   * Root board
   */
  rootBoard: PropTypes.object,
};

export default BoardViewer;
