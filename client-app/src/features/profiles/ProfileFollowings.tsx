import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Grid, GridColumn, GridRow, Header, TabPane } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadingFollowings } = profileStore;

  return (
    <TabPane loading={loadingFollowings}>
      <Grid>
        <GridRow width={16}>
          <Header
            floated="left"
            icon={"user"}
            content={
              profileStore.activeTab === 3
                ? `${profile?.displayName}'s Followers`
                : `People ${profile?.displayName} is following`
            }
          />
        </GridRow>
        <GridRow columns={3} divided>
          {followings.map((profile) => (
            <GridColumn>
              <ProfileCard key={profile.username} profile={profile} />
            </GridColumn>
          ))}
        </GridRow>
      </Grid>
    </TabPane>
  );
});
