import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {injectIntl} from 'react-intl';
import normalizeCss from 'normalize.css';
import Card from '@material-ui/core/Card';
import {CardActions, CardContent, CardHeader} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {ViewComfy as GridIcon, ViewList as ListIcon,} from '@material-ui/icons';
import s from './CmpGridView.css';
import CmpPagination from '../CmpPagination';
import theme from '../../theme/theme';

const headerStyle = {
  backgroundColor: theme.palette.primary.main,
  padding: '5px 24px',
};

const headerIconStyle = {
  fontSize: 48,
  cursor: 'pointer',
  color: theme.palette.primary.contrastText,
};

const footerStyle = {};

const gridTypes = {
  GRID: 'GRID',
  LIST: 'LIST',
};

class CmpGridView extends React.Component {
  constructor(props) {
    super(props);

    const { pageIndex, pageSize, gridItems, listItems } = props;

    this.state = {
      gridType: gridTypes.GRID,
      start: (pageIndex - 1) * pageSize,
      end: Math.min(pageIndex * pageSize - 1, gridItems.length - 1),
    };
  }

  changeView = gridType => {
    this.setState({
      gridType,
    });
  };

  getVisibleItems = (items, start, end) => items.slice(start, end + 1);

  changePage = (itemIndex, pageSize) => {
    this.setState({
      start: itemIndex,
      end: Math.min(itemIndex + pageSize - 1, this.props.gridItems.length - 1),
    });
  };

  changePageListSize = (itemIndex, pageSize) => {
    this.setState({
      start: 0,
      end: pageSize - 1,
    });
  };

  render() {
    const { dir, intl, className, items } = this.props;
    return (
      <div style={{ direction: dir }}>
        <Card>
          <CardHeader
            title={
              <div>
                <ListIcon
                  onClick={() => this.changeView(gridTypes.LIST)}
                  style={headerIconStyle}
                />
                <GridIcon
                  onClick={() => this.changeView(gridTypes.GRID)}
                  style={headerIconStyle}
                />
              </div>
            }
            style={headerStyle}
          />
          <CardContent>
            {this.state.gridType === gridTypes.GRID ? (
              <Grid container spacing={24}>
                {this.props.gridItems
                  .slice(this.state.start, this.state.end + 1)
                  .map((item, index) => (
                    <Grid key={index} item xs={12} md={4} lg={3}>
                      {item}
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Grid container spacing={24}>
                {this.props.listItems
                  .slice(this.state.start, this.state.end + 1)
                  .map((item, index) => (
                    <Grid key={index} item xs={12}>
                      {item}
                    </Grid>
                  ))}
              </Grid>
            )}
            <div className={s.pagination}>
              <CmpPagination
                totalSize={this.props.gridItems.length}
                changePageAction={this.changePage}
                changePageListSizeAction={this.changePageListSize}
              />
            </div>
          </CardContent>
          <CardActions style={footerStyle}>{this.props.actions}</CardActions>
        </Card>
      </div>
    );
  }
}

CmpGridView.defaultProps = {
  listItems: [],
  gridItems: [],
  pageSize: 12,
  pageIndex: 1,
};

export default injectIntl(withStyles(normalizeCss, s)(CmpGridView));
