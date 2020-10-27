import React, { Component } from "react";

class Homepage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newSessionUrl: "http://localhost:8080/api/newgame",
			validSessionUrl: "http://localhost:8080/api/validsession",
			session: "",
			invalidSessionMessage: null
		}
		this.handleSessionChange = this.handleSessionChange.bind(this);
		this.createSession = this.createSession.bind(this);
		this.joinSession = this.joinSession.bind(this);
	}

	componentDidMount() { }

	handleSessionChange(event) {
		this.setState({ session: event.target.value, invalidSessionMessage: null })
	}

	createSession(event) {
		event.preventDefault();

		console.log("creating new game session...");
		// get new session and redirect there
		fetch(this.state.newSessionUrl,
			{
				method: "post",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			},
		)
			.then((response) => {
				console.log(response);
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((session) => {
				// create game lobby url and redirect there
				let lobbyUrl = `/${session}`;
				// see https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
				this.props.history.push(lobbyUrl);
			})
			.catch(error => console.log(error));
	}

	joinSession(event) {
		event.preventDefault();
		let session = event.target.session.value
		console.log(`joining session ${session}...`);

		// check that session exists, then redirect if so.
		// otherwise, clear join session
		fetch(`${this.state.validSessionUrl}?session=${session}`,
			{
				method: "get",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			},
		)
			.then((response) => {
				console.log(response);
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((valid) => {
				if (!valid) { throw Error(`invalid session ${session}`); }
				let lobbyUrl = `/${session}`;
				this.props.history.push(lobbyUrl);
			})
			.catch(error => {
				console.log(error);
				// clear session input
				this.setState({
					session: "",
					invalidSessionMessage: `Sorry, it looks like the session "${session}" doesnt exist`
				});
			});
	}

	render() {
		return (
			<div className="scorecard ui centered grid container">
				{/* join button */}
				<div className="one column row">
					<div className="eight wide column center aligned">
						<form className="ui form" onSubmit={this.joinSession}>
							<div className="ui input field">
								<input
									type="text"
									name="session"
									placeholder="aBc3"
									value={this.state.session}
									onChange={this.handleSessionChange}
								/>
							</div>
							<button
								className="ui button"
								data-tooltip={this.state.invalidSessionMessage}
								type="submit">Join Session
						</button>
						</form>
					</div>
				</div>

				{/* new game button */}
				<div className="one column row">
					<div className="eight wide column center aligned">
						<form className="ui form" onSubmit={this.createSession}>
							<button className="ui button" type="submit">New Game</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Homepage;