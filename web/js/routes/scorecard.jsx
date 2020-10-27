import React, { Component } from "react";

class Scorecard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			session: this.props.match.params.session,
			gameStateUrl: "http://localhost:8080/api/gamestate",
			addPointsUrl: "http://localhost:8080/api/addpoints",
			addPlayerUrl: "http://localhost:8080/api/addplayer",
			currentPlayer: "",
			newPlayer: "",
			score: 0,
			scores: { "zach": 0 }
		}
		this.handleScoreChange = this.handleScoreChange.bind(this);
		this.handleCurrentPlayerChange = this.handleCurrentPlayerChange.bind(this);
		this.handleNewPlayerChange = this.handleNewPlayerChange.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.addPoints = this.addPoints.bind(this);
	}

	componentDidMount() {
		const { session } = this.props.match.params

		// fetch(`{gameStateUrl}?session=${session}`)
		//     .then((scores) => {
		//         this.setState(() => ({ scores }))
		//     })
	}

	handleScoreChange(event) {
		this.setState({score: event.target.value});
	}

	handleCurrentPlayerChange(event) {
		this.setState({currentPlayer: event.target.value});
	}

	handleNewPlayerChange(event) {
		this.setState({newPlayer: event.target.value});
	}

	addPlayer(event) {
		event.preventDefault();

		console.log("adding player...");

		fetch(`${this.state.addPlayerUrl}?session=${this.state.session}&player=${event.target.newplayer.value}`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: this.state.value }),
			},
		)
		.then((response) => {
			console.log(response);
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			const newScores = this.state.scores;
			newScores[this.state.newPlayer] = data;
			this.setState({scores: newScores});
		})
		.catch(error => console.log(error));

		this.setState({newPlayer: ""});
	}

	addPoints(event) {
		event.preventDefault();

		console.log("adding points...");

		// TODO: update data by posting to API and update value to display
		
		// const url = this.state.addPointsUrl + "?" + $.param({session: this.state.session, player: event.target.playerlist.value, amount: event.target.points.value})

		fetch(`${this.state.addPointsUrl}?session=${this.state.session}&player=${event.target.playerlist.value}&amount=${event.target.points.value}`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: this.state.value }),
			},
		)
		.then((response) => {
			console.log(response);
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			const newScores = this.state.scores;
			newScores[this.state.currentPlayer] = data;
			this.setState({scores: newScores});
		})
		.catch(error => console.log(error));
	}

	render() {
		const playerScores = Object.entries(this.state.scores).map(([key, value]) =>
			(
				<tr key={`${key} row`}>
					<td>{key}</td>
					<td>{value}</td>
				</tr>
			));

		const playerNames = Object.entries(this.state.scores).map(([key]) =>
			(
				<option key={`${key} option`} value={key}>{key}</option>
			));

		return (
			<div className="scorecard ui centered grid container">

				<div className="one column row">
					<div className="column center aligned">
						<h1>Scorecard</h1>
					</div>
				</div>

				{/* point adder */}
				<div className="one column row">
					<div className="ten wide column center aligned">
						<form className="ui form" onSubmit={this.addPoints}>
							<select className="ui selection dropdown four wide field" name="playerlist" id="playerlist" value={this.state.currentPlayer} onChange={this.handleCurrentPlayerChange}>
								<option hidden defaultValue="">Player</option>
								{playerNames}
							</select>

							<div className="ui input field">
								<input type="number" name="points" placeholder="Point Adjustment" value={this.state.score} onChange={this.handleScoreChange}/>
							</div>
							<div className="ui input field">
								<input type="submit" name="submit" value="Add Points" />
							</div>
						</form>
					</div>
				</div>

				{/* table */}
				<div className="one column row">
					<div className="eight wide column center aligned">
						<table className="ui table center aligned">
							<thead>
								<tr>
									<th className="four wide">Player</th>
									<th className="four wide">Score</th>
								</tr>
							</thead>
							<tbody>
								{playerScores}
							</tbody>
						</table>
					</div>
				</div>

				{/* player adder */}
				<div className="one column row">
					<div className="eight wide column center aligned">
						<form className="ui form" onSubmit={this.addPlayer}>
							<div className="ui input field">
								<input type="text" name="newplayer" placeholder="New Player" value={this.state.newPlayer} onChange={this.handleNewPlayerChange}/>
							</div>
							<button type="submit" className="ui icon button">
								<i className="plus icon"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Scorecard;