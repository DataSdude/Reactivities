import { Button, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../app/stores/store";
import ProfileForm from "../activities/form/ProfileForm";

export default function ProfileAbout() {
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore();

  const [editProfileMode, setEditProfileMode] = useState(false);

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            icon="user"
            content={`About ${profile?.displayName}`}
            floated="left"
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editProfileMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditProfileMode(!editProfileMode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {editProfileMode ? (
            <ProfileForm setEditMode={setEditProfileMode}/>
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>
              {profile?.bio}
              </span>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
