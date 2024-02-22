import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;
  useEffect(() => {
    activityRegistry.size <= 1 ? loadActivities() : "";
  }, [loadActivities, activityRegistry]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <ActivityFilter />
      </GridColumn>
    </Grid>
  );
});
