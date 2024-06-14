import { observer } from "mobx-react-lite";
import { Card, CardContent, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
}
export default observer(function ActivityCard({ activity }: Props) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options).replace(", ", "\n");
  };
  return (
    <Card as={Link} to={`/activities/${activity.id}`}>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <CardContent>
          <div>{formatDate(new Date(activity.date!))}</div>
        </CardContent>
      </Card.Content>
    </Card>
  );
});
