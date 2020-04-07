import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import { injectIntl } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import cn from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import CheckIcon from '@material-ui/icons/CheckBox';
import UncheckIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Divider, Tooltip } from '@material-ui/core';
import theme from '../../theme/theme';
import s from './CmpPickList1.css';

const listHeaderStyle = {
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  fontSize: 18,
};

const parentWrapperStyle = {
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  marginBottom: 5,
};

const parentTitleStyle = {
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  fontSize: 18,
  paddingTop: 5,
  paddingBottom: 5,
};

const contentStyle = {
  paddingTop: 0,
  paddingBottom: 0,
};

const actionStyle = {
  position: 'relative',
  top: 5,
};

const selectionStyle = {
  cursor: 'pointer',
};

const itemStyle = {
  color: theme.palette.primary.dark,
  overflowWrap: 'break-word',
  fontSize: 15,
};

class CmpPickList1 extends React.Component {
  constructor(props) {
    super(props);

    const sourceMap = {};
    const destMap = {};

    this.parentTitles = {};

    console.log(this.props.destParents, this.props.sourceParents);
    this.props.destParents.forEach(parent => {
      destMap[parent.name] = {};
      this.parentTitles[parent.name] = parent.title;
      parent[this.props.authorityFieldName].forEach(child => {
        destMap[parent.name][child.name] = child;
      });
    });

    this.props.sourceParents.forEach(parent => {
      sourceMap[parent.name] = {};
      this.parentTitles[parent.name] = parent.title;
      parent[this.props.authorityFieldName].forEach(child => {
        if (!destMap.hasOwnProperty(parent.name)) {
          sourceMap[parent.name][child.name] = child;
        } else if (!destMap[parent.name].hasOwnProperty(child.name)) {
          sourceMap[parent.name][child.name] = child;
        }
      });
      if (Object.keys(sourceMap[parent.name]).length === 0)
        delete sourceMap[parent.name];
    });

    console.log(sourceMap, destMap);
    this.state = {
      sourceMap,
      destMap,
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
    const sourceMap = { ...this.state.sourceMap };
    const destMap = { ...this.state.destMap };

    mainItemsChecked.forEach(itemId => {
      const [parent, child] = itemId.split('|+*+|');
      if (!destMap.hasOwnProperty(parent)) destMap[parent] = {};
      destMap[parent][child] = sourceMap[parent][child];

      delete sourceMap[parent][child];
      if (Object.keys(sourceMap[parent]).length === 0) delete sourceMap[parent];
    });

    const authorities = [];
    Object.keys(destMap).forEach(parent => {
      authorities.push(...Object.values(destMap[parent]));
    });
    this.props.selectedItemsChangeHandler(authorities);

    this.setState({
      sourceMap,
      destMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  addAllItemsToSelectedItems = () => {
    const allItemsMap = {};
    const authorities = [];

    Object.keys(this.state.sourceMap).forEach(parent => {
      if (!allItemsMap.hasOwnProperty(parent)) allItemsMap[parent] = {};
      allItemsMap[parent] = {
        ...allItemsMap[parent],
        ...this.state.sourceMap[parent],
      };
    });

    Object.keys(this.state.destMap).forEach(parent => {
      if (!allItemsMap.hasOwnProperty(parent)) allItemsMap[parent] = {};
      allItemsMap[parent] = {
        ...allItemsMap[parent],
        ...this.state.destMap[parent],
      };
    });

    Object.keys(allItemsMap).forEach(parent => {
      authorities.push(...Object.values(allItemsMap[parent]));
    });

    this.props.selectedItemsChangeHandler(authorities);
    this.setState({
      sourceMap: {},
      destMap: allItemsMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  deleteItemsFromSelectedItems = () => {
    const selectedItemsChecked = this.state.selectedItemsChecked;
    const sourceMap = { ...this.state.sourceMap };
    const destMap = { ...this.state.destMap };

    selectedItemsChecked.forEach(itemId => {
      const [parent, child] = itemId.split('|+*+|');
      if (!sourceMap.hasOwnProperty(parent)) sourceMap[parent] = {};
      sourceMap[parent][child] = destMap[parent][child];

      delete destMap[parent][child];
      if (Object.keys(destMap[parent]).length === 0) delete destMap[parent];
    });

    const authorities = [];
    Object.keys(destMap).forEach(parent => {
      authorities.push(...Object.values(destMap[parent]));
    });
    this.props.selectedItemsChangeHandler(authorities);
    this.setState({
      sourceMap,
      destMap,
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  deleteAllItemsFromSelectedItems = () => {
    const allItemsMap = {};

    Object.keys(this.state.sourceMap).forEach(parent => {
      if (!allItemsMap.hasOwnProperty(parent)) allItemsMap[parent] = {};
      allItemsMap[parent] = {
        ...allItemsMap[parent],
        ...this.state.sourceMap[parent],
      };
    });

    Object.keys(this.state.destMap).forEach(parent => {
      if (!allItemsMap.hasOwnProperty(parent)) allItemsMap[parent] = {};
      allItemsMap[parent] = {
        ...allItemsMap[parent],
        ...this.state.destMap[parent],
      };
    });
    this.props.selectedItemsChangeHandler([]);

    this.setState({
      sourceMap: allItemsMap,
      destMap: {},
      mainItemsChecked: [],
      selectedItemsChecked: [],
    });
  };

  selectAllSources = () => {
    const mainItemsChecked = [];
    Object.keys(this.state.sourceMap).forEach(parent => {
      Object.keys(this.state.sourceMap[parent]).forEach(child => {
        mainItemsChecked.push(`${parent}|+*+|${child}`);
      });
    });
    this.setState({
      mainItemsChecked,
    });
  };

  deselectAllSources = () => {
    this.setState({
      mainItemsChecked: [],
    });
  };

  selectSources = parent => {
    const mainItemsChecked = [...this.state.mainItemsChecked];
    Object.keys(this.state.sourceMap[parent]).forEach(child => {
      if (mainItemsChecked.indexOf(`${parent}|+*+|${child}`) === -1) {
        mainItemsChecked.push(`${parent}|+*+|${child}`);
      }
    });

    this.setState({
      mainItemsChecked,
    });
  };

  deselectSources = parent => {
    const mainItemsChecked = [...this.state.mainItemsChecked];
    Object.keys(this.state.sourceMap[parent]).forEach(child => {
      if (mainItemsChecked.indexOf(`${parent}|+*+|${child}`) !== -1) {
        mainItemsChecked.splice(
          mainItemsChecked.indexOf(`${parent}|+*+|${child}`),
          1,
        );
      }
    });

    this.setState({
      mainItemsChecked,
    });
  };

  selectAllDestinations = () => {
    const selectedItemsChecked = [];
    Object.keys(this.state.destMap).forEach(parent => {
      Object.keys(this.state.destMap[parent]).forEach(child => {
        selectedItemsChecked.push(`${parent}|+*+|${child}`);
      });
    });
    this.setState({
      selectedItemsChecked,
    });
  };

  deselectAllDestinations = () => {
    this.setState({
      selectedItemsChecked: [],
    });
  };

  selectDestinations = parent => {
    const selectedItemsChecked = [...this.state.selectedItemsChecked];
    Object.keys(this.state.destMap[parent]).forEach(child => {
      if (selectedItemsChecked.indexOf(`${parent}|+*+|${child}`) === -1) {
        selectedItemsChecked.push(`${parent}|+*+|${child}`);
      }
    });

    this.setState({
      selectedItemsChecked,
    });
  };

  deselectDestinations = parent => {
    const selectedItemsChecked = [...this.state.selectedItemsChecked];
    Object.keys(this.state.destMap[parent]).forEach(child => {
      if (selectedItemsChecked.indexOf(`${parent}|+*+|${child}`) !== -1) {
        selectedItemsChecked.splice(
          selectedItemsChecked.indexOf(`${parent}|+*+|${child}`),
          1,
        );
      }
    });

    this.setState({
      selectedItemsChecked,
    });
  };

  render() {
    const {
      sourceParents,
      childItemName,
      className,
      dir,
      intl,
      itemIdName,
      mainTitle,
      selectedTitle,
    } = this.props;
    return (
      <div className={cn(s['pick-list'], className)} style={{ direction: dir }}>
        <div className={s['main-list-wrapper']}>
          <Card>
            <CardHeader
              disableTypography
              style={listHeaderStyle}
              action={
                <div>
                  <Tooltip
                    title={intl.formatMessage({ id: 'keywords.checkAll' })}
                  >
                    <CheckIcon
                      style={selectionStyle}
                      onClick={this.selectAllSources}
                    />
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({ id: 'keywords.uncheckAll' })}
                  >
                    <UncheckIcon
                      style={selectionStyle}
                      onClick={this.deselectAllSources}
                    />
                  </Tooltip>
                </div>
              }
              title={mainTitle}
            />
            <CardContent className={s['pick-list-content']}>
              {Object.keys(this.state.sourceMap).map((parentKey, prIdx) => (
                <Card key={prIdx} style={parentWrapperStyle}>
                  <CardHeader
                    style={parentTitleStyle}
                    title={this.parentTitles[parentKey]}
                    disableTypography
                    action={
                      <div style={actionStyle}>
                        <Tooltip
                          title={intl.formatMessage({
                            id: 'keywords.checkAll',
                          })}
                        >
                          <CheckIcon
                            style={selectionStyle}
                            onClick={() => this.selectSources(parentKey)}
                          />
                        </Tooltip>
                        <Tooltip
                          title={intl.formatMessage({
                            id: 'keywords.uncheckAll',
                          })}
                        >
                          <UncheckIcon
                            style={selectionStyle}
                            onClick={() => this.deselectSources(parentKey)}
                          />
                        </Tooltip>
                      </div>
                    }
                  />
                  <CardContent style={contentStyle}>
                    <List disablePadding style={{ paddingBottom: 5 }}>
                      {Object.keys(this.state.sourceMap[parentKey]).map(
                        (child, chIdx) => (
                          <div>
                            <ListItem
                              key={chIdx}
                              className={s['list-item']}
                              button
                              onClick={() =>
                                this.handleToggleMainItems(
                                  `${parentKey}|+*+|${child}`,
                                )
                              }
                            >
                              <Checkbox
                                className={s['list-item-checkbox']}
                                checked={
                                  this.state.mainItemsChecked.indexOf(
                                    `${parentKey}|+*+|${child}`,
                                  ) !== -1
                                }
                              />
                              <ListItemText
                                disableTypography
                                style={itemStyle
                                }
                                primary={
                                  this.state.sourceMap[parentKey][child].title
                                }
                              />
                            </ListItem>
                            <Divider />
                          </div>
                        ),
                      )}
                    </List>
                  </CardContent>
                </Card>
              ))}
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
              onClick={() => this.deleteItemsFromSelectedItems()}
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
              style={listHeaderStyle}
              action={
                <div>
                  <Tooltip
                    title={intl.formatMessage({ id: 'keywords.checkAll' })}
                  >
                    <CheckIcon
                      style={selectionStyle}
                      onClick={this.selectAllDestinations}
                    />
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({ id: 'keywords.uncheckAll' })}
                  >
                    <UncheckIcon
                      style={selectionStyle}
                      onClick={this.deselectAllDestinations}
                    />
                  </Tooltip>
                </div>
              }
              title={selectedTitle}
            />
            <CardContent className={s['pick-list-content']}>
              {Object.keys(this.state.destMap).map((parentKey, prIdx) => (
                <Card key={prIdx} style={parentWrapperStyle}>
                  <CardHeader
                    style={parentTitleStyle}
                    title={this.parentTitles[parentKey]}
                    disableTypography
                    action={
                      <div style={actionStyle}>
                        <Tooltip
                          title={intl.formatMessage({
                            id: 'keywords.checkAll',
                          })}
                        >
                          <CheckIcon
                            style={selectionStyle}
                            onClick={() => this.selectDestinations(parentKey)}
                          />
                        </Tooltip>
                        <Tooltip
                          title={intl.formatMessage({
                            id: 'keywords.uncheckAll',
                          })}
                        >
                          <UncheckIcon
                            style={selectionStyle}
                            onClick={() => this.deselectDestinations(parentKey)}
                          />
                        </Tooltip>
                      </div>
                    }
                  />
                  <CardContent style={contentStyle}>
                    <List disablePadding>
                      {Object.keys(this.state.destMap[parentKey]).map(
                        (child, chIdx) => (
                          <div>
                            <ListItem
                              key={chIdx}
                              className={s['list-item']}
                              button
                              onClick={() =>
                                this.handleToggleSelectedItems(
                                  `${parentKey}|+*+|${child}`,
                                )
                              }
                            >
                              <Checkbox
                                className={s['list-item-checkbox']}
                                checked={
                                  this.state.selectedItemsChecked.indexOf(
                                    `${parentKey}|+*+|${child}`,
                                  ) !== -1
                                }
                              />
                              <ListItemText
                                disableTypography
                                style={itemStyle}
                                primary={
                                  this.state.destMap[parentKey][child].title
                                }
                              />
                            </ListItem>
                            <Divider />
                          </div>
                        ),
                      )}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpPickList1));
