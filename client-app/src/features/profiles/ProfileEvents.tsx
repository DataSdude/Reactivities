import {
  Grid,
  GridColumn,
  GridRow,
  Header,
  Tab,
  TabPane,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityCard from "../activities/dashboard/ActivityCard";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function ProfileEvents() {
  const { profileStore } = useStore();
  const { loadingProfileActivities, events, loadProfileActivities, profile } =
    profileStore;
  useEffect(() => {
    loadProfileActivities(profile!.username, "future");
  }, [loadProfileActivities, profile]);
  const panes = [
    {
      menuItem: "Future Events",
      render: () => (
        <TabPane loading={loadingProfileActivities}>
          <Grid>
            <GridRow columns={4} width={16} divided>
              {events.map((activity) => (
                <GridColumn key={activity!.id}>
                  <ActivityCard activity={activity!} key={activity!.id} />
                </GridColumn>
              ))}
            </GridRow>
          </Grid>
        </TabPane>
      ),
    },
    {
      menuItem: "Past Events",
      render: () => (
        <TabPane loading={loadingProfileActivities}>
          <Grid>
            <GridRow columns={4} width={16} divided>
              {events.map((activity) => (
                <GridColumn key={activity!.id}>
                  <ActivityCard activity={activity!} key={activity!.id} />
                </GridColumn>
              ))}
            </GridRow>
          </Grid>
        </TabPane>
      ),
    },
    {
      menuItem: "Hosting",
      render: () => (
        <TabPane loading={loadingProfileActivities}>
          <Grid>
            <GridRow columns={4} width={16} divided>
              {events.map((activity) => (
                <GridColumn key={activity!.id}>
                  <ActivityCard activity={activity!} key={activity!.id} />
                </GridColumn>
              ))}
            </GridRow>
          </Grid>
        </TabPane>
      ),
    },
  ];
  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header icon="calendar" content="Activities" floated="left" />
        </GridColumn>
        <GridColumn width={16}>
          <Tab
            panes={panes}
            onTabChange={(_, data) =>
              profileStore.setEventTab(data.activeIndex as number)
            }
          />
        </GridColumn>
      </Grid>
    </TabPane>
  );
});
