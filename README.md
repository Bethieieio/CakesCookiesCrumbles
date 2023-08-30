# Cakes, Cookies and Crumbles

Cakes, Cookies and Crumbles is a site where users can view and upload upload their recipes, specifically their cakes, cookies and crumbles. They can also view other people recipes, favouriting them if they wish to bake the recipe for themselves and can rate the recipe out of 5 stars. Users can filter recipes by category, favourites and their own recipes. The user can chose to edit and delete their own recipes if they wish. Overall, the site is a place for people to share their own tasty treats with other baking enthusiasts.

You can view Cakes, Cookies and Crumbles here (create your own recipe if you want!) > [Cakes, Cookies and Crumbles](LINK TO FRONT END DEPLOYMENT)

- If you want to see the API for the site, it's [HERE.](LINK TO API)
- You want to see the docs for the backend? [I GOT YOU BOO](LINK-TO-SWAGGER)
- If you want to read more, here is the backend README if you so wish. [WHAM](backend read me)

INSERT AM I RESPONSIVE HERE

## Contents

- [**Objective**](#objective)
- [**User Experience**](#user-experience) 
  - [Project Goals](#project-goals) 
  - [Components](#components) 
  - [Design Choices](#design-choices) 
  - [Project Management](#project-management) 
-[**Permissions**](#permissions)  
   -[Logged Out User](#logged-out-user) 
   -[Logged In User](#logged-in-user) 
-[**Features**](#features) 
   -[Current Features](#current-features) 
   -[Future Features](future-features)

## Objective

Cakes, Cookies and Crumbles is my fifth and final project with [Code Institute](https://codeinstitute.net/).
I have to demonstrate my understanding of ReactJS front end and Django Rest framework for the backend and having to bare in mind a the focus on design, making sure the viewer has a positive user experience.
Using the Agile methodology is key to help break things own and to keep the project as organised as possible.
In Code Code Institutes words:

> In this project, you will design and build a content-sharing web application with React and an API (Django Rest Framework) Back-End. This will allow your users to browse and comment/ like each other's content as well as add, edit and delete their own.

## User Experience

### Project Goals

1. Give the ability for users to share their tasty snacks.
2. Have the site be responsive for every screen sizes.
3. Create a layout that is bright and related to the subject in hand for that positive user experience.
4. Have a filter system to allow users to find their baking category of choice.
5. The ability for users to favourite a recipe they love / wish to try.
6. User needs to be able to filter their favourite recipes to come back to them at a late date.
7. The user should be able to unfavourite a recipe too.
8. Create the ability of user feedback by creating a 5 star rating system.
9. The user needs to be able to create their own recipe easy by having to put ingredients, intructions and a desctiption in different fields. Including a way to add an image.
10. The user needs to be able to edit and delete a recipe of choice with ease.
11. To filter their own recipe from all the other users recipes.
12. Users should only be able create, favourite and rate a recipe if they have an account.

### User Stories

User Stories
- As an authenticated user:
- I would like to be able to login 
- I would like to be able to post a recipe
- I would like to be able to upload a picture of my recipe.
- I would like to be able to edit the recipe if need be.
- I  would like to be able to delete the recipe if I want to.
- I would like to be able to filter the recipes so I can look at categories of my choice. 
- I would like to view all my recipes on a profile page
- I would like to be able to write a review on other user’s  recipes.
- I would like to be able to rate other user’s recipes.
- I would like to filter the recipes so I  can only see my recipes 
- I would like to favorite recipes.
- I would like to rate other people’s recipes.
- As an unauthenticated user
- I would like to view recipes of users who have uploaded their recipes 
- As a user, I would like to be able to sign up for the site.


[Back to top](#contents)

### Design Prototype (Wireframes)

For the project, I used [Adobe XD](https://helpx.adobe.com/uk/support/xd.html) to create the wireframes. Wireframes help give me an idea of what I want to see the site layout. before I start writing code and to help me think about database structure. One of the main reasons I used XD was because it is a free site. I did not fancy paying for [Balsamiq](https://balsamiq.com/wireframes/) the wireframe site I used last time. I used the 30 day trial in my previous project.
Some of the layout has changed since creating the wireframes eg: new page for sign up and log in.
![Homepage](assets/readme-images/wireframe1.png)
![Create a Recipe](assets/readme-images/wireframe2.png)
![Edit a recipe](assets/readme-images/wireframe3.png)
![Single Recipe](assets/readme-images/wireframe4.png)
![Rating, logout and Delete recipe modal](assets/readme-images/wireframe5.png)
[Back to top](#contents)

### Components

ReactJS makes it easy to reuse components throughout the application.
This is a flowchart to see the parent/child relationships of each component.
![Component Flowchart](assets/readme-images/component-flochart.png)

### Design Choices

#### Colour Scheme

I chose four colours with the help of [Coolors](https://coolors.co/ffffcc-ffade5-ffffff-425061).
The pink and yellow colours are bright and happy colours that I associate with cakes and baking. They both show up on eachother making the words standout and easy for the user to read. I also chose white and a grey to help break up the yellow and pink at times also making the website look professional.<br>
![Yellow on Pink](assets/readme-images/yellow-on-pink.png)
![Pink on Yellow](assets/readme-images/pink-on-yellow.png)
![Colour Scheme](assets/readme-images/coolors.png)

#### Typeography

I have two fonts for the site. One for titles and one for content.<br>
I chose Josefin Slab as its thin, delicate but still easy to read. It gives a nice contrast to the title font.
![Josefin Slab THIN 100](assets/readme-images/font1.png)<br>
I chose Asap for the title for its round and bold apparence. It is easy to read and stands out without overpowering the smaller font.
![Asap BOLD 700](assets/readme-images/font2.png)<br>

### Project Management

I use Github Projects to create a kanban board to help plan and organise my project. <br>
https://github.com/users/Bethieieio/projects/3

[Back to top](#contents)

## Permissions

### Logged Out User

If the user does not have an account or they are logged out, they can see the following:

- View the homepage and all the recipe headers, account holders have created.
- See the average rating each recipe has on the homepage.
- Go into a single recipe and view all the instructions.
- Sign up page.
- Log in Page.

### Logged In User

A logged in user can view all of the content a logged out user can see but also can see / do the following.

- Favourite recipes
- Use of the favourites filter
- Create their own recipes
- Use of the 'Your Recipes' filter
- Edit their recipe
- Delete their recipe
- Rate recipes

## Features

### Current Features

#### Log In page
The user log in page allows users that have an account to create their own recipe and other features.
The user needs to input their username and password. An error appears if the user inputs the incorrect details.
![image](assets/readme-images/log-in.png)
![image](assets/readme-images/blank-login.png)
![image](assets/readme-images/incorrect-login.png)

#### Sign up
Before the user can sign in, they need to create an account.
An unique username needs to be chose, followed by the users chosen password and it's confirmation.
The username is unable to create an account of the same name as someone else or have a password that is too commom ie: password.
![image](assets/readme-images/signup-screen.png)
![image](assets/readme-images/signup-login-exists.png)
![image](assets/readme-images/signup-password-common.png)

#### Navigation Bar
For this site, the navigation bar is very simple.
For users that are not logged in, they will see links to the Sign UP and Login pages.
If the users are logged in, they will see "Create a Recipe" and Sign Out links. <br>
![image](assets/readme-images/logged-in-navbar.png) <br>
![image](assets/readme-images/logged-out-navbar.png)<br>


#### Recipes on Home Page
On the homepage, it is full of the recipes headers. They contain the name of the recipe, the description and the image. It also contains the tag, the rating score and the favourite toggle button (if the user is logged in). If the user is logged in, on a recipe they have written, displays a pencil button that allows the user to edit the recipe if they wish. If the user is not logged in or they did not write the recipe, they will not see this button.
![image](assets/readme-images/recipe-header.png)

#### Single Recipe
Once the user has clicked on the recipe, it takes them to it's main recipe page.
The title is at the top. With the favourite buttons and ratings button on either side.
In the main section, the image is on the top right, next to it are the recipe's ingredients. 
Below is the recipes description and the instructions.
![image](assets/readme-images/main-recipe.png)

fave
rating
average rating
edit recipe
delete recipe

#### Future Features

If I get the chance again, I would like to add the following features to Cakes, Cookies and Crumbles.

- The ablity to comment on other peoples recipes. (Logged in User).
- To be able to view all of another users recipes on the same page.
- To filter recipes on the homepage by number of favourites and rating.
- To have more images on one recipe.
- To have different categories such as vegan, gluten free, nut free etc and to have these as filters too.

## Technologies Used

### Languages

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) the massive bulk of the frontend of this website is written in Javascript. It is a single page React Application.
  [HTML5](https://html.com/html5/) to layout and structure the websites content.
- [CSS][https://www.w3schools.com/css/] to help present the website to be cute and pretty yay

### Libraries and Frameworks

- [React](https://react.dev/) Javascript library for creating single page applications
- [Bootstrap](https://getbootstrap.com/) a CSS framework to use for quicker and easier way to make sites responive for any size screened device.
- [Font Awesome](https://fontawesome.com/) icons toolkit I used for the favourite hearts, rating stars and edit pencils.
- [Google Fonts](https://fonts.google.com/) I got the font famillies I used from Google Fonts, a massive open source font library.

### Packages and Dependences

- [Axios](https://axios-http.com/) HTTP client for making network requests.
- [React Bootstrap](https://react-bootstrap.github.io/) React components for using Bootstrap with React.
- [React Dom](https://legacy.reactjs.org/docs/react-dom.html) a react librbary for running react in the webpage
- React Router Dom enables routing and in app navigation.

### Other Tools
