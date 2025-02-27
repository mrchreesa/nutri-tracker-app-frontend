import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Card, MuiThemeProvider, Typography, Button, TextField } from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";
import { OnChangeHandler } from "../Libs";
import { useAuthedProfile } from "../Context/AuthedProfileContext";
import Header from "../Components/Header";
import Joke from "../Components/Joke";

const defaultRegistrationFieldValues = {
	username: "",
	email: "",
	password: "",
};

export default function Registration() {
	const history = useHistory();
	const [registrationFieldValues, setRegistrationFieldValues] = useState(defaultRegistrationFieldValues);
	const [isErrorUsername, setIsErrorUsername] = useState(false);
	const [isErrorEmail, setIsErrorEmail] = useState(false);
	const [isErrorPassword, setIsErrorPassword] = useState(false);
	const [helperTextUsername, setHelperTextUsername] = useState("");
	const [helperTextEmail, setHelperTextEmail] = useState("");
	const [helperTextPassword, setHelperTextPassword] = useState("");

	const registrationFormOnChangeHandler = new OnChangeHandler(registrationFieldValues, setRegistrationFieldValues);
	const { setAuthedProfile } = useAuthedProfile();

	const validateRegistration = (formInput) => {
		const { username, email, password } = formInput;
		let isValid = true;

		if (!username || username.length === 0) {
			setIsErrorUsername(true);
			setHelperTextUsername("Must provide a username");
			isValid = false;
		} else if (username.length <= 3) {
			setIsErrorUsername(true);
			setHelperTextUsername("Username must be longer than 3 characters");
			isValid = false;
		} else if (username.length > 30) {
			setIsErrorUsername(true);
			setHelperTextUsername("Username cannot be longer than 30 characters");
			isValid = false;
		} else {
			setIsErrorUsername(false);
			setHelperTextUsername("");
		}

		if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setIsErrorEmail(true);
			setHelperTextEmail("Must provide a valid email address");
			isValid = false;
		} else if (email.length > 50) {
			setIsErrorEmail(true);
			setHelperTextEmail("Email cannot be longer than 50 characters");
			isValid = false;
		} else {
			setIsErrorEmail(false);
			setHelperTextEmail("");
		}

		if (!password || password.length === 0) {
			setIsErrorPassword(true);
			setHelperTextPassword("Must provide a password");
			isValid = false;
		} else if (password.length <= 5) {
			setIsErrorPassword(true);
			setHelperTextPassword("Password must be at least 6 characters long");
			isValid = false;
		} else if (password.length > 50) {
			setIsErrorPassword(true);
			setHelperTextPassword("Password cannot be longer than 50 characters");
			isValid = false;
		} else {
			setIsErrorPassword(false);
			setHelperTextPassword("");
		}

		return isValid;
	};

	const registerUser = async () => {
		if (!validateRegistration(registrationFieldValues)) {
			return;
		}

		try {
			const response = await axios.post("https://nutri-tracker-app-backend.vercel.app/users", registrationFieldValues, { withCredentials: true });
			const { username } = response.data;
			setAuthedProfile(username);
			setRegistrationFieldValues(defaultRegistrationFieldValues);
			setTimeout(() => history.push("/search"), 100); // Delay redirect
		} catch (error) {
			console.error("Registration error:", error.response?.status, error.response?.data);
			if (error.response?.status === 409) {
				setHelperTextEmail("Username or email already taken");
			} else {
				setHelperTextEmail("Registration failed. Please try again.");
			}
			setIsErrorEmail(true);
		}
	};

	const classes = useStyles();

	return (
		<MuiThemeProvider theme={THEME}>
			<Grid container item className={classes.root}>
				<Header />
				<Grid container className="profile-reg-container">
					<Grid className="reg" component={Card} container direction="column" justify="space-around" style={{ padding: 20 }}>
						<Typography variant="h5" style={{ textAlign: "center" }}>
							Registration
						</Typography>
						<TextField error={isErrorUsername} helperText={helperTextUsername} label="Username" name="username" value={registrationFieldValues.username} onChange={registrationFormOnChangeHandler.handleEvent} />
						<TextField error={isErrorEmail} helperText={helperTextEmail} label="Email" name="email" value={registrationFieldValues.email} onChange={registrationFormOnChangeHandler.handleEvent} />
						<TextField error={isErrorPassword} helperText={helperTextPassword} label="Password" type="password" value={registrationFieldValues.password} onChange={registrationFormOnChangeHandler.handleEvent} />
						<Button className="btn-log-reg" onClick={registerUser}>
							Submit
						</Button>
					</Grid>
					<Joke />
				</Grid>
				<div className="spacer layer1"></div>
			</Grid>
		</MuiThemeProvider>
	);
}
