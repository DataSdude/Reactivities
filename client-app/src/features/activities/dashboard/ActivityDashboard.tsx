import { useEffect, useState } from "react";
import { Dimmer, Grid, GridColumn, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityFilter from "./ActivityFilter";
import { PagingParams } from "../../../app/models/Pagination";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities, setPagingParams, pagination } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => {
      setLoadingNext(false);
    });
  }
  useEffect(() => {
    activityRegistry.size <= 1 ? loadActivities() : "";
  }, [loadActivities, activityRegistry]);

  return (
    <Grid>
      <GridColumn width={10}>
        {activityStore.loadingInitial &&
        activityRegistry.size == 0 &&
        !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
            threshold={350}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </GridColumn>
      <GridColumn width={6}>
        <ActivityFilter />
      </GridColumn>
      <GridColumn width={10} style={{ margin: "20px" }}>
        <Dimmer inverted active={loadingNext}>
          <Loader inverted content="Hang in there..." />
        </Dimmer>
      </GridColumn>
    </Grid>
  );
});
