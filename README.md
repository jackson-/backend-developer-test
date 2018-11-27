# Backend Developer Coding Challenge

## Demo API
https://floating-gorge-72290.herokuapp.com/

## Installation
`npm i` or `yarn`

## How to run
Run mongo in the background on another terminal window
`mongod`

Create a .env file on the top level and fill it with the variables below:
* CLIENT_ID - This is the client id from your Google Developer app. This is needed to make Google Oauth2 work
* CLIENT_SECRET - This is the secret to the client id from above
* GOOGLE_CALLBACK -This is the callback route for your Google Oauth2 request. This should be something like localhost:3000/auth/callback
* MONGODB_URI - This is the connection string for your MongoDB. It's used to connect mongoose
* PORT - This is the port your server will run on. This will default to 3000 if not set.
* SECRET_KEY - This is passphrase used to sign and verify encrypted JWT tokens. You can use anything but it's reccomended you use something secure like this: ^+G<Fepnr7DbL[$_

After filling out your env you can run the API with `yarn dev` or `npm run dev`

## Explanation
When envisioning the task laid out before me and thinking of a database schema, I pictured a online shooter game. Any online shooter game has multiple games in it like Team Deathmatch, Free-for-all, or Capture the Flag. The same way our app has Chess, Risk, and Settlers of Catan.
Online shooters can also add more game modes as time goes on the same way we can add board games.  

For this model to work we must have the idea of a Match model. Something that creates an instance of a game, holds all the players, and says who the host for that match is. Players can create matches and become the host to accept and deny join requests. Once the match is at full capacity it is blocked from accepting anymore.

### Endpoints
#### Auth
**/auth/google** - This endpoint must be traveled to using the browser. You will have to sign into your google account and give the app access to your email and profile.  

**/auth/callback** - This is where you will be sent to after authenticating with Google Oauth2. The authService helper function will sign a JWT token and send it back in the response for you to use in future queries to the API. You should see the token on the your browser screen after authenticating with Google.

**/auth/google** - This endpoint must be traveled to using the browser. You will have to sign into your google account and give the app access to your email and profile.

#### Users

**/users/update** - This endpoint is used to update any properties on a user. The input looks like this:  
```
{ user: { _id: String}, updates: {...} }
``` 
The *updates* object should have keys of the properties you want to change and the associated values you want to change it to.

**/users/listPlayers** - This endpoint is used to list players that are interested in the same games as you sorted by distance. The input looks like this:  
```
{ 
    user: { _id: String, location: {    coordinates: [Number, Number] } }, preferences: [String] 
}
```  
The *preferences* array should be an array of Game IDs. I used the "geoNear" aggregator to sort by distance.


**/users/addPreference** - This endpoint is used to add a game preference to a user. The input looks like this:  
```
{ userId: String, gameId: String }
``` 

#### Games

**/users/createGame** - This endpoint is used to add a new game to list of selectable board games. The input looks like this:  
```
{
    name: String,
    min_players: Number,
    max_players: Number,
}
``` 


**/users/createMatch** - This endpoint is used to create a new match from a game and set its host. The input looks like this:  
```
{
    game: String,
    host: String,
    players: [String]
}
```  
The *game* property should be a game ID and the *host* should be the creating user ID. The *players* array should only have one user ID in it, which is the host ID.


**/users/listMatches** - This endpoint is used to list all the open matches that are available to join. This requires no input. It is a simple GET request. 


**/users/sendRequest** - This endpoint is used to send a request to join a match as a user The input should look like this:  
```
{
    match: String,
    user: String,
}
```  
*match* is the associated match ID, *user* is the requesting user ID.


**/users/listRequests** - This endpoint is used to list all the requests for a specific match. The input looks like this:  
```
{ 
    match: String
}
```  
*match* is the associated match ID.


**/users/updateRequest** - This endpoint is used to accept or deny a request. The input looks like this:  
```
{
    answer: Boolean, 
    matchId: String, 
    requestId: String
}
```  
*matchId* is the associated match ID, *requestId* is the associated request ID. *answer* is `true` to accept and `false` to deny.


### P.S.
You may have noticed that I dont have a controllers folder. This is something I usally do. In more production level projects I break out my endpoint functions into controllers. 

Thank you for taking the time out of your busy schedule to look this over. I know this takes a lot out of the day. That being said, I really look forward to hearing back from yo!~

