---
title: Implement testing in Golang
date: 2021-03-23T13:41:42.891Z
description: In this article I want to show how easily testing our code can be,
  it is not an effort, specially with the testing standard package incorporated
  in Go.
tags:
  - golang
  - testing
  - algorithms
  - dev
---

Hello dear readers, being a Junior to Mid Developer myself I've been of course faced to this weird "fear" of testing my code. Maybe it isn't fear, maybe we just do not talk much about it.

But either way I've been recently learning to program in Golang and I want it to do it seriously, in the right way. That's why this time I did not skip the tests subject.

In this article I want to show how easily testing our code can be, it is not an effort, specially with the testing standard package incorporated in Go.

As an example I am going to implement and test a method that checks if a phrase is a [heterogram](<https://en.wikipedia.org/wiki/Heterogram_(literature)>) or not.

An **heterogram** is basically a word that doesn't contain a repeating letter. However it can contain multiple spaces or symbols like hyphens (-).

## Let's get into it! Writing our first test

I've started by creating a Golang app using go modules,`go mod init my app`. Then i've created a package heterogram containing an`heterogram.go`with an IsHeterogram() method and also I've created an`heterogram_test.go`file for our testing functions. Finally a **main.go** file where I could possibly import my heterogram method to run it.

![](https://miro.medium.com/max/1119/1*lnZaTY4ODnSzSSEUktAaPA.png)

In our `heterogram_test.go`file let's import the golang testing package and create a function TestIsHeterogram, passing in parameter a pointer to the struct T of that package to manage test state and support formatted test logs. We're going to define an input that is the string we want to check and also what we excepect of it.

For example, the string (input) toto is expected to return false because the "o" letter is present _2 times_.

So if IsHeterogram("toto") returns **false** the test passes and if it returns **true** the tests fails.

![](https://miro.medium.com/max/1198/1*mDGAoDqHL9VqKkwlkGqQ5g.png)

Now to start using this very simple test we need to actually start implementing our heterogram method.

## Implementing Heterogram algorithm

As you may have guessed our method is going to receive a string in parameter, we then are going to to loop trough that string and check each character. We are using the **range** keyword in our loop that returns a [rune](https://yourbasic.org/golang/rune/#:~:text=The%20rune%20type%20is%20an,and%20a%20few%20other%20characters.) , that is basically a superset of the ASCII table that can handle more characters. We are going to append each character (runes) to a slice named exists to store the existing letters.

![](https://miro.medium.com/max/823/1*hNxT7tl41QHA8eN_0zTvxA.png)

Now we need to check if the following character **(rune)** of our loop is present in our slice exists, if it is then we return false. For that we are going to write another helper function that we are going to call simply contains(). This method is going to loop trough a slice of runes and check if a rune is present or not.

![](https://miro.medium.com/max/823/1*Vm_3Aw1Jt8_aswvG8PuQaw.png)

Now back to IsHeterogram() we can check if a character of our string is already in the exists slice. If it does exists then we return **false**,if not at the end of our loop our method is going to return **true**.

![](https://miro.medium.com/max/828/1*3ponu9o9e11iXNJdqt9jWg.png)

Let's go back to our test function and run it. To run a test simply run `go test` inside of the heterogram package **(cd into that folder)** or use your IDE to run it.

![](https://miro.medium.com/max/1204/1*gL_9E6BIzeHOjvCnbUANkg.png)

We can see that our test has passed. Now let's try something, let's see if our method is well tested, change the input from "toto" to "Alpha" and run the test again. The world "Alpha" has two "a" so the test should pass right ? It should return false.

![](https://miro.medium.com/max/1204/1*qnispYQ1-88sII844FMsvg.png)

Well as we can see it has failed, the result for "Alpha" is true. And this shows that our method IsHeterogram is not finished, we didn't handled the uppercase letters. See how testing can improve our development ?\
Let's quickly fix our method by lowercase all of our inputs using the package **strings**.

![](https://miro.medium.com/max/689/1*jX3ul0c_XtUTQtutUZeNRQ.png)

![](https://miro.medium.com/max/1195/1*sOIoSpeCbNQnwTa4Jg8EXA.png)

Okay perfect, what if we wanted to test the case of **"six-year-old"** for example, remember that hyphens (-) are allowed. Well we could change again the input variable but let me show a better way to handle multiple test cases 🙂.

## Add multiple test cases

We have tested both **"toto"** and **"Alpha"** but now we also want to test double hyphens with **"six-year-old"** that should be true and maybe an empty string as well "" that should be true too. We are starting to have multiple cases to test and instead of changing manually let's create a `case_test.go` file in our **heterogram** package where we can store this test cases.

We are going to do this by defining a struct with 3 fields: description, input and expected. We are going to pass in as many cases as we want. Then all we have to do is go back to our TestHeterogram function and replace the previous code by a for loop that ranges our struct of cases.

![](https://miro.medium.com/max/971/1*Wv74D1bV1SW_qO2sPccvXw.png)

![](https://miro.medium.com/max/1090/1*1FuytrMeb6g_uiedFXT0YQ.png)

See how simple our test file looks now. We can run all our tests cases in a single time.

Before running `go test` one last time let's fix our IsHeterogram method to handle double hyphens. To do this before before checking if the exists slice contains our letter I am going to check if it is actually a letter by using the **unicode** package.

![](https://miro.medium.com/max/576/1*73LOtKYZDJvJ_X-qiMWVDg.png)

Okay now we are ready hit that `go test` one final time and all our tests should pass 🙂.

## Conclusion

Thank you all for reading this article, if you have any questions don't hesitate to contact me. For those of you who are more visual learners I've filmed a video about this you can go [check it out here](https://youtu.be/DaZDqRBIKCA) 😀.

See you soon ! 🙂
