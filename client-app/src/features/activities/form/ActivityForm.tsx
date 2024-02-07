import React, { ChangeEvent, useState } from "react";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedActivity ?? {
    title: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    city: "",
  };
  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
}
