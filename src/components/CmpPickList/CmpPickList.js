import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import { injectIntl } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import cn from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import theme from '../../theme/theme';
import s from './CmpPickList.css';
import { Divider } from '@material-ui/core';

const listHeaderStyle = {
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  fontSize: 18,
};

const itemStyle = {
  color: theme.palette.primary.dark,
  overflowWrap: 'break-word',
  fontSize: 15,
};

class CmpPickList extends React.Component {
  constructor(props) {
    super(props);

    const mainItems = props.mainItems || [];
    const selectedItems = props.selectedItems || [];
    const mainItemsMap = mainItems.reduce((map, item) => {
      map[item[props.itemIdName]] = item;
      return map;
    }, {});
    selectedItems.forEach(item => {
      delete mainItemsMap[item[props.itemIdName]];
    });
    const filteredMainItems = Object.values(mainItemsMap);

    const selectedItemsMap = selectedItems.reduce((map, item) => {
      map[item[props.itemIdName]] = item;
      return map;
    }, {});

    this.state = {
      mainItems: filteredMainItems || [],
      mainItemsMap,
      selectedItems: props.selectedItems || [],
      selectedItemsMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    };
  }

  handleToggleMainItems = id => {
    const checked = [...this.state.mainItemsChecked];
    const idx = checked.indexOf(id);
    if (idx !== -1) {
      checked.splice(idx, 1);
    } else {
      checked.push(id);
    }
    this.setState({
      mainItemsChecked: checked,
    });
  };

  handleToggleSelectedItems = id => {
    const checked = [...this.state.selectedItemsChecked];
    const idx = checked.indexOf(id);
    if (idx !== -1) {
      checked.splice(idx, 1);
    } else {
      checked.push(id);
    }
    this.setState({
      selectedItemsChecked: checked,
    });
  };

  addNewItemsToSelectedItems = () => {
    const mainItemsChecked = this.state.mainItemsChecked;
    const mainItemsMap = { ...this.state.mainItemsMap };
    const selectedItemsMap = { ...this.state.selectedItemsMap };
    mainItemsChecked.forEach(itemId => {
      selectedItemsMap[itemId] = mainItemsMap[itemId];
      delete mainItemsMap[itemId];
    });

    const selectedItems = Object.values(selectedItemsMap);
    this.props.selectedItemsChangeHandler(selectedItems);

    this.setState({
      mainItems: Object.values(mainItemsMap),
      mainItemsMap,
      selectedItems,
      selectedItemsMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  addAllItemsToSelectedItems = () => {
    const newSelectedItemsMap = {
      ...this.state.selectedItemsMap,
      ...this.state.mainItemsMap,
    };

    const selectedItems = Object.values(newSelectedItemsMap);
    this.props.selectedItemsChangeHandler(selectedItems);
    this.setState({
      mainItems: [],
      mainItemsMap: {},
      selectedItems,
      selectedItemsMap: newSelectedItemsMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  deleteItemsToSelectedItems = () => {
    const selectedItemsChecked = this.state.selectedItemsChecked;
    const mainItemsMap = { ...this.state.mainItemsMap };
    const selectedItemsMap = { ...this.state.selectedItemsMap };
    selectedItemsChecked.forEach(itemId => {
      mainItemsMap[itemId] = selectedItemsMap[itemId];
      delete selectedItemsMap[itemId];
    });

    const selectedItems = Object.values(selectedItemsMap);
    this.props.selectedItemsChangeHandler(selectedItems);
    this.setState({
      mainItems: Object.values(mainItemsMap),
      mainItemsMap,
      selectedItems,
      selectedItemsMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  deleteAllItemsFromSelectedItems = () => {
    const newMainItemsMap = {
      ...this.state.selectedItemsMap,
      ...this.state.mainItemsMap,
    };
    this.props.selectedItemsChangeHandler([]);
    this.setState({
      mainItems: Object.values(newMainItemsMap),
      mainItemsMap: newMainItemsMap,
      selectedItems: [],
      selectedItemsMap: {},
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  render() {
    const {
      dir,
      icon,
      itemIdName,
      itemTextField,
      mainTitle,
      selectedTitle,
      className,
      selectedItemsChangeHandler,
    } = this.props;
    return (
      <div className={cn(s['pick-list'], className)} style={{ direction: dir }}>
        <div className={s['main-list-wrapper']}>
          <Card>
            <CardHeader
              disableTypography
              style={listHeaderStyle}
              title={mainTitle}
            />
            <CardContent className={s['pick-list-content']}>
              <List disablePadding>
                {this.state.mainItems.map((item, index) => (
                  <div>
                    <ListItem
                      className={s['list-item']}
                      key={index}
                      button
                      onClick={() =>
                        this.handleToggleMainItems(item[itemIdName])
                      }
                    >
                      {icon}
                      <ListItemText
                        disableTypography
                        style={itemStyle}
                        primary={item[itemTextField]}
                      />
                      <Checkbox
                        className={s['list-item-checkbox']}
                        checked={
                          this.state.mainItemsChecked.indexOf(
                            item[itemIdName],
                          ) !== -1
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
        <div className={s['buttons-wrapper']}>
          <div className={s.buttons}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.addNewItemsToSelectedItems()}
            >
              {dir === 'ltr' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </Button>
          </div>
          <div className={s.buttons}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.addAllItemsToSelectedItems()}
            >
              {dir === 'ltr' ? <FastForwardIcon /> : <FastRewindIcon />}
            </Button>
          </div>
          <div className={s.buttons}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.deleteItemsToSelectedItems()}
            >
              {dir === 'ltr' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </Button>
          </div>
          <div className={s.buttons}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.deleteAllItemsFromSelectedItems()}
            >
              {dir === 'ltr' ? <FastRewindIcon /> : <FastForwardIcon />}
            </Button>
          </div>
        </div>
        <div className={s['selected-list-wrapper']}>
          <Card>
            <CardHeader
              disableTypography
              title={selectedTitle}
              style={listHeaderStyle}
            />
            <CardContent className={s['pick-list-content']}>
              <List disablePadding>
                {this.state.selectedItems.map((item, index) => (
                  <div>
                    <ListItem
                      style={{ overflowWrap: 'break-word' }}
                      key={index}
                      button
                      className={s['list-item']}
                      onClick={() =>
                        this.handleToggleSelectedItems(item[itemIdName])
                      }
                    >
                      {icon}
                      <ListItemText
                        disableTypography
                        style={itemStyle}
                        primary={item[itemTextField]}
                      />
                      <Checkbox
                        className={s['list-item-checkbox']}
                        checked={
                          this.state.selectedItemsChecked.indexOf(
                            item[itemIdName],
                          ) !== -1
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpPickList));
