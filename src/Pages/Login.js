import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, MuiThemeProvider, Typography, Button, TextField } from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";
import { OnChangeHandler } from "../Libs";
import { useAuthedProfile } from "../Context/AuthedProfileContext";
import Header from "../Components/Header";
import Joke from "../Components/Joke";
import { useHistory } from "react-router-dom";

const defaultLoginFieldValues = {
	email: "",
	password: "",
};

export default function Login() {
	const history = useHistory();
	const [loginFieldValues, setLoginFieldValues] = useState(defaultLoginFieldValues);
	const [isErrorEmail, setIsErrorEmail] = useState(null);
	const [isErrorPassword, setIsErrorPassword] = useState(null);
	const [helperTextEmail, setHelperTextEmail] = useState("");
	const [helperTextPassword, setHelperTextPassword] = useState("");

	const loginFormOnChangeHandler = new OnChangeHandler(loginFieldValues, setLoginFieldValues);
	const { setAuthedProfile } = useAuthedProfile();

	const validateAndLogin = async () => {
		const { email, password } = loginFieldValues;
		let isValid = true;

		// Email validation
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

		// Password validation
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

		if (!isValid) return;

		try {
			const response = await axios.post("https://nutri-tracker-app-backend.vercel.app/users/session", loginFieldValues, { withCredentials: true });
			const { username } = response.data;
			setLoginFieldValues(defaultLoginFieldValues);
			setAuthedProfile(username);
			history.push("/search");
		} catch (error) {
			console.error("Login error:", error);
			setHelperTextEmail("Login failed. Check credentials.");
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
							Log In
						</Typography>
						<TextField error={isErrorEmail} helperText={helperTextEmail} label="Email" name="email" value={loginFieldValues.email} onChange={loginFormOnChangeHandler.handleEvent} />
						<TextField error={isErrorPassword} helperText={helperTextPassword} label="Password" name="password" value={loginFieldValues.password} onChange={loginFormOnChangeHandler.handleEvent} />
						<Button className="btn-log-reg" onClick={validateAndLogin}>
							Enter
						</Button>
					</Grid>
					<Joke />
				</Grid>
				<div className="spacer layer1"></div>
			</Grid>
		</MuiThemeProvider>
	);
}
