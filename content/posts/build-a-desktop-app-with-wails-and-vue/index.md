---
title: Build a desktop app with Wails & Vue
date: 2021-08-10T10:27:46.698Z
description: Learn how to build a desktop app with wails and vue.
tags:
  - go
  - wails
  - vue
---

![](banner.png "Wails Vue cover")

Hi everyone!
In this post I want to show how to quickly setup a desktop app using this amazing Go library [**Wails**](https://github.com/wailsapp/wails).

Basically, Wails allows to write desktop softwares using web technologies like Angular, React, Vue, Svelte..

## Installing Wails

Getting started with this library is quite easy, if you have all the [prerequesites]() you just need to run a _go get_ to install it in your local machine, if you need details this is going to add wails to the **pkg** directory of your **GOPATH**.

Go ahead and run the following command:

```
go get -u github.com/wailsapp/wails/cmd/wails
```

Once you've installed it you can run `wails init` to create a new wails application.

## How Wails work

Normally, the `wails init` command prompt you some questions like the name of your app but also the front end tecnhologie you want to use.

I've named my app `randomapp` and I am choosing _VueJS_ as a frontend framework.

![Screenshot 2021-08-06 at 17.43.31](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fl4261aqdieeu3099aqb.png)

This is going to generate all the files you need to get started.

What I found very cool is the way that _wails_ allows you to connect your backend logic to your frontend.

There is a wails function named `bind` that does all the work for you as you can see in their example when you open `main.go`.

![Screenshot 2021-08-10 at 19.08.26](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w54hnen856pofc1b5l5j.png)

Here `app.bind(basic)` is binding the `basic` function, and we can access it from the frontend.

Let's serve the application so I can show you how, for development the best way to serve this app is by open two terminal windows.

One placed in the root of the project to run the backend with the following command: `wails serve`

![Screenshot 2021-08-10 at 19.14.26](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ltxfzrrgblaif8oj2fo5.png)

And a second one placed in the frontend directory to run the frontend with the following command: `npm run serve`

![Screenshot 2021-08-10 at 19.15.24](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qv7ap4bx578023yd9jsb.png)

Now if we visit `http://localhost:8080`, we can see our application

![Screenshot 2021-08-10 at 19.18.45](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1yw8bcnpib6qpq3dvi57.png)

Good! Let's open a console in our browser to fetch that backend data by simply calling `backend.basic()`.

![Screenshot 2021-08-10 at 19.22.37](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rkmt6eos2xeei60bu77f.png)

We can see that we have access to our basic function binded from the backend that returns a "Hello, World!" string.

That's basically how things work with Wails. Now let's put all of this in practice and build a random application.

## Build the actual application

### Backend

Starting from the backend I'll get rid of the `basic` bind and function. Also I'll add a resizable option set to true in `wails.CreateApp` config so that our window later can be, well, resizable 🙂.

![Screenshot 2021-08-10 at 19.29.47](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eb440et0fqq0yhezfata.png)

So, instead of that basic function I'll create a very simple package that I will name `server` with a `server.go` file.

![Screenshot 2021-08-10 at 19.31.55](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hhg97q1w1zcs4i2hl2tn.png)

There I'll create a `struct` and a `New` function to return an instance of my `server` struct.

![Screenshot 2021-08-10 at 19.34.56](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/veleygt7v6rrcfzxjeik.png)

Next, I'll add to that a receiver function of Server that will just return some random data.

![Screenshot 2021-08-10 at 19.35.54](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cybm4yiavwxd2pp7a2vz.png)

Now the last step is to bind this using `app.Bind` in our `main.go` file.

![Screenshot 2021-08-10 at 19.39.02](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u8xe3ak6885nysja0zgj.png)

That's all we have to do for the backend data, we have kept it simple.

### Frontend

Let's jump now to our frontend directory that is a VueJs app with some components already in place, we have a Home and an About page.

I want to keep it simple so I'll delete the `components`, `store` and `views` folders. We only need the `App.vue`.

Make sure to remove the unnecessary html tags from `App.vue` and to remove the `use(store)` and `use(router)` from the create app mount function in the `main.js` file.

![Screenshot 2021-08-10 at 19.49.43](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c32nula6kax9muo7zza1.png)

![Screenshot 2021-08-10 at 19.45.11](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ijlu0xryzgcnbhro0hb9.png)

Okay, next let's add a button to our template with a click event binded to a `fetchData`.

![Screenshot 2021-08-10 at 19.54.15](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/el0vij5o7y0p7nocwcnb.png)

That `fetchData` method will call our backend as we did in the browser console previously. To the that we use `window.backend` and the we have access to our `Server` (because we bind it 💪🏻) and it's `GetRandomData()` function.

The result from `GetRandomData` will be assigned to a template variable and the work is done!

![Screenshot 2021-08-10 at 20.00.56](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4siqoiku68nd12l4c0ib.png)

Let's package of our code to test this out as a desktop app.

## Package the final application

The final step is to simply package the application, or build the desktop app ready to use.

For that we can stop the process running in our terminal windows for development and instead run the following command in the root of our project:

```
wails build -p
```

![Screenshot 2021-08-10 at 20.05.05](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ogts7l0e130sblx2sgh0.png)

Now if you go to the `build` directory of your project you have a `.app` or `.exe` depends on what operating system you are using.

![Screenshot 2021-08-10 at 20.05.46](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nsvm474sdl29ewk3nhpn.png)

You just have to open it and test our application!!

_Quick Note: _ I've changed the colour property in `main.go` to have a white background and then run `wails build -p` again 🙂

![Screenshot 2021-08-10 at 20.25.10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8c140iwncfh81rrf8cp9.png)

![Screenshot 2021-08-10 at 20.25.14](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q8ukdz221ii0ldus1ert.png)

Seems to work just fine 👍🏼

## Conclusion

That's it for this post, you now have an idea on how you can build your next desktop application using this _Golang_ framework.

Hope this will be helpful 😀

See you soon 👋🏼
