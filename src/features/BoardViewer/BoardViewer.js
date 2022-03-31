import PropTypes from 'prop-types';

import {
  Board,
  Pictogram,
  Output,
  OutputButtons,
  NavButtons,
} from '../../components';
import Tile, { TileVariant } from '../../components/Tile/Tile';
import { useSettings } from '../../contexts/settings';
import { useLocale } from '../../contexts/locale';
import useBoardViewer from './useBoardViewer';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const { barEnd, barStart, ...other } = props;

  const settings = useSettings();
  const { locale } = useLocale();

  const { board, navigation, output, onButtonClick } = useBoardViewer({
    locale,
  });

  function renderTile(button) {
    const { board: boardSettings } = settings;
    const { backgroundColor, borderColor, image, label, loadBoard } = button;
    const variant = loadBoard ? TileVariant.Folder : TileVariant.Button;
    const pictogramSrc = image?.data || image?.url;

    function handleClick() {
      onButtonClick(button);
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
    const { board: boardSettings } = settings;
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
        onClick={output.onClick}
        actions={
          <OutputButtons
            clearHidden={!output.values.length}
            onClearClick={output.onClearClick}
            onBackspaceClick={output.onBackspaceClick}
          />
        }
      />

      <Board
        className={styles.board}
        title={board?.name}
        barStart={
          <>
            <NavButtons
              backDisabled={navigation.isBackDisabled}
              forwardDisabled={navigation.isForwardDisabled}
              onBackClick={navigation.onBackClick}
              onForwardClick={navigation.onForwardClick}
              onHomeClick={navigation.onHomeClick}
            />

            {barStart}
          </>
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
   * Elements to render at the end of the bar.
   */
  barEnd: PropTypes.node,
  /**
   * Elements to render at the start of the bar.
   */
  barStart: PropTypes.node,
};

export default BoardViewer;
