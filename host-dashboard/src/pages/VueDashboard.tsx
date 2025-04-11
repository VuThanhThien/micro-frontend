import React from "react";
import VueWrapper from "../core/components/VueWrapper";

import { Dashboard as VueDashboard } from "remoteVue/pages";

const VueDashboardPage: React.FC = () => {
  return (
    <div className="vue-dashboard-container">
      <VueWrapper component={VueDashboard} props={{ title: "Vue Dashboard" }} />
    </div>
  );
};

export default VueDashboardPage;
