---
title: Deploy custom Strapi API connected to an Angular App
date: 2020-11-13T12:45:00.543Z
description: I wrote an article about how to build a custom API with Strapi and
  fetch it from an Angular app.
tags:
  - angular
  - strapi
author: Lucas Neves Pereira
---

![](https://miro.medium.com/max/2824/1*DCp9r-g0IqzObEvkSXdLnw.png)

Hello there, before starting this article I want to give you a bit of context. So, I wrote an article about how to build a custom API with Strapi and fetch it from an Angular app. If you haven't read it i'll link it right above 🙂.

[Connect custom Strapi API to an Angular App](https://pereiraneveslucas.medium.com/connect-custom-strapi-api-to-an-angular-app-e03ea487796e)

This article is a part 2 of that article as I am going to deploy the _API_ on Heroku and the _Angular app_ on Netlify.

# Starting by deploying Strapi API on Heroku

If you have read the previous article, you know that we generated our Strapi project with a `--quickstart` tag. By default this set the database of our project to *sqlite. *Well, i'll be changing this to mongodb, of course your are free to choose the database of your choice. Strapi as documentation about how to change this.\
<https://strapi.io/documentation/v3.x/guides/databases.html#databases>

⚠ ️Attention! For information, by changing our database we are overriding our data. So the projects content-type we've build before will stay there. But our actual project data will disappear. And we'll also be creating a new user.

Assuming you already have mongodb or the database you've choose installed on your machine let's head back to our `project-api` and launch it on out text editor. There we need to change the following file: `config/database.js`

![](https://miro.medium.com/max/1928/1*0TGVq-8PvgujbofVMuGE9Q.png)

![](https://miro.medium.com/max/2882/1*6HLDGTP7ZpLTFyGA-KD-_g.png)

Here we are going to change our connector to mongoose. Also for now I'll be removing the unused _env_ argument because i'll not be using environment variables but you can do it you are pushing this to a public repository for example, it is better 🙂 . You just have to create a `.env` file and paste your variables there.\
Finally in my settings i'll remove the *client *and _filename_ properties and change it to a single uri property and in my options change useNullasDefault to ssl.

![](https://miro.medium.com/max/5276/1*C7X6wYESeXL8V5XRne301w.png)

Before talking about what we are going to paste in uri, let's install the strapi package to use mongoose. Just have to run `npm i strapi-connector-mongoose`

[strapi-connector-mongoose](https://www.npmjs.com/package/strapi-connector-mongoose)

![](https://miro.medium.com/max/3696/1*6T7DSNRg5RxE2ExCU6-1Vg.png)

Okay, now in our uri we need to paste the "link" to our database on mongodb atlas. For that you'll have to create a cluster. I already have one that'll be using. If you have no clue about how to create one I'll paste a link to the docs 🙂.\
<https://docs.atlas.mongodb.com/tutorial/create-new-cluster/>

Now in our cluster, hoping you've created a cluster with a project. We can connect our project to our mongodb database. Just go to _Connect > Connect your application > Copy the srv uri_.

![](https://miro.medium.com/max/5132/1*7ZS-vtHt5-EAq9r2mbMgkg.png)

![](https://miro.medium.com/max/2788/1*PdzwaP504ryRCha_ywEVBA.png)

![](https://miro.medium.com/max/2788/1*Aco4NMIkzn7V2SDVblF5ig.png)

Now back to our `database.js` we will be pasting that uri to our property and change the <username>, <password> and <dbname> tags to our actual username, password and dbname. For the dbname you can choose the name of your collection. For username and password if for any reason you don't recall it, you can go to _Database Access_ on MongoDB Atlas. There you can add a new user or change your actual user.

![](https://miro.medium.com/max/2928/1*cM1drgvb-F1RgAk8dbR0kg.png)

![](https://miro.medium.com/max/5276/1*bLSTw6PbFWmSpCjz_NjWoQ.png)

After adding your infos to the mongodb uri string, let's run `npm run develop` and create our new user.

![](https://miro.medium.com/max/5276/1*7v3sR-OpDdUeqO4AQ-n0BQ.png)

![](https://miro.medium.com/max/3276/1*45WHwb_Gx2m0BLDQ1ThaNg.png)

Perfect, now we see that we still have our projects content-type but we need to add them again. Let's do that and then it is finally time to deploy this.

![](https://miro.medium.com/max/4600/1*32j85odV_dXOMKd-IzjfXw.png)

![](https://miro.medium.com/max/5748/1*qJ86Djnc2dNy4Ffzx3Vh6A.png)

You also need to give public permissions so our front end can fetch the API with all our projects.

![](https://miro.medium.com/max/5732/1*TKaqpFnX6hICxUir4bX4Vg.png)

Alright now time to deploy our API. I'll be using Heroku. First of all init git on your projet by running `git init` on a new terminal window.

![](https://miro.medium.com/max/3348/1*cik650gb8-qC74BuZ5FFXQ.png)

Then if you already know heroku and have an account, run `heroku login` . If not, create an heroku account on <https://www.heroku.com/home> and then back on your terminal run `heroku login`

![](https://miro.medium.com/max/4232/1*nTR2dVPYk_6dUWVoCSKfpg.png)

After stopping our server on localhost:1337 and runned heroku login

Now you can use heroku dashboard to create an app or just use the heroku cli and run `heroku create` or `heroku create <app-name>` if you want to tag your app with a custom name.

![](https://miro.medium.com/max/3952/1*oXeqeigoAahb-RtIm90GZA.png)

The command `heroku create` added a remote repository. If you run `git remote -v` you can see where you are pushing your project.

Before pushing we need to add our files and commit them.

![](https://miro.medium.com/max/3608/1*h5oLjEQbKZ6SIOKegVDa5Q.png)

Now all we have to do is push our project to heroku and run `git push heroku master:main`

Information: _Following changes in the industry, Heroku has updated our default git branch name to _`*main*`_._

![](https://miro.medium.com/max/3608/1*VLdV0xfPjiYngHVf_JUd9g.png)

![](https://miro.medium.com/max/3608/1*JB0mDVmdADIO5Dcu1VQ7jQ.png)

Perfect 😀, my project is deployed on <https://project-test-medium.herokuapp.com/> now to test this just run `heroku open` and hopefully it will open your browser with a nice Strapi page hosted on heroku.

![](https://miro.medium.com/max/2424/1*4_YFw0-25Ri6k6GrLhgDNg.png)

![](https://miro.medium.com/max/3620/1*4fmx31UAM5zAjGEwrxkRsg.png)

Well done! Our Strapi API it's in production 👍🏼

# Finishing by deploying Angular App on Netlify

It is time to deploy our front end to Netlify. First create an account on <https://www.netlify.com/> if you don't have one.

Netlify works great with git, but I'm choosing to show to do a manual deploy just to show how simple it is with Netlify.

Let's head over to our angular app and open it in our text editor 🙂

![](https://miro.medium.com/max/1764/1*8voaQNFEu80smgbXUnNXJQ.png)

There open your `environment.prod.ts `file and add the apiUrl property with your heroku strapi api url

![](https://miro.medium.com/max/4124/1*4po0HYZNx5qPP0BFyV5txw.png)

Now let's build our app by running `ng build ----prod`in our terminal. This will generate a dist folter with our builded app inside it.

![](https://miro.medium.com/max/3520/1*KJ1-MgCGPH-1oiquKUKzCA.png)

Let's reveal our builded app in the dist folder in the finder.

![](https://miro.medium.com/max/1604/1*rAeqdR48NxHgyzh_WRK0Ow.png)

![](https://miro.medium.com/max/1604/1*f4SPVrHBN1z23hTRGjcNuw.png)

Keep this window around, because this is the folder we are going to upload in Netlify. Now back to the Netlify dashboard, once you are login, go to sites and there drag and drop the builded folder _(project-app in my case)._

![](https://miro.medium.com/max/2524/1*o1aRLRYw_K1jxmou0_Tnxw.png)

![](https://miro.medium.com/max/4732/1*E-ZQspQr4UdGnp5lq9OVuA.png)

Okay perfect my app is deployed, now if you want to change the domain name that it is given by default go to *Domain Settings > Options > Edit site name *and change it to whatever you want.

![](https://miro.medium.com/max/4948/1*GOtBEnleXVJ85n4BnsJ8dQ.png)

![](https://miro.medium.com/max/4948/1*WA0k1wxgO42sMmhthRe89g.png)

Perfect now my Angular app is deployed to Netlify and it is fetching from my heroku hosted Strapi API 😀

![](https://miro.medium.com/max/3952/1*SP3ydcuM67abj4HP5VOhug.png)

![](https://miro.medium.com/max/5680/1*Za_Zq6HY3UWIdQqO0j8NeA.png)

We are officially done.

I hope you have liked this article, don't hesitate to contact me if you have any feedbacks or questions. I'll be glad to talk to you.

See you soon !!! 😀
