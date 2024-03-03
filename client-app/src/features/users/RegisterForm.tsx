import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/Common/Form/MyTextInput";
import { Button, Divider, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";
export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
          .matches(passwordRules, {
            message: "Please create a stronger password",
          })
          .required("Required"),
        'new-password': Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
            style={{ marginBottom: "20px" }}
          />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Username" name="username" />
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <MyTextInput
            placeholder="Confirm Password"
            name="new-password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error as unknown as string[]} />
            )}
          />
          <Divider />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
