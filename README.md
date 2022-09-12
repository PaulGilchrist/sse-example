# Server Side Events Example (sse-example)

This is a simple example of Server Side Events (SSE) allowing clients to subscribe and receive push notification anytime anyone posts new data

Test with 3 terminal windows as follows:

This command will start a server listening on port 3000
```
node server.js
```

This command will start a client subscription (connection/listner) for any new server events
```
curl -H Accept:text/event-stream http://localhost:3000/topic
```

This command will POST (create) new JSON data on the server, that the server will then send to all subscribed clients
```
curl -X POST -H "Content-Type: application/json" -d '{"info": "Some string"}' -s http://localhost:3000/topic

curl -X POST -H "Content-Type: application/json" -d '{"info": "Another string"}' -s http://localhost:3000/topic
```

In a real horizontally scalable application, you would need to maintain the list of subscribed clients on a remote centralized cache server like Redis.