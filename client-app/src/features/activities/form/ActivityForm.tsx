import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/Activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/Common/Form/MyTextInput";
import MyTextArea from "../../../app/Common/Form/MyTextArea";
import MySelectInput from "../../../app/Common/Form/MySelectInput";
import { categoryOptions } from "../../../app/Common/Form/options/CategoryOptions";
import MyDateInput from "../../../app/Common/Form/MyDateInput";
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
    date: null,
    venue: "",
    city: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("The activity category is required"),
    date: Yup.string().required("The activity date is required"),
    venue: Yup.string().required("The activity venue is required"),
    city: Yup.string().required("The activity city is required"),
  });
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (!activity.id) {
      activity.id = uuidv4();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="Venue" name="venue" />
            <MyTextInput placeholder="City" name="city" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
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
        )}
      </Formik>
    </Segment>
  );
});
