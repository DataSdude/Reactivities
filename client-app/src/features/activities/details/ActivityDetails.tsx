import React from "react";
import {
  Image,
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
  Button,
  ButtonGroup,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancelSelectedActivity,
  } = activityStore;

  if (!activity) return;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span className="date">{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectedActivity}
          />
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
