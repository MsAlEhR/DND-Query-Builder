import React from "react";
import NotFound from "./NotFound";
import AppLayout from "../../components/AppLayout";

const title = "Fraud Management";

function action() {
  return {
    chunks: ["not-found"],
    title,
    component: (
      <AppLayout>
        <NotFound title={title} />
      </AppLayout>
    )
  };
}

export default action;
