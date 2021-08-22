import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

function Seo(props) {
  const { title, description } = props;

  const titleTemplate = '%s - OBE';

  return (
    <Helmet title={title} titleTemplate={titleTemplate}>
      <meta name="description" content={description} />
    </Helmet>
  );
}

Seo.propTypes = {
  /**
   * Title of the page
   */
  title: PropTypes.string,
  /**
   * Description of the page
   */
  description: PropTypes.string,
};

export default Seo;
