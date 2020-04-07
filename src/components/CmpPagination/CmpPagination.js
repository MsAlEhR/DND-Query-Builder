import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import cn from 'classnames';
import normalizeCss from 'normalize.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from 'material-ui-flat-pagination';
import s from './CmpPagination.css';

class CmpPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: props.initialPageSize,
      itemIndex: props.initialItemIndex,
      totalSize: props.totalSize,
    };
  }

  changePage(itemIndex) {
    this.setState({ itemIndex }, () =>
      this.props.changePageAction(this.state.itemIndex, this.state.pageSize),
    );
  }

  changePageListSize = event => {
    this.setState({ pageSize: event.target.value }, () =>
      this.props.changePageListSizeAction(
        this.state.itemIndex,
        this.state.pageSize,
      ),
    );
  };

  render() {
    const { dir, intl, className, pageSizeList } = this.props;
    return (
      <div className={cn(s.wrapper, className)}>
        <Select value={this.state.pageSize} onChange={this.changePageListSize}>
          {pageSizeList.map((pageSize, index) => (
            <MenuItem key={index} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
        <Pagination
          limit={this.state.pageSize}
          offset={this.state.itemIndex}
          total={this.state.totalSize}
          onClick={(e, offset) => this.changePage(offset)}
        />
      </div>
    );
  }
}

CmpPagination.defaultProps = {
  totalSize: 0,
  pageSizeList: [12, 24, 48],
  initialPageSize: 12,
  initialItemIndex: 0,
  changePageAction(itemIndex, pageSize) {},
  changePageListSizeAction(itemIndex, pageSize) {},
};

export default injectIntl(withStyles(normalizeCss, s)(CmpPagination));
