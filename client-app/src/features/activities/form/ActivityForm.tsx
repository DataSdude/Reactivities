import React, { ChangeEvent, useState } from "react";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    city: "",
  };
  const [activity, setActivity] = useState(initialState);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          placeholder="Title"
          name="title"
          value={activity ? activity.title : ""}
          onChange={handleInputChange}
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
        />
        <FormInput
          type="date"
          placeholder="Date"
          name="date"
          value={activity ? activity.date : ""}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="Venue"
          name="venue"
          value={activity ? activity.venue : ""}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="City"
          name="city"
          value={activity ? activity.city : ""}
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          loading={loading}
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
});
