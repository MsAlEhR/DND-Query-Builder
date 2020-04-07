import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./CmpSqlText.css";
import CmpFormTextField from "../CmpFormTextField/CmpFormTextField";

const keyWords = [
  "SELECT",
  "INSERT",
  "UPDATE",
  "MERGE",
  "FROM",
  "WHERE",
  "INNER",
  "JOIN",
  "WITH",
  "AS",
  "AND",
  "OR",
  "IN",
  "EXIST",
  "NULL",
  "NOT",
  "NUMBER",
  "VARCHAR2",
  "CHAR",
  "IS",
  "CASE",
  "WHEN"
];
class CmpSqlText extends React.Component {
  getSql = text => {
    if (text === " " || text === null) {
      return text;
    }
    const words = text.split(" ");
    let sql = "";
    words.forEach((w, i) => {
      if (keyWords.includes(w.toUpperCase())) sql += w.toUpperCase();
      else sql += w;
      if (i !== words.length - 1) sql = `${sql} `;
    });
    // words.forEach((w, i) => {
    //   if (keyWords.includes(w.toUpperCase())) sql += w.toUpperCase();
    //   else if (w.match(/(^'|")[^'"]*('|"$)?/)) sql += w;
    //   else sql += w.toLowerCase();
    //   if (i !== words.length - 1) sql = `${sql} `;
    // });
    return sql;
  };

  render() {
    return (
      <CmpFormTextField {...this.props} value={this.getSql(this.props.value)} />
    );
  }
}

export default withStyles(s)(CmpSqlText);
