package main

import "math/rand"

func randomString(n int) string {
	var charset = []byte("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]byte, n)
	for i := range s {
		s[i] = charset[rand.Intn(len(charset))]
	}
	return string(s)
}
