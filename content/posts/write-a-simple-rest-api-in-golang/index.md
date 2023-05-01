---
title: Write a Simple REST API in Golang
date: 2021-04-13T12:48:39.266Z
description: In this brief article I will explain how I write a  simple REST API
  using Golang.
tags:
  - go
  - restapi
---

![write golang api image](banner.png "write golang api image")

Hello there 😀

In this brief article I will explain how I write a **REST API** using **Golang** trying to follow some best practices.

The source code to follow along if needed is [here](https://github.com/lucasnevespereira/posts-rest-api).

# Let's do this 👍🏻

As an example we'll be creating a very simple Post API.

## Structure the project

Let's jump to our terminal and create a new directory for our project and then init a go module.

```
mkdir postapi
cd postapi
go mod init postapi
```

<b>Note: </b> Best practice for module naming is to use `<domain>/<nameOfApp>`

Now that we have this let's open our project in our favorite code editor and create a `main.go` file with a package main. This will be the entry point of our application.

Next, create a package **app** with a `app.go` file

![Capture d’écran 2021-04-17 à 19.01.50](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dpv5efmlpn37hhb19koz.png)

Inside of it we are going to create an **App struct** that will represent the structure of our app. There will be two fields on this struct, our app is going to have a **DB** and a **Router**.
The router will be a [gorilla/mux](https://github.com/gorilla/mux) router, so let's go ahead and and import it:

```
go get -u github.com/gorilla/mux
```

Let's add it to our struct
![Capture d’écran 2021-04-17 à 19.13.02](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i8n44k0eiffess0qw7kl.png)

Now we are gonna create a <b>New()</b> func that will be in charge of returning the actual application based on our struct.

![Capture d’écran 2021-04-17 à 19.15.15](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vzd53ctkxru8l07sbfc6.png)

Now in our `main.go` file we can call this function and create a new app.
![Capture d’écran 2021-04-17 à 19.19.39](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jjcsandt5z6ftfck3my7.png)

Okay, the entry point of the app is structured, let's continue with the routing.

## Routing

Let's use the **Router** of our **App** that we defined before to implement basic routing.
In our `app.go` file we are going to create an **InitRoutes** func that will be called inside of our **New()** func when we create the application. This function will be a receiver of our **App**. Actually a lot of our methods we will be receivers from our app from now. Since our Router fields in our struct **App** is of type [gorilla/mux](https://github.com/gorilla/mux) router we have access to it's methods.
![Capture d’écran 2021-04-17 à 19.26.38](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/35pw6fibi838duf996ih.png)

Let's very quickly replace the **nil** with a simple handler for our index route. For that create a `handlers.go` file in our package app. This is where we are going to store the handlers for our routes. I am going to create an **IndexHandler()** handler that will return an **http.HandlerFunc** printing a response "Welcome to Post API".
![Capture d’écran 2021-04-17 à 20.29.51](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8si7n2h7qcshwzz0z2sk.png)

Now let's call this handler in our route.
![Capture d’écran 2021-04-17 à 20.32.30](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/db260nodu9qccnqg6nlp.png)

Perfect, to test this out, we need to go back to the `main.go` file to serve the app on a port of our choice and the redirect it to our **app Router**. Also I've made a check function to print help with error handling.
![Capture d’écran 2021-04-17 à 20.37.45](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ri0h3g9jp4suxxzv2fz2.png)

Ok, now we can run our app with `go run main.go` and curl the endpoint to see if we get a response.

```
curl http://localhost:9000
```

![Capture d’écran 2021-04-17 à 21.51.19](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tyawg7ld5cuwy69c9pd3.png)

Cool, routing seems to be working!

## Database

It is time to setup our database, I have chosen to go with **PostgreSQL**, to avoid local setup I'll be running my database on a **Docker** container.

I'll be using the following command:

```
docker run --name postapidb --env POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

<b>Note: </b> To stop you just need to run `docker stop postapidb` and to remove it `docker rm postapidb`

Okay, now we have a database running let's jump to the code and create a new package **database** inside of our **app** package.

Let's create a `db.go` file and inside we are going to have an interface. I am going to call it `PostDB`, this interface it's like a contract (methods to implement) that we have to respect if we want our database to be a **PostDB** database. Let's start by saying that a **PostDB** should implement a **Open()** and a **Close** method that can return an error.

We are also going to have a **DB** structure like for our app that will have a single field db of type [sqlx DB](https://github.com/jmoiron/sqlx) that is like a superset of **database/sql** from the Go standard library. Let's run a go get for **sqlx** and **lib/pq** (postgres sql driver) and then implement this.

```
go get -u github.com/jmoiron/sqlx
```

```
go get -u github.com/lib/pq
```

![Capture d’écran 2021-04-17 à 21.13.57](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/31xyjyi2uctc8zvkarxy.png)

Now before writing the body of our **Open()** and **Close()** we can add a database fields to our App struct in `app.go` saying we are using a **PostDB** in this app 🙂

![Capture d’écran 2021-04-17 à 21.17.00](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rki3arnu80ur6f1wtr91.png)

Moving on, starting with our **Open** method let's open a new connection to our postgres database.

![Capture d’écran 2021-04-17 à 21.24.52](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zecha3q8ha31s8ha19ce.png)

To establish this connection, the second argument of the **sqlx.Open()** method is a postgres connection string. Let's build this string in a seperate file called `config.go` still in the **database** package.

![Capture d’écran 2021-04-17 à 21.27.58](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1ka5tankvtdv8y73zfo.png)
![Capture d’écran 2021-04-17 à 21.28.38](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tcvounayf7an21c0w9xh.png)

Another thing I want to do is create a SQL schema that will be run after the connection. This schema will just create a table posts in our db in case there is not one. Let's add this to a `schemas.go` file.

![Capture d’écran 2021-04-17 à 23.00.14](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/36q697vxqjz8r3ew1tck.png)

![Capture d’écran 2021-04-17 à 21.33.21](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5a8bis3wvgy0d2b37ibc.png)

Our **Close** method will be a lot simpler. We just need call the method Close from **sqlx**

![Capture d’écran 2021-04-17 à 21.35.26](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q4pdx4l29pttdzsewzs8.png)

Before writing some methods for our data, let's jump to the `main.go` file and init the connection to the database.

![Capture d’écran 2021-04-17 à 21.48.00](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/41ddpn562lk7ssqn0ct7.png)

Let's run `go run main.go`

![Capture d’écran 2021-04-17 à 21.50.25](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/da9xd0pj9816sv09zeqq.png)

The database is configured but is not quite finished because I want to implement some methods (like CreatePost and GetPosts) but for that we first need a **Post** Model.

## Models

Go ahead and create a new package **models** inside of the **app** package and create a `post.go` file. Inside of it we are going to have a **Post** struct with 4 fields.

![Capture d’écran 2021-04-17 à 22.02.41](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xjzu5byz4g84qsl6au6x.png)

Since this is a REST API we are later going to be mapping our responses to JSON and sometimes the fields from our database might not correspond to our json fields or maybe we want to have flexibility to add new fields or remove fields.
For that, let's already create a **JsonPost** struct to our file.

![Capture d’écran 2021-04-17 à 22.06.21](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fg7gekqhu019ie3tlua0.png)

Last thing I want to add to this file is going to be useful in a few seconds. When we add a post to our database the ID is auto incremented, meaning we do not have to pass the ID when making a request to create a new post. So let's create a **PostRequest** struct for that.

![Capture d’écran 2021-04-17 à 22.12.10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ezhr6vq5budo850w7zzd.png)

Back to our database in our `db.go` file I want to add 2 methods to my **PostDB** interface, **GetPosts** and **CreatePost**.

<b>Note: </b> I'll not be implementing all the REST verbs endpoints (trying to keep it short) just a simple GET and POST.

![Capture d’écran 2021-04-17 à 22.17.10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/irsd0apuo78dfnzoboeu.png)

In our `schemas.go` file I want to add a simple **insertPostSchema** for my **CreatePost** method.

![Capture d’écran 2021-04-17 à 22.58.42](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jwmr7t2u6k3m6qcpmo25.png)

Let's create a `methods.go` file and write our methods.

![Capture d’écran 2021-04-17 à 22.22.10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nwa5ua1bfzn7y0gd6kg2.png)

## Http Handlers

Now that we have all of our methods to interact with our database, let's write our http handlers as we did before for the **IndexHandler**. In our `handlers.go` file let's start with the **CreatePostHandler**.

What we are going to do is initialize an empty **PostRequest** struct, the parse the request body that the user entered to that struct. To parse or map the request body I am going to write a helper func named simply **parse** that I will put in a `helpers.go` file.

![Capture d’écran 2021-04-17 à 22.32.16](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rvj2x42fwugw2mtucjiz.png)

![Capture d’écran 2021-04-17 à 22.34.00](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o4i3cwy522duuede0xaq.png)

Once again, this is a **REST API** so it is good practice to send a http status. We are going to send a lot of responses with an http status, so I will write another helper func for this in the `helpers.go` file that sends a JSON response with a status.

![Capture d’écran 2021-04-17 à 22.38.57](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/33tyvig5uj1zjha660li.png)

![Capture d’écran 2021-04-17 à 22.39.33](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1m80tw737fytv4s1erd0.png)

By the way, remember we had a **JsonPost** struct in case we want that flexibility? Let's add a last helper function (`helpers.go`) just to map data to that struct.

![Capture d’écran 2021-04-17 à 22.45.26](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/co46g0inerk3xbwnguep.png)

Continuing with the **CreatePostHandler**, now that we have parsed the request body we need to use that data to create a new post and save it in our database.

![Capture d’écran 2021-04-17 à 22.56.09](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jooeqjim7hrrthxkfcbo.png)

Now to finish the **CreatePostHandler** we just have to create a new route in our func **initRoutes** from our `app.go` file and call our handler.

![Capture d’écran 2021-04-17 à 22.53.01](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mxd0qjsr3v20zvrjqjmh.png)

Run `go run main.go` again and let's test this on [Insomnia](https://insomnia.rest/download).

![Capture d’écran 2021-04-17 à 23.04.22](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yvhjvwr3z11f1mljchr9.png)

Seems to be working 👍🏻

Before moving on to tests let's implement **GetPostHandler** that should be simpler.

![Capture d’écran 2021-04-17 à 23.14.36](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z5zdtl4uphqh597hys0q.png)

![Capture d’écran 2021-04-17 à 23.17.28](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4szi96lewtnvrkf88ac8.png)

Relaunch the app
![Capture d’écran 2021-04-17 à 23.18.28](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/77rcfy4anh6efupjwtgr.png)

Test with insomnia
![Capture d’écran 2021-04-17 à 23.19.25](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bybknrhi2g43v68dza6p.png)

Perfect, this is working 🙂

## Tests

It is also very good practice to test our code, that's why we need to try to add test coverage to our app. For that you can create a **test** package and add a test file for what you want to test, for example `handler_test.go` or `db_test.go`.

![Capture d’écran 2021-04-17 à 23.23.39](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iaut5vm2hq4j7j5bc9ux.png)

I have actually made a [video](https://youtu.be/DaZDqRBIKCA) and wrote an [article](https://dev.to/lucasnevespereira/implementing-testing-in-golang-4mcp) about implementing tests in Golang so you can can check those out 🙂

## Conclusion

That's it! I am going to stop this article here, I know there is room for improvement but I wanted to keep this short and just talk about the foundation.

As always don't hesitate to give me feedback, the role of a developer today is to keep improving and that's what I want to do 🙂

Don't hesitate to check my _[Youtube Channel](https://www.youtube.com/channel/UC7JqfPrr4nHKvbwLAdk-MgA)_, you can also contact me on my [twitter account](https://twitter.com/lucaasnp_) and of course I will link the [github repository](https://github.com/lucasnevespereira/posts-rest-api) for this article.

See you soon! 👋🏻
