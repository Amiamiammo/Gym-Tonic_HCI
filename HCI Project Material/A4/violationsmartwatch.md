## Smartwatch violations

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
| “Plan” View | Match between system and the real world | The term "Plan" is too generic, failing to convey the specific content of the page. A
more descriptive title like "MY TRAINING" would enhance clarity | __1__ |


### Quiz 

| Where          | Violation's name | Info | Severity |
| -----          | -----            | ---- |  ------  |
| "Quiz" View | Help and documentation | The meaning and method to increase the level indicated by the text "Lv" are not clear | __2__ |
| "Quiz" View | Help and documentation | The term "Quiz" does not provide clarity on the specific muscle group to which the selected quiz corresponds. | __2__ |
| "Quiz" View | Help and documentation | The meaning of the text "60:00/80:00" is unclear, and it's uncertain whether it denotes remaining hours or some other information. | __2__ |
| "Quiz Selected" View | User control and freedom | There is no option to conclude a quiz before its expected completion time by returning to the view with all available quizzes. | __2__ |
| "Quiz Selected" View | Error prevention | By unintentionally answering a question, the quiz immediately moves on to the next one without asking the user for confirmation. I would help prevention for the user by giving the ability to change the answer of each quiz at any time by adding a "SEND" button to the last question of the quiz. By doing this, only when the user is sure to send the answers does he click on the button. | __3__ |
| “Quiz” View | Match between system and the real world | Clicking on the selectable checkbox next to a quiz leads me to take a quiz, but I would expect to mark the quiz as completed, given the presence of a selectable checkbox as an input. | __2__ |
| “Quiz Completed” View | Match between system and the real world | With this arrow, the user expects to return to the view of the individual question in the quiz; however, the arrow takes them back to the screen with all selectable quizzes. | __3__ |
| “Quiz” View | Visibility of system status | There is no need to access and retake a quiz that has already been completed, unless there is a clear indication of the opportunity to improve one's previously achieved maximum score. | __2__ |
| “Quiz Completed” View | Consistency and standards | The arrow directly takes you back to the main quiz view, unlike the view with recorded times for individual exercises where the top-left arrow does not lead to the view with the selection of muscle groups. | __3__ |
| "Quiz" View | User control and freedom | Users lack the opportunity to learn from mistakes as there is no option to review incorrect answers or retake the quiz | __3__ |
| "Quiz" View | Error prevention | Clicking on the quiz initiates it without a confirmation prompt, leading to the possibility of unintentional quiz starts Incorporating a confirmation step would prevent such errors | __4__ |
| "Quiz" View | Consistency and standards | TIME in Page with timer and number of repetitions and in QUIZ page. The time is presented differently in the two contexts, causing confusion. Standardizing the time display format would enhance clarity | __2__ |
| "Quiz" View | Help and documentation |Including documentation at the top of the Quiz page would assist users in understanding criteria for unlocking quizzes and interpreting the significance of different levels | __3__ |