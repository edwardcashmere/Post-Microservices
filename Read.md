# Microservices Posts App
## ** Note **
This is not a production grade application , its a simple posts microservices applications showcasing how a microservice actually works.

## Technologies Used
* Node
* Express
* axios
* Docker 
* React

# More Information
The services are not configured to work with a database instead a simple object was initialized to persist data as long as the services are running

## services
> Post

> Comments

>Event-Bus

>Query service

> Moderator Service

>Client

### Post Service
This service creates and stores posts , also it send a `POSTCREATED` event with post-data to the event-bus which emits to all the other services including itself which informs the ohter services that a post was created .Each service recieves the event and chooses how to handle the event.

### Comment service

This service creates and stores comments with associated PostIds' , also it send a `COMMENTCREATED` event with comment-data to the event-bus which emits to all the other services including itself which informs the ohter services that a comment was created .Each service recieves the event and chooses how to handle the event.

### Client service 

This service is user-facing. This where a post and comments are displayed, also the post or comment creation events start here.The resources for this service are built with `React.js`.

### Query Service

This handles the storage of both comments and posts,this is so as to make fetch requests from the UI for comments and posts independent of the posts and comments services . Incase the post or comments service goes down the already created posts and comments will still be displayed to the UI.

### Moderator Service

Moderator Service 
This service simply handles the moderation of comments it checks for the presence of certain words and renders the comments on whether their status are approved or rejected.


### Event-Bus

The event-bus receives events from all the other services and chooses where to emit the events with the corresponding data.


# How to Begin

Clone the repository then cd into each each service and run 

```bash
npm install

npm start

```

After starting all the services the client service will open a port on 3000

From here you can create posts and comments and see the functionaly.Run some tests by stopping some services and see if the other services are affected.When a service is stopped only that services fucntionality should be hampered , all the other services will work perfectly.

## To Come
The docker intergration will have kubernetes for conatiner orchestration and addiction of json-server for the DB and 



> Author Edwin Omondi

