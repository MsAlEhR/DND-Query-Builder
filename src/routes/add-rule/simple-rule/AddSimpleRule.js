import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import normalizeCss from "../../../../node_modules/normalize.css/normalize.css";
import s from "./AddSimpleRule.css";
import CmpCard from "../../../components/CmpCard";
import QueryBuilderPart from "./query-maker/QueryBuilderPart";
import { ErrorType, PageStatus } from "../../../constants/general";
import CmpPageLoading from "../../../components/CmpPageLoading";

class AddSimpleRule extends React.Component {
  constructor(props) {
    super(props);
      this.baseInfo ={
          arithmeticOperator:
              {   ADD: "+",
                  MUL: "×",
                  SUB: "-",
              },
          comparativeOperator:
              {   EQUAL: "=",
                  EQUAL_OR_GREATER_THAN: ">=",
                  EQUAL_OR_LESS_THAN: "<=",
                  GREATER_THAN: ">",
                  LESS_THAN: "<",
                  UNEQUAL: "!="
              },
          relationalOperator:
              {   AND: "And",
                  NOT: "Not",
                  OR: "Or"},
          valueTypes:{DATE:"Date",NUMBER:"Number",NULL:"NULL",STRING:"String"}
      };
    this.state = {
      showDayInput: false,
      pageStatus: PageStatus.LOADING,
      queryInfo: {
        boxes: {
          0: {
            top: 50,
            left: 180,
            title: "Destination",
            dustbinList: ["0"],
            canDrag: false
          },
          1: {
            top: 350,
            left: 180,
            title: "Source",
            dustbinList: ["1", "2"],
            canDrag: true
          }
        },
        dustbin: { 0: { hasParent: false } },
        arrowValue: 0,
        possibleDust: ["0"]
      },
      rule: {
        "@type": "SimpleRuleModel",
        expression: {}
      },
    };

  }



  handleExpression = expression => {
    this.setState({ rule: { ...this.state.rule, expression } });
  };
  setDustbin = dustbin => {
    this.setState({ queryInfo: { ...this.state.queryInfo, dustbin } });
  };
  setBoxes = boxes => {
    this.setState({ queryInfo: { ...this.state.queryInfo, boxes } });
  };
  setArrow = arrowValue => {
    this.setState({ queryInfo: { ...this.state.queryInfo, arrowValue } });
  };
  setPossibleDust = possibleDust => {
    this.setState({ queryInfo: { ...this.state.queryInfo, possibleDust } });
  };



  componentDidMount(): void {}

  render() {
    const { dir, intl } = this.props;
    return (
      <CmpPageLoading pageStatus="DATA_FETCHED">
        <div style={{ minWidth: 850, height: 827 }}>

              <CmpCard
                dir={dir}
                header={{
                  text: intl.formatMessage({
                    id: "queryBuilder.title"
                  })
                }}
                content={<QueryBuilderPart
                    intl={this.props.intl}
                    dir={this.props.dir}
                    expression={this.state.rule.expression}
                    baseInfo={this.baseInfo}
                    queryInfo={this.state.queryInfo}
                    handleExpression={this.handleExpression}
                    setDustbin={this.setDustbin}
                    setBoxes={this.setBoxes}
                    setArrow={this.setArrow}
                    setPossibleDust={this.setPossibleDust}
                />}
              />
        </div>
      </CmpPageLoading>
    );
  }
}

const mapStateToProps = state => ({
  dir: state.locale.data.dir,
});

const mapDispatchToProps = dispatch => ({
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(normalizeCss, s)(AddSimpleRule))
);
