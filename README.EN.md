# social-network (vk-test)

**Вы также можете прочитать этот README на [русском](https://github.com/klekwedge/social-network-frontend/blob/main/README.md)**

## Table of contents

- [Deployment instructions](#deployment-instructions)
- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Deployment instructions

**To run the project, you need to have [npm](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) installed on your computer**

1. Make a clone of this repository ```git clone https://github.com/klekwedge/social-network-frontend.git```
2. Install all required npm packages with ```npm i```
3. Run the project with the command ```npm run dev```

## Overview

It is required to write an analogue of a social network with limited functionality.

#### Requirements

- Login page with the ability to register and log into your account
- User page with profile picture, brief description (age, city, university) and posts that he wrote. If you opened your page, there should be a field for writing a new post (it is possible to attach one photo to the post). If you opened another user's page, there should be an "Add to friends" or "Remove from friends" button with the corresponding functionality. It should be possible to follow the url to the user's page.
- (optional) People search page. The page should have an input for entering a name and a list of people found by name.
- A page with a feed, where the chronological list displays posts from all users whom you have added as friends. (A plus will be the implementation of an infinite scroll with loading as you scroll). Posts in the feed can be liked and they display the total number of likes (you can without details who liked, only the number)
- A page with a list of your friends, when you click on a user, we go to his page. It should also be possible to remove from friends directly from the list
- (optional) A page with messages, where all correspondence is displayed in a list. You can go into the correspondence and send a message, after which the other user will see this message in his place.

The design of the user interface is at the discretion, you can take the social network VKontakte as a standard, or analogues.

#### Technologies

Frontend and backend should communicate via rest api requests. The frontend must be written in React using typescript. There is no ban on using react libraries. In CSS layout, you need to show the ability to use flexbox and grid. The backend can be written in nodejs, or in any technology and language convenient for you. You can also choose any database.

#### Solution

The solution must be provided in the form of links to open github repositories. It should also be possible to use the application. To do this, the front-end must be placed on github pages (or similar), and the back-end must be placed on Google App Engine/Fly.io or another similar service with the possibility of free placement of a test application. The database can be hosted for free on mongodb.com or similar services if another DB. As a result, the frontend on github pages must communicate with the backend, which is hosted in a third-party service via the rest api. In this way, you can clearly see the work done. You can also place the application on your hosting. The main thing is to be able to use the social network.

In response, you need to add links to github repositories with the solution. As well as links where you can use the application.

### Screenshot

![Main screen](./preview/screenshot.png)

### Links

- [Link to Frontend Project](https://github.com/klekwedge/social-network-frontend)
- [Frontend deploy](https://klekwedge-social-network-frontend.vercel.app/)

- [Link to Backend Project](https://github.com/klekwedge/social-network-backend)
- [Backend deploy](https://social-network-backend-nbvt.onrender.com/posts)

## My process

### Built with

- React
- TypeScript
- Node.js
- Express.js
- Mongo DB
- SCSS
- Chakra UI

### What I learned

I got acquainted with the MERN stack: I learned how to write a backend using express, work with mongodb. Improved understanding of interaction between Frontend and Backend. I learned how to create controllers for the backend, handle errors, validate received requests, figured out how JWT tokens work.

## Author

- [Website](https://klekwedge-cv.vercel.app/)
- [Linkedin](https://www.linkedin.com/in/klekwedge/)
- [Facebook](https://www.facebook.com/klekwedge)

