import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import { injectIntl } from 'react-intl';
import CancelIcon from '@material-ui/icons/Cancel';
import s from './CmpImageUpload.css';
import CmpThumb from '../CmpThumb';
import CmpHelpIcon from '../CmpHelpIcon';
import theme from '../../theme/theme';

const helpIconStyle = {
  color: theme.palette.primary.dark,
};

class CmpImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
  }

  imageClick = () => {
    this.fileRef.current.click();
  };

  getExtension = filename => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  };

  isImage = filename => {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'png':
        return true;
      default:
        return false;
    }
  };

  fileToByte = (file, onChange) => {
    const reader = new FileReader();
    reader.onload = function() {
      const arrayBuffer = this.result;
      const array = new Uint8Array(arrayBuffer);
      onChange(array);
    };

    if (file) {
      if (file.size <= 300 * 1024 && this.isImage(file.name)) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  render() {
    const { intl } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <input
          style={{ display: 'none' }}
          ref={this.fileRef}
          type="file"
          onChange={e =>
            this.fileToByte(e.currentTarget.files[0], this.props.onChange)
          }
        />
        {this.props.file ? (
          <CancelIcon style={{ position: 'absolute', color: 'red' }} onClick={()=>{this.props.onChange(null)}} />
        ) : null}
        <CmpThumb onClick={() => this.imageClick()} file={this.props.file} />
        <CmpHelpIcon
          iconStyle={helpIconStyle}
          iconOutline
          helpText={intl.formatMessage({
            id: 'component.imageUpload.imageCondition',
          })}
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpImageUpload));
