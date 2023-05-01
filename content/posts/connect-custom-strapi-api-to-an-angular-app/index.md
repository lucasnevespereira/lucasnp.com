---
title: Connect custom Strapi API to an Angular App
date: 2020-10-16T10:27:46.698Z
description: Learn how to connect your Angular app to a custom Strapi backend.
tags:
  - angular
  - strapi
author: Lucas Neves Pereira
---

![](https://miro.medium.com/max/2400/1*qL0ZN2R2wncqGxmLtK1F1g.png)

I recently decided to rebuild my portfolio with _Angular_. The problem is that I wanted to easily post and update my projects, I first thought about build an _NodeJS/Express API_ connected with MongoDB but this can be time consuming for me knowing that I have others side projects with a lot of work to do.

I decided to take a look into headless CMS, that's when I find out about[Strapi](https://medium.com/u/ace2e82e28e6?source=post_page-----e03ea487796e--------------------------------). A young french start-up that gives the exact solution I was looking for.

What is Strapi in a few words ?

- Flexible, open-source Headless CMS
- Freedom, for developers
- Allows to easily manage and distribute API's with custom data.

Now that you know what is Strapi let's see how to connect my front-end (Angular) with a Strapi API.\
_I'll use the example of a portfolio for this tutorial._

## Starting by building our Strapi API

First, let's change our current directory to an workspace directory and generate a Strapi project with the following command:\

`npx create-strapi-app project-api --quickstart`

![](https://miro.medium.com/max/2656/1*fVxUBXPqcsx-YDKRAoW32Q.png)

Generate a Strapi api

Once the project is setup, because you are using `--quickstart` strapi will run prompt you to your browser on <http://localhost:1337/admin/>

![](https://miro.medium.com/max/2684/1*htbIdoSG8GgHkSlBexy4rA.png)

Here you can register an admin user and login to the admin panel.

![](https://miro.medium.com/max/2708/1*XoLVIos1dQHgz-nXi4eN9g.png)

Welcome to Strapi Admin panel 🙂 . Now let's create a collection type for our project data.\
Go to _Content-Types Builder_ and click on _Create new collection type._

![](https://miro.medium.com/max/2208/1*sa4EPcg2xQUyskU2ck1K3g.png)

Enter a display name for your collection and then choose the fields you want and click _Save_. For my project fields I'll be choosing an _image _(media), a _title_(text) and a _description _(text).

![](https://miro.medium.com/max/3504/1*2JL6GqJN4w9WDeRKJmKaaw.png)

Okay, If we go back to our admin panel we'll see projects added to our collection types. Let's _Add a New project._

![](https://miro.medium.com/max/5652/1*T7RVyQzrJOTxJsbLCteQyw.png)

Here I have entered my data and I am now ready to save it.

![](https://miro.medium.com/max/4616/1*X7Zi5fQLoj2ItaxnfheneA.png)

At the moment I saved my project as a draft but I don't want to publish it yet. So don't need to click the blue button _Publish_ yet. Before that let's go to _Settings > Roles > Public._

We are not implementing authentification, so we need to define permissions on our API to unauthenticated users.

Here you can _select all_ by I just need to find my projects so I'll be choosing just _find._

![](https://miro.medium.com/max/5632/1*nuQSTfe8nFP5NFcuyvKKfA.png)

Okay, now that I have saved my permissions settings I can go back to my project that I have saved earlier and it that blue button _Publish._

![](https://miro.medium.com/max/4692/1*lRcfa9xrcPhCSIQJivxfQg.png)

Looking good, we can start to test if it is working. You can use a tool like POSTMAN to make a get request or you can just go to <http://localhost:1337/projects> to see if it's working.\

Let's test this out 🙂

![](https://miro.medium.com/max/3356/1*3tU84jVW68goUeZVZptJ8g.png)

Perfect, we can now build our front end and fetch our API.

2. Finishing by building our Angular App

---

We'll enter once again in our workspace directory and generate an angular project with the *Angular CLI. *If you don't have this tool you can install it on your machine by running:

`npm install -g @angular/cli`

Then do the following:

![](https://miro.medium.com/max/2272/1*3cI8_FTCqrAcWJtlardR_g.png)

Choose the default values (no routing) and (css) or just setup the project as you please. Project is generated we can now change to it's directory so `cd project-app` and run `ng serve -o` build the app and open it in the browser at [http://localhost:4200](http://localhost:4200/)

![](https://miro.medium.com/max/5644/1*V7cTktGIm0YrvA7qRq2aBw.png)

Next, open the project in your text editor, i'll be using Visual Studio Code, and remove all html content in *app.component.html *and create a simple header component. You can generate it once again with the angular cli `ng g c header` , by the way you have a terminal integrated in Visual Studio Code hit cmd + J to open it. Once your component is generated you can add it's selector (defined in header.component.ts) to your app.component.html

![](https://miro.medium.com/max/5756/1*6EyWbcop0OwH5DOLoh815A.png)

To have a bit of style in my app, I'll install semantic-ui-css and then import it to my global styles file. `npm i semantic-ui-css`

![](https://miro.medium.com/max/5748/1*NcDVxRUI2pwqLogrSoeLsw.png)

Added some sample html for my header component, using semantic-ui

![](https://miro.medium.com/max/2572/1*H4N0LSGiW-pI-kIN5VFuaw.png)

And I'll add some sample html to display my projects in my app component.

![](https://miro.medium.com/max/3220/1*CMrfnQhXFBYAIu4HkpJvbg.png)

![](https://miro.medium.com/max/5756/1*2BQroFCqaYZ-D9VGGHjExA.png)

Next step it is to replace our sample content with the projects data of our Strapi API, for that we will generate a service to fetch our data. Once again you can generate this using angular cli by running `ng g s data`

![](https://miro.medium.com/max/3576/1*1pzSZqMqOXlFbLMEPK_S-A.png)

We will use our data service to request the projects data of our Strapi API. To make such request we'll need to use the HttpClient incorporated in the Angular framework.\
Let's import the _HttpClientModule_ in our *app.module.ts *and then inject the HttpClient in our service class.

![](https://miro.medium.com/max/2924/1*a-t0pTIz9Ew2IZEMXqKEzQ.png)

![](https://miro.medium.com/max/2984/1*EG-oHnSMDivR9fPRyLnZzg.png)

Okay, we're ready to make a get to request to our API, for that let's import the API url we are fetching. I like to declare a variable in _environment.ts_ that you can find in the _environments_ folder in the *src *folder of your project. This is a good practice and it'll be useful later for deployment in production.\

So, _src > environments > environment.ts _, there I'll declaremy apiUrl and import it in my data service. There I'll be creating a method called *getAllProjects() *where I'll make that famous GET request thats gets my projects.

![](https://miro.medium.com/max/5268/1*5Psui_N3oN44NLNOCg3y6g.png)

![](https://miro.medium.com/max/5732/1*UcsVGoAlyJwZhdibw6TXsQ.png)

As you can see, my GET request here is waiting of type *any. *This is not a good practice in TypeScript and Angular. It's better if we define an interface to say exactly the type of data we are waiting for. I'll create an interface called *ProjectsResponse. *I'll use the data we've seen before to help me build that interface.

![](https://miro.medium.com/max/5732/1*pEkCSG5FTheqK5k1bsW1rA.png)

![](https://miro.medium.com/max/5732/1*g2YynEwtef_mBJIEQmXbUg.png)

Okay, this is better, I am saying that I'm waiting an array of _ProjectsResponse_ for my GET request.

We are almost there, now that we can make the request we want well to display the response we are getting, we have to import the data service in our app component and then subscribe to the response or the data we are getting from getAllProjects() method. Then that response will be assigned to an empty array defined in our component 🙂.

![](https://miro.medium.com/max/5732/1*uh3vZqxBQqgvHDb37AGDNg.png)

Cool, finally we can replace that sample data in our html template, we use _ngFor_ to iterate our projects array that has now the data from our Strapi API 😀

![](https://miro.medium.com/max/5688/1*0VxmHsGqSN5V23iidCDhXw.png)

Before showing how this is looking, there is something else I would like to show you. Right now the image.url of our project is being stored locally. So to access it we would actually need to fetch _http:localhost:1337/uploads/ourprojectimageurl_

I would like to change that and use an AWS service called S3. And for that strapi give us a provider to help us. Let me show how to set this up.

## Add AWS S3 Provider to Strapi API

Let's briefly open our project-api in our code editor.

> Tip: If you ever run into any problem or if you accidentally quit your terminal, you can run _`npm run build`_ to build up project again and _`npm run develop`_ to run the project again.

![](https://miro.medium.com/max/4096/1*NRepCr0QvIHGiUT7uf6UNg.png)

Okay, start by install the provider for AWS S3 by running the following command `npm i strapi-provider-upload-aws-s3`

![](https://miro.medium.com/max/2724/1*RtEwWyGXZV1QqE0hqLBJ0A.png)

Now in your project, you have an extensions folder that it's currently empty. There we are going to create a folder upload and another sub-folder config with a settings.json file inside of it. There you are going to write the following object with our provider options.

You can find this information in strapi documentation about upload\
<https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#using-a-provider>

![](https://miro.medium.com/max/5756/1*4fsCfdeE9na4dWZ4kt8oMg.png)

In this object we need to enter some access keys, region and name of our S3 Bucket. For that of course you need to create an AWS account if you don't have one an in you _AWS Management Console_ go to *S3 *to create a new bucket.

<https://s3.console.aws.amazon.com/s3>

![](https://miro.medium.com/max/5756/1*AydU03Mqo3GRgXXN8N87IA.png)

![](https://miro.medium.com/max/5756/1*A0jLb-3KBaoDw6P7CXawlA.png)

After enter the name and the region of your bucket hit create. Perfect! You have created your bucket. Now make sure you go to Authorizations and unchecked Block Access to Public.

![](https://miro.medium.com/max/5632/1*3HgDjNzXMn8_2D-EwGy-CQ.png)

![](https://miro.medium.com/max/5632/1*0NLWcTb_z17LoNcT0c4uwg.png)

To find the code for the region you have selected you can google AWS region code or search directly in AWS Documentation.

[

## Regions and Zones

### Amazon EC2 is hosted in multiple locations world-wide. These locations are composed of Regions, Availability Zones...

docs.aws.amazon.com

](https://docs.aws.amazon.com/en_en/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

Last important information we need it's our pair of keys: the access key and the secret key.

To find that information, go to you *account > credentials *and there you can generate a new pair of keys.

![](https://miro.medium.com/max/4492/1*gIFJCaBeoTrmkR0MGNPDNQ.png)

> I'll be changing mine after this tutorial, so these won't work :)

Let's go back to our settings.json and enter the informations.

![](https://miro.medium.com/max/5632/1*i0IAY1z4O7PNZuFtysUVfg.png)

Our provider it is all setup, you can stop your server if you want, hit a `npm run build` and `npm run develop` just to be sure.

Now in your admin panel in <http://localhost:1337/admin> login again and then re-upload your project image or create a new one as you want 🙂

If we go back to [http://localhost:133](http://localhost:1337/admin)7/projects we can see that we now have an S3 url instead of upload/ourimage in _image > url_

![](https://miro.medium.com/max/5756/1*Xc5A0lEIyw19LiiraEO6TA.png)

## Final Tests

Let's do our final tests, go back to the angular app, run it again if you need to and we can see our project being displayed. We made it !!! 😀

![](https://miro.medium.com/max/5756/1*00kidJv7yDEIAzBThW0ToA.png)

Just to be sure everything it's working let's go back to our Strapi Admin panel and add a new project.

![](https://miro.medium.com/max/5756/1*VXiJLCwr6inZaeVYCgJwjQ.png)

![](https://miro.medium.com/max/5756/1*Qu4TaoruSuP-ykxtqeteIg.png)

Looking good, now we have 2 projects. Time to see if everything worked fine in our front end (Angular).

![](https://miro.medium.com/max/5688/1*U3cuaX3w5pCyTjASSpwS6g.png)

Yes! It is working 🙂. We are officially done.

I hope you have liked this article, don't hesitate to contact me if you have any feedbacks or questions. I'll be glad to talk to you.

I've written another article to continue this one where I talk about how to deploy this to production.\
<https://pereiraneveslucas.medium.com/deploy-custom-strapi-api-connected-to-an-angular-app-7bc8c216e59b>

See you soon !!! 😀
