import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SortableTree from 'react-sortable-tree';
import s from './CmpTree.css';

class CmpTree extends React.Component {
  render() {
    return (
      <SortableTree className={s.tree} {...this.props}>
        {this.props.children}
      </SortableTree>
    );
  }
}

export default withStyles(s)(CmpTree);
