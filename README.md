# Backend Developer Coding Challenge

Hi! welcome to Feeld. As part of the recruitment process we want to know how you think, code and structure your work. In order to do that, we're going to ask you to complete this coding challenge. 

## Some background

A lot of people like board games, but alas, board games require 3 or 4 people to play and be fun. And sometimes people are alone but still want to play a fun game. So we are going to create a way to get people to connect and find people interested in playing the same board games as them.

## What we expect

* Build a performant, clean and well structured solution;
* Commit early and often. We want to be able to check your progress;
* Feel free to address the problem creatively according to your programming tastes (there are always multiple ways to achieve the same goal) and try to use elegant solutions.
* Go the extra mile. The requirements below are just the bare minimum. Be creative and come up with a solution that will impress us. If you think our requirements are whack, or not appropriate, change them and explain why 

## The challenge

You are the architect in charge of creating the API that the clients will consume, and you have been given some (very lose) requirements from the product team:

* The app will support the following games (consider how we could add more?)
    * Chess (2 player)
    * Settlers of Catan (3 or 4 players) 
    * Risk (3 to 5 players)
* Users must be able to log in with some third party of your choice (i.e. Google, Twitter, Facebook) and register a player profile. This should include:
    * Name
    * Location (GPS coordinates for example)
    * A list of games they want to play
    * Age
    * Available to host a game
* Players should be able to set themselves as available to host a game.
* Players should be able to see a list of other players interested in the same game as them, sorted by distance.
* Players should be able to send a request to others to join their game.

### Your task:

1. Fork this repo.
2. Produce a fully functional API in Node.js and Mongodb that fulfils these requirements. You have one week.
3. Make the API public, deploy it to your service of choice (e.g. AWS, Heroku, Digital Ocean...).
4. Create a readme file explaining your technical choices, and if you have them, your ideas and suggestions.
5. Send us a PR!

GOOD LUCK!
