import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/Common/Form/MyTextInput";
import MyTextArea from "../../../app/Common/Form/MyTextArea";
import { observer } from "mobx-react-lite";

interface Props {
  setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();


  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={{
          displayName: profile?.displayName,
          bio: profile?.bio,
        }}
        onSubmit={(values) =>
          updateProfile(values).then(() => {
            setEditMode(false);
          })
        }
        validationScheme={Yup.object({
          displayName: Yup.string()
            .min(3)
            .required("Displayname must not be empty"),
        })}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="displayName" placeholder="Displayname" />
            <MyTextArea rows={3} placeholder="Add your bio" name="bio" />

            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
