# README

## Scope

Mainstream job seeking applications like Indeed, LinkedIn and ZipRecruiter have a broad spectrum of jobs and job seekers. InTech aims to create an ecosystem of job-seeking software engineers and the businesses that need them.  InTech is specifically designed to cater to the skillsets of software engineers and to pair those skills and education levels to companies that need them.  This is a Software Engineer's delight!  

## Technologies Used

- MongoDB - NoSQL Database

- Mongoose - Object Data Modeling (ODM) library that manages the relationship between data.  The language to communicate with the database.

- Express - Backend web application framework to work with Node.JS

- Node.JS - Backend JavaScript runtime environment; allows for JavaScript code to be executed outside of the web browser.  

## Install these dependencies

Run npm init and git init. 

- Mongoose
- Express
- Nodemon
- Method Override
- EJS

## User Authentication and Authorization 

- express-session
- connect-mongo
- bcryptjs

In server.js file...
```
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")
```


## User Stories

### Who, What, Why

**Who are my users**: My target audience are software engineers (junior, associate or senior) that are looking for their next career opportunity.  The software is also targeted towards businesses that need to hire software engineers.  I have found that traditional job search websites have to include a wide demographic of users.  I want a service that is solely dedicated to Software Engineers and companies that are looking for them.  

**What do they want**:  Software engineer users want a job searching service where they can have a much more focused experience.  With this service they will be able to showcase their skills, projects, and desires.  On the other hand, companies that are using the service will be able to quickly and efficiently search for talent to exact specifications.

**Why**: I am a software engineer and I have found that the quality of mainstream job searching websites did not cater enough to my skill set and search queries.  For example, I’d like to check in what skills I have, how long I have had them, and then be able to search for companies that match exactly what I have to offer. The Software Engineering workforce stood at over 680,000 workers in the field in the United States.  

### 1.2 - Sign Up 

**Sign up**:  A new user can sign up to the website by entering pertinent information such as Full Name, Username, Picking a password, etc.  

### 1.3 - Profile Page

**Home Page** Once the user is signed in, they can immediately see jobs that are available.  On the left navigation bar, they are able to sort through the jobs by using selectors located in the left navigation bar (search feature is coming soon).  They are able to edit their profile as needed on this page.  

### 1.4 - Saved Jobs

**Home Page** The user can navigate to their "Saved Jobs" page and review the jobs they found interesting.  They also can delete those jobs from their profile.  

## Wireframes
<img src="https://share.balsamiq.com/c/i6Dph9ERL7TeovdpY1F95A.png">  
<img src="https://share.balsamiq.com/c/6gXvjJWP6NBxRbpheauiy9.png">
<img src="https://share.balsamiq.com/c/3KHtfTaRqN7uizXW3atz7v.png" >


## Entity Relational Diagrams (ERDs)

<img src="public/Screen Shot 2021-06-01 at 4.45.04 PM.png">

## Future features or unresolved problems

- API connection or officially create an API for businesses to advertise their job openings.  

- Full search functionality - slice and dice the data in all ways

