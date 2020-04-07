import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import normalizeCss from "normalize.css";
import { injectIntl } from "react-intl";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import cn from "classnames";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CheckIcon from "@material-ui/icons/CheckBox";
import UncheckIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Divider, Tooltip } from "@material-ui/core";
import theme from "../../theme/theme";
import s from "./CmpListSelect.css";

const listHeaderStyle = {
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: 18
};

const parentWrapperStyle = {
  border: "1px solid",
  borderColor: theme.palette.primary.light,
  marginBottom: 5
};

const parentTitleStyle = {
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  textAlign: "center",
  fontSize: 18,
  paddingTop: 5,
  paddingBottom: 5
};

const contentStyle = {
  paddingTop: 0,
  paddingBottom: 0
};

const actionStyle = {
  position: "relative",
  top: 5
};

const selectionStyle = {
  cursor: "pointer"
};

const itemStyle = {
  color: theme.palette.primary.dark,
  overflowWrap: "break-word",
  fontSize: 15
};

class CmpListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }

  handleToggleMainItems = id => {
    const checked = this.props.selectedList;
    const idx = checked.indexOf(checked.filter(i => i.id === id)[0]);
    if (idx !== -1) {
      checked.splice(idx, 1);
    } else {
      checked.push({ id });
    }

    this.props.selectedItemsHandler(checked);
    this.setState({ checked });
  };

  selectSources = () => {
    const checked = [];
    const source = this.props.sourceList;
    Object.keys(source).forEach(child => {
      checked.push(source[child]);
    });
    this.props.selectedItemsHandler(checked);
    this.setState({ checked });
  };

  deselectSources = () => {
    this.props.selectedItemsHandler([]);
    this.setState({ checked: [] });
  };

  render() {
    const {
      className,
      dir,
      intl,
      sourceList,
      title,
      selectedList
    } = this.props;
    return (
      <div className={cn(s["pick-list"], className)} style={{ direction: dir }}>
        <Card key={0} style={parentWrapperStyle}>
          <CardHeader
            style={parentTitleStyle}
            title={title}
            disableTypography
            action={
              <div style={actionStyle}>
                <Tooltip
                  title={intl.formatMessage({
                    id: "keywords.checkAll"
                  })}
                >
                  <CheckIcon
                    style={selectionStyle}
                    onClick={() => this.selectSources()}
                  />
                </Tooltip>
                <Tooltip
                  title={intl.formatMessage({
                    id: "keywords.uncheckAll"
                  })}
                >
                  <UncheckIcon
                    style={selectionStyle}
                    onClick={this.deselectSources}
                  />
                </Tooltip>
              </div>
            }
          />
          <CardContent style={contentStyle}>
            <List disablePadding style={{ paddingBottom: 5 }}>
              {Object.keys(sourceList).map((child, chIdx) => (
                <div>
                  <ListItem
                    // key={chIdx}
                    className={s["list-item"]}
                    button
                    onClick={() =>
                      this.handleToggleMainItems(sourceList[child].id)
                    }
                  >
                    <Checkbox
                      className={s["list-item-checkbox"]}
                      checked={selectedList
                        .map(i => i.id)
                        .includes(sourceList[child].id)}
                    />
                    <ListItemText
                      disableTypography
                      style={itemStyle}
                      primary={sourceList[child].title}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpListSelect));
