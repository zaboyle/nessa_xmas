package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// session -> user -> score
var sessions = map[string]map[string]int{}

func newGame(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling /api/newgame request...")
	session := randomString(4)
	sessions[session] = make(map[string]int)

	w.Header().Set("Content-Type", "application/json")
	// allow frontend to make a cross origin request (cors)
	// since this is running on a separate port
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	json.NewEncoder(w).Encode(session)
	fmt.Println(sessions)
}

func validSession(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling /api/validsession request...")

	session := r.URL.Query().Get("session")
	_, exists := sessions[session]

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	json.NewEncoder(w).Encode(exists)
}

func gameState(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling /api/gamestate request...")

	session := r.URL.Query().Get("session")
	state, exists := sessions[session]

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if !exists {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
	// return points for all players
	json.NewEncoder(w).Encode(state)
	fmt.Println(fmt.Sprintf("game state for session %v: %v", session, state))
}

func addPlayer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	// url parsing at
	// https://golangcode.com/get-a-url-parameter-from-a-request/
	if r.Method == http.MethodPost {
		fmt.Println("handling /api/addplayer POST request...")
		session := r.URL.Query().Get("session")
		player := r.URL.Query().Get("player")

		sessions[session][player] = 0
		// return points the new player has
		json.NewEncoder(w).Encode(0)
		// print new game state for debugging
		fmt.Println(fmt.Sprintf("new game state: %v", sessions[session]))
	} else if r.Method == http.MethodOptions {
		fmt.Println("handling /api/addplayer OPTIONS request...")
		w.WriteHeader(200)
	}
}

func addPoints(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == http.MethodPost {
		fmt.Println("handling /api/addpoints POST request...")
		session := r.URL.Query().Get("session")
		player := r.URL.Query().Get("player")
		amount, _ := strconv.Atoi(r.URL.Query().Get("amount"))

		sessions[session][player] += amount

		// return points the player now has
		json.NewEncoder(w).Encode(sessions[session][player])
		fmt.Println(fmt.Sprintf("new game state: %v", sessions[session]))
	} else if r.Method == http.MethodOptions {
		fmt.Println("handling /api/addpoints OPTIONS request...")
		w.WriteHeader(200)
	}
}
