package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("api running on port 8080...")

	http.HandleFunc("/api/newgame", newGame)
	http.HandleFunc("/api/validsession", validSession)
	http.HandleFunc("/api/gamestate", gameState)
	http.HandleFunc("/api/addplayer", addPlayer)
	http.HandleFunc("/api/addpoints", addPoints)
	http.ListenAndServe(":8080", nil)
}
