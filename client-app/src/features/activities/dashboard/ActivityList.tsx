import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  ItemMeta,
  Label,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();

  const { activitiesByDate, deleteActivity, loading } = activityStore;
  
  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <ItemGroup divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <ItemContent>
              <ItemHeader as="a">{activity.title}</ItemHeader>
              <ItemMeta>{activity.date}</ItemMeta>
              <ItemDescription>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </ItemDescription>
              <ItemExtra>
                <Label floated="left" content={activity.category} basic />
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="delete"
                  color="red"
                  loading={loading && target == activity.id}
                  name={activity.id}
                />
              </ItemExtra>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
});
