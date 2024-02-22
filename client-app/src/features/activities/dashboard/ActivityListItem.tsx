import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemImage,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activity: Activity;
}
export default function ActivityListItem({ activity }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size="tiny" circular src="/assets/user.png" />
            <ItemContent>
              <ItemHeader as={Link} to={`/activitis/${activity.id}`}>
                {activity.title}
              </ItemHeader>
              <ItemDescription>Hosted by Bob</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="view"
        />
      </Segment>
    </SegmentGroup>
  );
}