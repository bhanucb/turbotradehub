import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import AppLogo from "../../components/AppLogo";
import Typography from "@mui/material/Typography";
import { login } from "../../api/Authentication";
import { Navigate, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import AppSnackbar, { useSnackbar } from "../../components/AppSnackbar";
import { cibcBackgroundColor } from "../../Colors";

const Background = styled(Paper)`
  height: 100vh;
  border-radius: 0;
  display: flex;
  align-items: center;
`;

const MuiInputComponent = (props: FieldProps) => {
  const { field: fieldProps, ...otherProps } = props;

  const fieldName = fieldProps.name;
  const touched = otherProps.form.touched[fieldName] as boolean;
  const errorStr = otherProps.form.errors[fieldName] as string;
  const isError = touched && !!errorStr;

  return (
    <TextField
      margin="normal"
      error={isError}
      helperText={isError ? errorStr : ""}
      fullWidth
      {...fieldProps}
      {...otherProps}
    />
  );
};

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type LoginForm = Yup.InferType<typeof loginFormSchema>;

const initialFormValues: LoginForm = {
  email: "",
  password: "",
};

const LogIn: FC = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState<boolean>(false);
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();
  const theme = useTheme();
  const mode = theme.palette.mode;

  async function handleSubmit(
    values: LoginForm,
    helpers: FormikHelpers<LoginForm>
  ) {
    const { email, password } = values;
    try {
      setLoading(true);
      const authData = await login(email, password);
      const { token } = authData;
      if (
        signIn({
          token,
          authState: { email },
          expiresIn: 131400, // 3 month
          tokenType: "Bearer",
        })
      ) {
        setLoading(false);
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      helpers.resetForm();
      console.error(e);
      showMessage("Error signing in. Please contact support.", "error");
    }
  }

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Background
        elevation={0}
        sx={{
          backgroundColor:
            mode === "light"
              ? cibcBackgroundColor
              : theme.palette.background.default,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            m={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppLogo />
            <Typography
              noWrap
              component="a"
              sx={{
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Interactive Pricing Alpha
            </Typography>
          </Box>
          <Card>
            <CardContent>
              <Formik
                initialValues={initialFormValues}
                validationSchema={loginFormSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, values }) => (
                  <Form>
                    <Field
                      name="email"
                      label="Email Address"
                      required
                      autoComplete="email"
                      autoFocus
                      component={MuiInputComponent}
                    />
                    <Field
                      name="password"
                      label="Password"
                      type="password"
                      required
                      autoComplete="current-password"
                      component={MuiInputComponent}
                    />
                    <LoadingButton
                      loading={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 1 }}
                      disabled={
                        (values.email === "" && values.password === "") ||
                        !isValid
                      }
                    >
                      Sign In
                    </LoadingButton>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Background>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </>
  );
};

export default LogIn;
