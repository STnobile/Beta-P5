# Beta-P5

## Description.
Beta-P5 is a social media platform dedicated to showcasing a unique private collection detailing wine making before the advent of electricity. The platform allows users to immerse themselves in the rich history, share their experiences in the form of images and stories, and interact with a community of like-minded enthusiasts. After a physical visit to the museum, users can share their stories and experiences with the community.

## Users Story
![Description](/src/styles/documentation/users1.png)
![Description](/src/styles/documentation/users.2.png)
![Description](/src/styles/documentation/user.3.png)


# Getting Started

## Feature 

To begin interacting with the platform, users need to sign up. Once registered, they can delve into the world of vintage wine making, book visits, post images with captions, and engage with other members through likes and comments.

- When the user is logged out, the following icons will show:
    - Home
    ![Description](/src/styles/documentation/home.png)
    - Sign In (the user in order to be able to post, comment, like, booking a visit, must sign in)
    ![Description](/src/styles/documentation/signin.png)
    - Sign Up
    ![Description](/src/styles/documentation/signuo.png)

- If the user is using a mobile or small screened device, a burger menu will show
![Description](/src/styles/documentation/burgermenu.png)

### NavBar.js
![Description](/src/styles/documentation/navbar.png)
- Navigation Bar. This allows the user to navigate consistently throughout the site. The Nav Bar will show two different sets of icons depending on whether the user is logged in or logged out. 
  - When the user is logged in, the following icons will show:
      - Add (add a post)
      - Home  (see all posts uploaded, with most recent appearing first)
      - Profile ( with the Avatar on his left side), the profile will have a dropdown menu with the following 
        link:
      ![Description](/src/styles/documentation/profile.drop.png)
       - Profile
       - Feed (see the posts from users that I follow)
       - Liked
       - Booking
       - Sign Out  
  

### Profile 
   - In here you can see the page dedicated to the user wit different 
   section:
  ![Description](/src/styles/documentation/profile.png)
     * Profile Name 
     * Number of posts
     * Number of Followers 
     * Number of Following 
     * Add post
  
  - Most followed profiles, Follow/Unfollow profiles - This shows a list of the 10 most followed profiles on the website, users can follow or unfollow   accounts.
   ![Description](/src/styles/documentation/m.popular.png)

   ![Description](/src/styles/documentation/profile.png)

   - on the Top right section there is a "ThreeDot" icon once clicked
    it will display some options :
      
      * Edit profile 
       in here the user is allowed to change his Avatar and add a small Bio if he likes.
        ![Description](/src/styles/documentation/editprofile.png)
      * Change username ( the user can change his first name, last name andd username )
        ![Description](/src/styles/documentation/userform.png)
      * Change password 
       ![Description](/src/styles/documentation/passform.png)

### Add post
  - Add (add post) - On this page, users can upload a post. There is frontend and backend validation to check the data provided, to see if the file is an image or not. If there is a file at all. If the required fields are filled. If there are any errors, there are Alert banners which highlight the field with the error.
  - ![add post](/src/styles/documentation/addpost.png)
  
  - Popular Profile - This display all the user with most followers. Located on the right side of the page.

  - ![add post](/src/styles/documentation/m.popular.png)

  - Edit Post - On this page, users can edit a post. The fields are automatically filled with the data the post already has. There is frontend and backend validation to check the data provided, to see if the file is an image or not. If there is a file at all. If the required fields are filled. If there are any errors, there are Alert banners which highlight the field with the error. User's can edit the post from anywhere on the platform where the user can see their own post.
  - ![add post](/src/styles/documentation/addpost.png)
  Also the user will have a third opinion to preview his post before it will be post it.
  - ![edit post ](/src/styles/documentation/createpost.png)
- Delete Post - This simple button deletes the post 
![Description](src/styles/documentation/deletepost.png)

- Comment - this feature is similar to the post's logic, the user can create, edit or delete a comment.
![Description](src/styles/documentation/comment.crud.png)

### Feed 

- This is where the users can see all the posts from the user's they follow. It has all the same features of the Discover Page, but is filtered by the profiles that you follow. Users can only see the ba

![Description](src/styles/documentation/feed.png)

###  Likes 
- This feature is a simple like button, so users can share their encouragement for posts they enjoy. Users must be logged in to user this function.
  ![Description](/src/styles/documentation/liked.png)
  

### Bookings

- Our Service - Is  what we stand for, a small introduction of what we believe and the message we wanna spread with our audience.
 ![Description](/src/styles/documentation/ourservice.png)

- Booking System: Allows users to book visits to the museum. Here's  
   how it works:
   - Log in to the system.
   - Choose a date (Sundays and Mondays are unavailable).
   
   - Select tour section:
     * Museo
     * Photo Gallery
     * Under Ground Wine Tanks
     * Private Garden 

   -  Select a time slot:
     *  10:00am - 11:30am
     *  12:00pm - 1:30pm
     *  4:00pm - 5:30pm
     * 6:00pm - 7:30pm

![Description](/src/styles/documentation/bookform.png)
- Specify the number of attendees (between 1 and 28). The maximum capacity for each time slot is 28 visitors.

![Description](/src/styles/documentation/succ.mess.png)
- Upon successful booking, users receive a confirmation message along  with a delete button, allowing them to cancel their reservation if necessary.

- delete message will be displayed once the user will decide to retrieve ve his request
![Description](/src/styles/documentation/delete.mess.png)


### Structure 
React is based on components. So within the display view, many components can make up the whole. See the [Features](#features) section for screenshots of the below components in action, along with the wire-frame for a simple sketch of how they look.
- Navigation Bar - This will feature throughout the entire site, staying consistent for the user.
- Most Followed Accounts - Most Followed Accounts section will appear on every page (except the add/edit post page), below the navbar (on mobile/small screen devices) or to the right of the post(s) (on larger screens/desktops).
- Post (when in Home, Feed and Profile pages) - Each post will appear displaying the Image, Title, Travel Type and Summary, along with the Like icon and count, Comment Icon and count and the Bookmark Icon to save the bookmark. It will not display the main content of the post. On the Feed and Discover pages, the page has an Infinite Scroll feature that means more posts can be loaded without pagination (only if there are more than 10 posts on a page).
- Post (once clicked into the post or clicking on the comment button) - Within the individual post page, the Post will now include the main content of the post, where the owner of the post can write more content for their post.
- Comments - The comments section only appears on the individual post page, where users can now interact with the post and share their views with the owner of the post publicly. This has Infinite Scroll, which loads older comments as you scroll down (only if there are more than 10 comments on a post).
- Edit Post Dropdown - This dropdown menu will display on each post where there are current logged in user is the owner of the post on screen.
- Edit Profile Dropdown - This dropdown menu allows the user to edit the profile details (username, password & bio) only if the current logged in user is the owner of the profile in view.
- Visiting - this will be a page where the user is able to create a booking choosing date, tour section, time slot, number of people.
- Visiting delete - the user will be able to create and delete his booking as his need.

## Wire-frame
![Description](/src/styles/documentation/wireframe.png)

## MSCW

 - MSCW for Beta-P5 Project

  Must Have
   1. User Registration and Login: Essential for personalizing user experience and enabling interaction features.
   2. Navigation Bar: Crucial for user navigation, with different icons for logged-in and logged-out states.
   3. Post Creation and Management: Users must be able to create, edit, and delete posts.
   4. Profile Management: Including editing profile details, changing username/password, and displaying user stats.
   5. Comment System: Allows users to interact with posts.
   6. Booking System: Core feature for booking visits to the museum, including date, time slot, and attendee selection.
   7. Responsive Design: Must be suitable for both desktop and mobile devices.

 Should Have
 1. Most Followed Profiles Section: Encourages community interaction and engagement.
 2. Feed Feature: Displays posts from followed users.
 3. Likes Feature: Allows users to like posts, increasing engagement.
 4. Validation Mechanisms: Frontend and backend validations for posts, comments, and bookings.
 5. Error and Warning Management: Address console warnings and errors for smooth user experience.

Could Have
 1. Gallery Section: Displaying images of different tour sections.
 2. Contact Form: For user inquiries and feedback.
 3. Chat Bot: To assist users with common queries.
 4. Edit Function for Bookings: Allows users to modify their existing bookings.

Won't Have (for now)
1. Advanced User Analytics: Not essential for initial deployment but could be considered in the future.
2. Integration with External Social Media Platforms: While useful for marketing, it's not critical for the initial phase.

# Future Features

- Add a Gallery with the images of the different tour sections.
- Add a Contact form.
- Add a chat bot to be able to answers some questions from the users.
- Create a Edit form for the booking.

# Validations
  All of my validation are effected by the lock-down error I will explain it later on my file.
  ![Description](/src/styles/documentation/lockdown.png)

  ![Description](/src/styles/documentation/validationBooking.png)
  ![Description](/src/styles/documentation/validationhome.png)
  ![Description](/src/styles/documentation/validation.liked.png)

## Technology 

- HTML (Hypertext Markup Language):
  - Structure and Content Delivery: HTML is the backbone of any webpage. It provides the essential structure and content. Without HTML, a web page cannot exist. It's used to define the basic elements of a webpage, such as headings, paragraphs, links, and images. HTML is fundamental for creating the skeleton of a webpage, which other technologies like CSS and JavaScript enhance.

- CSS (Cascading Style Sheets):
  - Styling and Presentation: CSS is used for styling the visual appearance of HTML elements. This includes layout, colors, fonts, and spacing. CSS is   what makes the web visually engaging and user-friendly. It allows developers to create attractive and consistent designs across different webpages and  devices. Without CSS, webpages would be plain and unstyled, negatively impacting user experience.


- React.js:

  - Interactive and Dynamic User Interfaces: React.js is a JavaScript library for building fast and interactive user interfaces. It excels in creating 
   large web applications where data changes over time without the need to reload the page. React’s component-based architecture makes it easy to manage and reuse code, which improves development efficiency and application performance. It's widely used for its responsiveness and the seamless user experience it provides, especially in single-page applications where a fluid and dynamic interface is crucial.

- [Cloudinary](www.cloudinary.com): For image storage
- [ElephantSQL](www.elephantsql.com): For database storage and management
- [Heroku](https://heroku.com): Heroku hosting platform.
- [MacPro]:to convert the images into png.
Each of these technologies brings its own strengths to web development, working together to create efficient, user-friendly, and aesthetically pleasing web applications.

### Acknowledgments
The project was inspired by the walkthrough projects from the Code Institute. It has been adapted to cater to the needs of the family museum.

## Front-end Credits 
The code for the frontend of this project was inspired by the fantastic walkthrough project "MOMENTS" conducted by the CI. Was the perfect grounding for my project to build.


# Errors

 all the website work fine.

 I would like to point that I am getting some warning on my console.

 I had a session with the mentor the 27/09 and he suggested me to ask help to the tutor so i have done that too.

 Once the tutor took a look he sent me some screenshot where it didn’t have the warning
 ![Description](/src/styles/documentation/lockdownerror.png)
 - In the screenshot above is the warning a get on my device.
 ![Description](/src/styles/documentation/lockweeor.png)
 - In this one is the console of the tutor once after have created an account and try to post or booked a visit.


# Reflection on Project Deployment Challenges and Learning

During the deployment of my recent project, I encountered several significant challenges, particularly in the back-end development. Despite diligent efforts and numerous sessions with my mentor and tutor, a perplexing error persisted, eluding resolution. This setback necessitated a thorough review of the entire project, a step that was both time-consuming and critical.

In the process of revisiting the walkthrough of the project, I was able to identify and rectify major bugs that were impeding progress. However, the back-end of the project continued to present numerous issues. The complexity of these problems was such that they demanded extensive time and attention, often at the cost of other aspects of the project, including the documentation.

One of the most significant challenges was the inability to complete the README file. A comprehensive README is crucial for any project as it serves as the first point of reference for anyone trying to understand or use the project. The lack of a complete README file was a clear indication of how the back-end issues had overshadowed other important elements of the project.

Through this experience, I learned several valuable lessons. Firstly, the importance of a systematic approach to problem-solving in software development became evident. It's not just about finding a solution but understanding the problem deeply. Secondly, effective communication with mentors and tutors is key. Reflecting on my interactions, I realize that asking more targeted questions and perhaps seeking diverse perspectives could have led to quicker resolutions.

Additionally, this experience underscored the importance of time management and prioritization in project development. Balancing the troubleshooting of technical issues with documentation and other project components is crucial. In hindsight, a different approach to prioritizing tasks might have yielded a more balanced outcome.

Overall, while the journey was fraught with challenges, the skills and insights I gained are invaluable. They have not only equipped me to handle similar situations in the future but have also honed my approach to project management and problem-solving in the field of software development.

# Acknowledgements 
As I reflect on my coding journey, I am filled with deep gratitude for the invaluable guidance and support I've received. A special thank you to Julia, my mentor. Her patience and insightful guidance were crucial in navigating the complexities of coding, especially during challenging moments.

To the dedicated tutors who have been with me every step of the way, your commitment and expertise have not only enriched my learning experience but also instilled in me the confidence to tackle difficult tasks. Your support has been a cornerstone of my growth as a developer.

While my project has come to fruition, I encountered significant hurdles, particularly with backend development. These challenges, while daunting, were instrumental in my learning process. They underscored the importance of perseverance and adaptability in the face of technical difficulties. I realize that while my project may not have reached the heights I envisioned initially, it is a testament to my journey and the learning curve I embraced.

This experience has been more than just about coding; it has been a journey of personal and professional growth. The lessons learned extend beyond the realms of technology, touching upon the essence of problem-solving, patience, and continuous learning.

Once again, I extend my heartfelt thanks to Julia, my mentor, and all the tutors who have been part of my journey. Your support and guidance have been pivotal in shaping my path as a developer.

I also wish to extend a profound thank you to the Code Institute for their exceptional curriculum and resources. The walkthrough projects, especially "Moments," have been an extraordinary part of my learning journey. These projects provided not just a practical application of coding concepts but also ignited creativity and innovation in my approach. "Moments," in particular, was a standout experience, offering hands-on learning that was both challenging and rewarding. The knowledge and skills I gained through these projects have been invaluable in my development as a coder. Thank you, Code Institute, for crafting such engaging and effective learning experiences.