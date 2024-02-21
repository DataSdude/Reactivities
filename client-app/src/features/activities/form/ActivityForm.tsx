import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/Activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuidv4 } from "uuid";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loadingInitial,
    loading,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    city: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function handleSubmit() {
    if (!activity.id) {
      activity.id = uuidv4();
      console.log(activity.id);

      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
      console.log(JSON.stringify(activity));
    }
  }

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          placeholder="Title"
          name="title"
          value={activity ? activity.title : ""}
          onChange={handleInputChange}
          required
        />
        <FormInput
          placeholder="Description"
          name="description"
          value={activity ? activity.description : ""}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="Category"
          name="category"
          value={activity ? activity.category : ""}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="date"
          placeholder="Date"
          name="date"
          value={activity ? activity.date : ""}
          onChange={handleInputChange}
          required
        />
        <FormInput
          placeholder="Venue"
          name="venue"
          value={activity ? activity.venue : ""}
          onChange={handleInputChange}
          required
        />
        <FormInput
          placeholder="City"
          name="city"
          value={activity ? activity.city : ""}
          onChange={handleInputChange}
          required
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to={activity.id ? `/activities/${activity.id}` : `/activities`}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
