# Table of Contents

1. [Project Name](#Project-Name)
2. [List of violations](#List-of-violations)
3. [Selected prototype](#Selected-prototype)
4. [Figma link](#Figma-link)
5. [Plan for the hi-fi prototype](#Plan-for-the-hi-fi-prototype)

# Project Name

__Gym Tonic__

by 

Marco Donnarumma, Federico Castriotta, Lisa Cangialosi, Luca Filippetti

Our focus area centered on individuals who held a gym membership for under six months (categorized
as beginners) and were aged between 18 and 30. Through multiple interviews, we gathered valuable
insights that encapsulated three deep user needs:
- “The user needs a way to learn proper exercise technique in order to avoid injuries”
- “Needs to learn how to schedule the workout plan for a specified amount of time (weeks, months)”
- “The user needs a way to feel rewarded after training session to find consistency over time.”

To address them, we brainstormed potential solutions. Our proposed approach involves interactive
multimedia content designed to demonstrate correct exercise techniques and highlight the involved
muscle groups. We believe this solution effectively targets the first user need within our defined domain,
aligning with the lack of experience among our target audience.

# List of violations

## --------------------- Smartphone violations ---------------------
In this document we listed all the violations that our Low-Fi Prototype received. Moreover, we added some violations found by students that tried our prototype but, eventually, decided to review other prototypes. We kept those violations in order to improve our application. These comments have no severity, they have "----" instead.

### Home Page

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| Levels pop up  | consistency and standards | Beginner's badge remains the same from level 0 to level 4, displaying 'lv 0', which might confuse users | __1__ |
| Exercises pop up after clicking on a dummy's muscle | help and documentaton | The user might assume that the + button is meant for accessing more information, given the message 'tap on an exercise for further details'—yet it's intended for adding an exercise to the daily training | __2__ |
| Logo | Visibility of system status | The logo seems clickable even if it's not | --- |




### Exercises section 

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| Search results page | recognition rather rather than recall | When the results are shown there's no indication to the muscle group | __3__ |
| Search results page | consistency and standards | When the results are shown there isn't the + button anymore | __3__ | 
| Search process | help users recognize, diagnose, and recover from errors | When a user searches for a non-existent exercise, the system doesn't handle it properly and returns an empty page | __3__  | 
| Specific muscle groups list | consistency and standards | When clicking on a muscle group, a dropdown menu appears, offering more specific muscle groups. Selecting one reveals an ordered list of exercises. Adding the same arrow indicators used for the specific muscle groups could enhance visibility, signaling that the exercises menu can be expanded to reveal a more detailed list | __1__ |


### Daily training 

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
|   Reset popup  |  consistency and standard | the options that appear are unclear: remove all is not consistent with the reset button, cancel could mean "cancel the daily training" | __2__ |
| Deleting from daily training process | error prevention | There isn't a confirmation pop-up when the user clicks the trash button | __3__ |
| Swipe exercises popup | error prevention | There's no confirmation popup when the user clicks the swipe button | __3__ | 
| Play button | consistency and standard | Accessing an exercise within the exercises section is achieved by tapping on the exercise name. On the other hand, in the daily training, the same action is performed by pressing the play button | __3__ | 
| List of exercise | Recognition rather than recall | There is no indication to which muscle group the exercises belong to even pressing on the specific exercise to see additional informations | __3__ |
| Daily training section | Flexibility and efficiency of use | It could be useful to have the possibility of saving the daily training to reuse it | __1__ |
| Daily training section | ----- | Clicking on the play button or tapping the exercise name leads the user to the same page | ---- | 


### Quiz section 

| Where          | Violation's name | Info | Severity | 
| -----          | -----            | ---- |  ------  | 
| After completing a quiz | User control and freedom | There isn't a way to review completed quizzes; users can only see how many of their answers were correct | __4__ |
| Levels pop up | Recognition rather than recall | There is no name linked to the highest level | __1__ |
| Info popup | Help and documentation | There isn't any indication provided regarding the number of questions users need to answer correctly to pass the quiz | __4__ | 
| After passing a quiz | Aesthetic and minimalist design | The badge awarded to the user might create confusion as it's associated with completing a specific number of quizzes and reaching a certain level. Consider replacing it with a simple message for clarity | __1__ | 
| Levels bar | Recognition rather than recall | There's no indication provided for the current user's level or the number of quizzes required to reach the next level. Instead, this information is available within the level pop-up on the home page | __2__ | 
| Informational pop up | Help and documentation | The statement "you can try a quiz any number of times" is inaccurate, as once a user passes the quiz, they are unable to retake it | __1__ | 
| Quiz page | ---- | There's no indication of the outcome if the user exits the quiz without clicking on the submit button | ---- | 
| Quiz page | ---- | It's unclear whether the user can select one or multiple answers for each question | ---- | 

## --------------------- Smartwatch violations ---------------------

### General

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| "Main Page" View | Non-heuristic issue | Upon opening the application, there is a lack of clarity regarding the user's location. The initial interface presents only a list of exercises without a clear title, making it challenging for users to discern their location and purpose. Using the "Plan" page as the starting point could enhance user orientation. | __2__ |
| "Main Page" View and "Quiz" View | Aesthetic and minimalist design | Exercise and quiz buttons lack apparent clickability. Unlike other buttons that clearly indicate clickability, the exercise and quiz buttons resemble plain text on a menu. Enhancing their visual cues would improve user interaction | __1__ |



### Muscle groups

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| "Muscle Groups" View | Visibility of system status | It is not possible to understand what happens to the application's status once that muscle group is added, including where and how it is added. | __3__ |
| "Muscle Groups" View | Visibility of system status | It is not possible to understand what happens to the application's status once that muscle group is added, including where and how it is added. | __3__ |
| "Specific Muscle Group" View | Recognition rather than recall | Adding an exercise is possible even after viewing the specific exercise. Therefore, inserting it beforehand is unnecessary and misleading compared to clicking on the exercise name to view it. | __2__ |
| "Specific exercise" View | Visibility of system status | Clicking the + the user does not have feedback on what happened but will only find the exercise on the "plan" page when he has to train. | __1__ |
| "Specific exercise" View | Consistency and standards | The generic "Play" button suggests video playback but initiates a countdown for the timer. A more fitting label like "START" would align better with user expectations. | __2__ |


### Play exercise section

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| “Exercise Countdown” View | User control and freedom | Adding an automatic countdown and starting the time count automatically restricts the user's freedom to begin according to their preferences. | __3__ |
| “Exercise in Progress” View | Visibility of system status | The user cannot understand what the increasing number refers to. Additionally, the running timer is not clearly indicated. | __2__ |
| “Exercise in Progress” View | Visibility of system status | The option to go back is available, but the exercise progress indicator is no longer visible. By changing the screen and continuing to train I have no feedback on the exercise and I can no longer keep track of the number of repetitions and time. | __2__ |
| “Exercise in Progress” View | User control and freedom | The absence of a pause button restricts user control, forcing them to either complete the exercise or return to the exercise sheet, resulting in potential loss of progress | __3__ |
| “Exercise Completed” View | Flexibility and efficiency of use | To return to the initial view after completing an exercise, the user must scroll back through the numerous navigated views, indicating the absence of a convenient shortcut.  | __2__ |
| “Exercise Completed” View | Flexibility and efficiency of use | After completing an exercise, accessing the statistics page requires restarting the same exercise Providing a direct path to review statistics would improve user control  | __2__ |


### Daily training

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| “Plan” View | User control and freedom | Clicking the "change" button randomly switches the exercise. The exercise replacement is random upon clicking the button and is not user-initiated. Additionally, there is no option to revert to the previous exercise after it has been changed. | __3__ |
| “Plan” View | Error prevention | The switch button activates without confirmation. Accidental clicks may result in the loss of an exercise without a confirmation prompt. Implementing a confirmation step would prevent such errors | __4__ |
| “Plan” View | Help and documentation | It's not clear what happens when clicking the "change" button. The term "change" could imply either a user-initiated choice or a random switch of the exercise upon clicking the "change" button. | __2__ |
| “Plan” View | User control and freedom + Error prevention | The user lacks the ability to remove an exercise added to their plan, for example, if it was included by mistake. | __2__ |
| “Plan” View | Match between system and the real world | The term "Plan" is too generic, failing to convey the specific content of the page. A more descriptive title like "MY TRAINING" would enhance clarity | __1__ |


### Quiz 

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| "Quiz" View | Help and documentation | The meaning and method to increase the level indicated by the text "Lv" are not clear | __2__ |
| "Quiz" View | Help and documentation | The term "Quiz" does not provide clarity on the specific muscle group to which the selected quiz corresponds. | __2__ |
| "Quiz" View | Help and documentation | The meaning of the text "60:00/80:00" is unclear, and it's uncertain whether it denotes remaining hours or some other information. | __2__ |
| "Quiz Selected" View | User control and freedom | There is no option to conclude a quiz before its expected completion time by returning to the view with all available quizzes. | __2__ |
| "Quiz Selected" View | Error prevention | By unintentionally answering a question, the quiz immediately moves on to the next one without asking the user for confirmation. I would help prevention for the user by giving the ability to change the answer of each quiz at any time by adding a "SEND" button to the
last question of the quiz. By doing this, only when the user is sure to send the answers does he click on the button. | __3__ |
| “Quiz” View | Match between system and the real world | Clicking on the selectable checkbox next to a quiz leads me to take a quiz, but I would expect to mark the quiz as completed, given the presence of a selectable checkbox as an input. | __2__ |
| “Quiz Completed” View | Match between system and the real world | With this arrow, the user expects to return to the view of the individual question in the quiz; however, the arrow takes them back to the screen with all selectable quizzes. | __3__ |
| “Quiz” View | Visibility of system status | There is no need to access and retake a quiz that has already been completed, unless there is a clear indication of the opportunity to improve one's previously achieved maximum score. | __2__ |
| “Quiz Completed” View | Consistency and standards | The arrow directly takes you back to the main quiz view, unlike the view with recorded times for individual exercises where the top-left arrow does not lead to the view with the selection of muscle groups. | __3__ |
| "Quiz" View | User control and freedom | Users lack the opportunity to learn from mistakes as there is no option to review incorrect answers or retake the quiz | __3__ |
| "Quiz" View | Error prevention | Clicking on the quiz initiates it without a confirmation prompt, leading to the possibility of unintentional quiz starts Incorporating a confirmation step would prevent such errors | __4__ |
| "Quiz" View | Consistency and standards | TIME in Page with timer and number of repetitions and in QUIZ page. The time is presented differently in the two contexts, causing confusion. Standardizing the time display format would enhance clarity | __2__ |
| "Quiz" View | Help and documentation |Including documentation at the top of the Quiz page would assist users in understanding criteria for unlocking quizzes and interpreting the significance of different levels | __3__ |

# Selected prototype

We opted to proceed with the __smartphone prototype__ based on its favorable evaluation results (less violations) and our team's consensus that it offered a more comprehensive and superior solution. No features were transferred from the smartwatch prototype to the smartphone prototype.

# Figma link

[Figma two screens](https://www.figma.com/file/qFg9S6Nuf8IrLyM70FPXmJ/Gym-Tonic?type=design&mode=design&t=ZncANgT9P4eXZMw7-1)

# Plan for the hi-fi prototype

## Home Page

| Where          | Violation's name | Info | Severity | How we plan to solve it |
| -----          | -----            | ---- |  ------  |  -------                |
| Levels pop up  | consistency and standards | Beginner's badge remains the same from level 0 to level 4, displaying 'lv 0', which might confuse users | 1 | We will change the icon for the badge representing the level from 0 to 4.    | 
| Exercises pop up after clicking on a dummy's muscle | help and documentaton | The user might assume that the + button is meant for accessing more information, given the message 'tap on an exercise for further details'—yet it's intended for adding an exercise to the daily training | 2 | "Tap on the name of one exercise for further details" --> new feedback message displayed in the "Muscle group" pop-up.         |
| Logo | Visibility of system status | The logo seems clickable even if it's not | --- |  No function is associated to the logo, so it is only visible but not clickable. In the high-fi prototype it will be clearer that the logo is not clickable thanks to aesthetic details.   |




## Exercises section 

| Where          | Violation's name | Info | Severity | How we plan to solve it |
| -----          | -----            | ---- |  ------  |  -------                |
| Search results page | recognition rather rather than recall | When the results are shown there's no indication to the muscle group | __3__ |   The muscle group related to a specific exercise will be displayed in the proper page where the user can find all the details about that exercise (video, tips, muscle group...).  |
| Search results page | consistency and standards | When the results are shown there isn't the + button anymore | __3__ | "+" button will be added to the pop-up showing the search results.    |
| Search process | help users recognize, diagnose, and recover from errors | When a user searches for a non-existent exercise, the system doesn't handle it properly and returns an empty page | __3__  | A proper message like "No results found" will be now displayed.    | 
| Specific muscle groups list | consistency and standards | When clicking on a muscle group, a dropdown menu appears, offering more specific muscle groups. Selecting one reveals an ordered list of exercises. Adding the same arrow indicators used for the specific muscle groups could enhance visibility, signaling that the exercises menu can be expanded to reveal a more detailed list | 1 |  We changed the Exercises menu according to anatomical terminology (Trunk, Upper Limbs, Lower Limbs). This menu should give the user a clear view of the muscle groups of the body, moreover the user can click on a specific muscle group to reach a page where all the exercises related to this specific muscle group are displayed.    |


## Daily training 

| Where          | Violation's name | Info | Severity | How we plan to solve it |
| -----          | -----            | ---- |  ------  |  -------                |
|   Reset popup  |  consistency and standard | the options that appear are unclear: remove all is not consistent with the reset button, cancel could mean "cancel the daily training" | 2 |  Changed button from "Reset" to "Remove all". In the pop-up message, changed button from "Remove all" to "Yes", and the other from "Cancel" to "No". |
| Deleting from daily training process | error prevention | There isn't a confirmation pop-up when the user clicks the trash button | __3__ | Clicking on the "trash" icon next to an exercise will show an "undo" button on the line of the exercise. The deletion action can be undone in 1-2 seconds if the user clicks on the "undo" button. If the user doesn't do anything, then the exercise will be removed permanently. We won't add other pop-ups in order to speed up the process for the users.   |
| Swipe exercises popup | error prevention | There's no confirmation popup when the user clicks the swipe button | __3__ |  The user can click again on the "change" exercise button in order to retrieve in no time the exercise the he/she changed due to an error. No additional pop-up will be displayed in order to let the user do fast operations.  |
| Play button | consistency and standard | Accessing an exercise within the exercises section is achieved by tapping on the exercise name. On the other hand, in the daily training, the same action is performed by pressing the play button | __3__ |  The user can access the chosen exercises in both ways: 1) Tapping on the name of the exercise 2) tapping on the "play" button.  |
| List of exercise | Recognition rather than recall | There is no indication to which muscle group the exercises belong to even pressing on the specific exercise to see additional informations | __3__ |  In the page of the specific exercise we are adding also the muscle group to which the exercise belongs to.  |
| Daily training section | Flexibility and efficiency of use | It could be useful to have the possibility of saving the daily training to reuse it | 1 | Useful functionality that we won't implent since it is not strictly linked to the three tasks we are willing to solve.  |
| Daily training section | ----- | Clicking on the play button or tapping the exercise name leads the user to the same page | ---- |  The user can access the chosen exercises in both ways: 1) Tapping on the name of the exercise 2) tapping on the "play" button. We think it is not a problem that the user has 2 ways to reach the same goal, it depends on the user's preferences.    |


## Quiz section 

| Where          | Violation's name | Info | Severity | How we plan to solve it |
| -----          | -----            | ---- |  ------  |  -------                |
| After completing a quiz | User control and freedom | There isn't a way to review completed quizzes; users can only see how many of their answers were correct | __4__ | Once the user submits his/her answers, he/she will view the list of questions and answers of that specific quiz, plus the correct and wrong answers. If the users tries to change page by any means, a pop-up message will be displayed informing the user that he/she won't be able to see the answers any more. However, the user can retry the quiz any number of times, even if he/she has already passed it.  |
| Levels pop up | Recognition rather than recall | There is no name linked to the highest level | 1 |   The *__title__* (= name) of the level will be displayed in the quiz section below the level bar. We won't add the title of the level in the help pop-up since the user can now view the title of the current level and he/she is incentivized to reach the final level to view its title. Moreover, the title of the final level can be read in the home page help pop-up. |
| Quizzes home page | Match between system and the real world | The word "number" is replaced with the symbol # which is used only in math/computer science | 2 |  We changed the message conveying the information about the number of performed exercises. Now we will display a message like: "Muscle Group: x exercises done". In this way, the user receives clearly the info about the number of already performed exercises. |
| Info popup | Help and documentation | There isn't any indication provided regarding the number of questions users need to answer correctly to pass the quiz | __4__ |  Inside the specific quiz page, the number of minimum correct answers needed to pass the quiz will be displayed.   |
| After passing a quiz | Aesthetic and minimalist design | The badge awarded to the user might create confusion as it's associated with completing a specific number of quizzes and reaching a certain level. Consider replacing it with a simple message for clarity | 1 | We will substitute the badge the user receives after passing a quiz with a simple "Passed" text string.  |
| Levels bar | Recognition rather than recall | There's no indication provided for the current user's level or the number of quizzes required to reach the next level. Instead, this information is available within the level pop-up on the home page | 2 | In the quiz page, the user can view his/her own actual level (level bar that increases accordingly to the actual level of the user) and also the title of his/her actual level. Moreover, in the same page, the help pop-up explains that in order to increase the user level, he/she must pass quizzes. We think that the user already receives the correct amount of feedback to understand his/her own level.  |
| Informational pop up | Help and documentation | The statement "you can try a quiz any number of times" is inaccurate, as once a user passes the quiz, they are unable to retake it | 1 |  According to the final recommendations that we received, we will let the user try an already passed quiz any number of times. The "passed" text will be displayed next to an already completed quiz, but the "Try now" button will always be visible so that the user can keep trying the quizzes.   |
| Quiz page | ---- | There's no indication of the outcome if the user exits the quiz without clicking on the submit button | ---- | New pop-up message:  "If you go back, all your changes will be lost. Do you want to go back?" --> "Yes","No"   |
| Quiz page | ---- | It's unclear whether the user can select one or multiple answers for each question | ---- |  We will use Radio buttons (mutually exclusive selection) instead of check boxes. Moreover, the user can autonomously try to select 2 answers per question and see what happens (only the last answer will be selected)   |