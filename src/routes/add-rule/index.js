import React from "react";
import AppLayout from "../../components/AppLayout/AppLayout";
import AddSimpleRule from "./simple-rule/AddSimpleRule";
import {PageType} from "../../constants/general";

const title = "Rule Management";

async function action( ) {
  return {
    chunks: ["add-rule"],
    title,
    component: (
      <AppLayout authenticationRequired={false} type={PageType.RAW}>
        <AddSimpleRule />
      </AppLayout>
    )
  };
}

export default action;
