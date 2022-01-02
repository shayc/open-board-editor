import PropTypes from 'prop-types';
import * as OBF from '../../open-board-format';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
import { useBoardOutput } from '../../hooks/board';
import { Board, Pictogram, Output, OutputActions } from '../../components';
import Tile, { TileVariant } from '../../components/Tile/Tile';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const {
    actionHandlers,
    barEnd,
    barStart,
    board,
    onChangeBoardRequested,
    onFetchBoardRequested,
    onRedirectRequested,
    style,
  } = props;

  const { board: boardSettings } = useSettings();
  const speech = useSpeech();

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
    changeBoard: onChangeBoardRequested,
    fetchBoard: onFetchBoardRequested,
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

      <div className={`${styles.boardWrapper} ${styles.safeAreaInsetX}`}>
        <Board
          barStart={barStart}
          barEnd={barEnd}
          name={board?.name}
          buttons={board?.buttons}
          grid={board?.grid}
          renderButton={renderTile}
          scrollSnap={true}
          scrollDirection="vertical"
        />
      </div>
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
  onChangeBoardRequested: PropTypes.func,
  /**
   *
   */
  onFetchBoardRequested: PropTypes.func,
  /**
   *
   */
  onRedirectRequested: PropTypes.func,
};

export default BoardViewer;
