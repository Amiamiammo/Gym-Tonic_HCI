BEGIN TRANSACTION;

DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "quiz";
DROP TABLE IF EXISTS "answers";
DROP TABLE IF EXISTS "dailytraining";
DROP TABLE IF EXISTS "exercises";
DROP TABLE IF EXISTS "questions";
DROP TABLE IF EXISTS "musclegroups";


CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER,
	"email" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"hash" TEXT NOT NULL,
	"salt" TEXT NOT NULL,
	"level" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "exercises" (
	"idex" INTEGER,
	"link_url" TEXT NOT NULL,
	"idmusclegroup" INTEGER NOT NULL,
	"exname" TEXT NOT NULL,
	"tips" TEXT NOT NULL,
	"toavoid" TEXT NOT NULL,
	"imagename" TEXT NOT NULL,
	PRIMARY KEY ("idex" AUTOINCREMENT),
	FOREIGN KEY ("idmusclegroup") REFERENCES "musclegroups" ("idmusclegroup")
);

CREATE TABLE IF NOT EXISTS "musclegroups" (
	"idmusclegroup" INTEGER,
	"musclegroup" TEXT NOT NULL,
	"numdone" INTEGER NOT NULL,
	"bodypart" TEXT NOT NULL,
	PRIMARY KEY ("idmusclegroup" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "quiz" (
	"idquiz" INTEGER,
	"idmusclegroup" INTEGER NOT NULL,
	"unlockat" INTEGER NOT NULL,
	"passed" BIT NOT NULL,
	"new" BIT NOT NULL,
	PRIMARY KEY ("idquiz" AUTOINCREMENT),
	FOREIGN KEY ("idmusclegroup") REFERENCES "musclegroups" ("idmusclegroup")
);

CREATE TABLE IF NOT EXISTS "questions" (
	"idquestion" INTEGER,
	"idquiz" INTEGER NOT NULL,
	"question" TEXT NOT NULL,
	PRIMARY KEY ("idquestion" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "answers" (
	"idanswer" INTEGER,
	"idquiz" INTEGER NOT NULL,
	"idquestion" INTEGER NOT NULL,
	"answer" TEXT NOT NULL,
	"correct" BIT NOT NULL,
	PRIMARY KEY ("idanswer" AUTOINCREMENT),
	FOREIGN KEY ("idquestion") REFERENCES "questions" ("idquestion")
);

CREATE TABLE IF NOT EXISTS "dailytraining" (
	"iddaily" INTEGER,
	"idex" INTEGER NOT NULL,
	"done" BIT NOT NULL,
	PRIMARY KEY ("iddaily" AUTOINCREMENT),
	FOREIGN KEY ("idex") REFERENCES "exercises" ("idex")
);

INSERT INTO "users" ("id", "email", "name", "hash", "salt", "level") VALUES
(1, "test1@test.com", "Luca Altobelli", "4ec3ba754ca87898784f0ae542929850b8e00d3b1d3b1270d7005c9c536cdc09fe4c9793b788ecf50ede2f12e73936929a1dac7b84a8c38bbbdd84a39ae3df43","abcgrflkjhbgtfvd", "3");


INSERT INTO "musclegroups" ("idmusclegroup", "musclegroup", "numdone", "bodypart") VALUES 
(1, 'Chest', 25, 'TRUNK'),
(2, 'Abdomen', 20, 'TRUNK'),
(3, 'Back', 18, 'TRUNK'),
(4, 'Shoulders', 20, 'UPPER LIMBS'),
(5, 'Biceps', 20, 'UPPER LIMBS'),
(6, 'Triceps', 20, 'UPPER LIMBS'),
(7, 'Forearms', 20, 'UPPER LIMBS'),
(8, 'Glutes', 20, 'LOWER LIMBS'),
(9, 'Quadriceps', 20, 'LOWER LIMBS'),
(10, 'Calves', 20, 'LOWER LIMBS');

INSERT INTO "quiz" ("idquiz", "idmusclegroup", "unlockat", "passed", "new") VALUES 
(1, 1, 20, 0, 0),
(2, 2, 20, 1, 0),
(3, 3, 20, 0, 1),
(4, 4, 20, 1, 0),
(5, 5, 20, 1, 0),
(6, 6, 20, 1, 0),
(7, 7, 20, 0, 0),
(8, 8, 20, 0, 0),
(9, 9, 20, 0, 0),
(10, 10, 20, 0, 0);

INSERT INTO "exercises" ("idex", "link_url", "idmusclegroup", "exname", "tips", "toavoid", "imagename") VALUES 
(1, "https://youtu.be/1ezRy5FcvwY?si=6S6Ux1in3dpOxe2X", 1, "Dumbbell Flyes", "Palms facing each other | Inhale as you lower the dumbbells, exhale as you lift them | Keep your shoulder blades against the bench throughout the entire exercise", "Don't fully extend your arms when lowering the dumbbells | Avoid overloading with excessive weight | Don't perform the repetitions too quickly", "DumbbellFlyes.jpg"),
(2, "https://youtu.be/mNaO2urs5b8?si=2W6dO_c2LnpwwilF", 1, "Barbell bench press", "Plant your feet firmly on the ground | Position your hands at shoulder width (or wider) | Touch the chest lightly and then return to the starting position | Inhale in the starting position (barbell over your chest), hold your breath as you bring the barbell to the chest, exhale as you raise it", "Avoid improperly positioning your hands | Avoid performing the repetitions too quickly | Avoid having the barbell path deviate from being perpendicular to the ground", "BarbellBenchPress.jpg"),
(3, "https://youtu.be/dt_e9soIado?si=StXul9xS-JK5ZZ51", 1, "Peck deck Machine Flyes", "Adjust the machine so that your arms are parallel to the floor | Ensure proper back support | Inhale in the starting position, exhale as you close your arms towards your chest", "Avoid performing the exercise too quickly | Don’t forget your breath ! It is fundamental to inhale and exhale at the proper time | Avoid using excessive weight", "PeckdeckMachineFlyes.jpg"),
(4, "https://youtu.be/woLWA3zdGes?si=6d30-jjOQPlzxKTQ", 1, "Push up", "Ensure you have a good starting plank position (arms extended - core engaged - shoulders, hips, and feet aligned) | Inhale and lower your chest towards the ground, exhale as you return to the starting position | Rest your knees on the ground if the exercise becomes too challenging", "Avoid arching your back | Avoid excessive strain and instead adapt the exercise to your abilities (resting knees on the ground) | Don’t forget to breathe correctly", "Pushup.jpg"),
(5, "https://youtu.be/auyE2hZGB9k?si=6aGHw_KayJcsI-SY", 9, "Dumbbell Lunges", "Starting position: Grab the dumbbells, keeping them extended along your sides, and stand with your feet shoulder-width apart and parallel | Execution: Alternating your feet, take a step forward, allowing the knee of your rear leg to lightly touch the ground, while the knee of your front leg should align with your hips | Inhale in the starting position, exhale as you lift yourself up", "Don’t keep your feet to close together | Do not lift the heel of the foot that is stepping forward | Avoid leaning your torso forward", "DumbbellLunges.jpg"),
(6, "https://youtu.be/zQIldyfxZ9o?si=BxtiI056sbXhyUum", 9, "Leg Press", "Starting position: Place your feet on the machine's support base so that they are aligned with your knees and slightly turned outward | Ensure that your back is well supported against the backrest | Inhale in the starting position, exhale as you extend your legs", "Never fully extend your legs | Avoid closing your knees inward | Pay attention while keeping your back well pressed against the backrest", "LegPress.jpg"),
(7, "https://youtu.be/clFOqRKeiCU?si=MneSibRkeCNhGcKq", 9, "Barbell Squat", "Starting position: Stand with your feet shoulder-width apart, slightly turned outward, and keep your torso upright (engaging your core). Position the barbell above the line of your shoulder blades | During the descent phase, your hips should go below knee level | Inhale in the starting position, exhale as you ascend", "Avoid arching your back | Never let your knees turn inward | Never lift your heels off the ground while performing the exercise", "BarbellSquat.jpg"),
(8, "https://youtu.be/FCR09EugF7M?si=TwcMOI97mJqqM2YO", 9, "Leg Extension", "Adjust the machine so that your knees, in the starting position, form a 90-degree angle | Starting position: Ensure your back is well supported against the backrest, and your glutes are firmly pressed against the seat | Inhale in the starting position, exhale as you extend your leg", "Avoid lifting your glutes off the seat | Do not perform the exercise too quickly | During the return phase to the starting position, don’t let the weight go down in an uncontrolled manner", "LegExtension.jpg"),
(9, "https://youtu.be/_g05fGTPZBo?si=VctdtwBl_XOUEzZv", 3, "Barbell Bent Over Row", "Starting position: forward flexed torso, knees slightly bent | Grip can be prone (palms facing downwards) or supine (palms facing upwards) | Keep the elbows close to the body and avoid them flaring outwards during the exercise | Inhale in the starting position, exhale as you bring the barbell towards the chest", "Avoid fully extending the knees | Avoid arching the back, but maintain its natural curves | Avoid using the rest of your body to assist, you can lower the weight instead", "BarbellBentOverRow.jpg"),
(10, "https://youtu.be/HRW6o9Udbjg?si=sxP9LbZCCInzuGiM", 3, "Lat Pulldown Wide Grip", "Make sure to have a grip wider than shoulder-width | Bring the barbell until it lightly touches the chest | Inhale in the starting position, exhale as you bring the barbell to the chest", "Avoid excessive arching of the back | Avoid performing the repetitions too quickly | Don’t underestimate the positioning of the knee pads: adjust them before you start the exercise", "LatPulldownWideGrip.jpg"),
(11, "https://youtu.be/wF602AEdTys?si=tENfxxds0SEcJtwz", 3, "Pull up", "Make sure to have a shoulder-width grip, supine (palms facing your face) or prone (palms facing opposite direction) | In the starting position: the body should be completely suspended, the shoulder blades should be engaged (draw the shoulders down) | Inhale in the starting position, exhale as you bring your chin above the bar", "Make sure to keep your core engaged throughout the entire exercise | Once the repetition is complete, do not let yourself hang but keep the shoulder blades engaged | Try to control any swinging motion (engage your core; if you struggle, you can descend from the bar and reposition)", "Pullup.jpg"),
(12, "https://youtu.be/TLRdVjMPfG0?si=SZQ3sST0cGCWEgfW", 3, "Seated Cable Row Close Grip", "Starting position: Grab the bar with palms facing each other, maintain an upright posture (engage your core), chest out, and slightly flexed legs (they are pushing towards the support base) | Inhale in the starting position, exhale as you bring the bar to your chest | Make sure to activate your back muscles by retracting your shoulder blades (bringing them closer together)", "Don’t bring the bar too low: bring it just below the line of your pectoral muscles | Never fully extend your legs | Watch out for overarching your back while performing the movement", "SeatedCableRowCloseGrip.jpg");

INSERT INTO "dailytraining" ("iddaily", "idex", "done") VALUES 
(1, 2, 1),
(2, 1, 0),
(3, 10, 0),
(4, 11, 0),
(5, 6, 0),
(6, 8, 0);

INSERT INTO "questions" ("idquestion", "idquiz", "question") VALUES 
(1, 1, "Which of these bodyweight exercises trains the pectoral muscle?"),
(2, 1, "During the execution of the bench press, when is the appropriate time to exhale?"),
(3, 1, "What is the bottom position of the push up exercise?"),
(4, 1, "Which exercise does not train the chest?"),
(5, 1, "Which exercise trains the chest?"),
(6, 1, "Which stretching position is used to stretch the chest muscles?"),
(7, 1, "Which muscles make up the pectoral muscle?"),
(8, 1, "How should the arms be positioned during Peck deck Machine Flyes?"),
(9, 1, "Should I arch my back during push ups?"),
(10, 1, "What should I absolutely not do during barbell bench press?"),
(11, 3, "Which exercise does not train the back?"),
(12, 3, "Which of these bodyweight exercises trains the back?"),
(13, 3, "Which is the starting position for the barbell bent over row exercise?"),
(14, 3, "What should I avoid while performing barbell bent over row exercise?"),
(15, 3, "Which stretching position is used to stretch the back muscle?");

INSERT INTO "answers" ("idanswer", "idquiz", "idquestion", "answer", "correct") VALUES 
(1, 1, 1, "Push up", 1),
(2, 1, 1, "Squat", 0),
(3, 1, 1, "Crunch", 0),
(4, 1, 1, "Pull up", 0),
(5, 1, 2, "When pushing the barbell back to the starting position", 1),
(6, 1, 2, "As soon as the barbell touches the chest", 0),
(7, 1, 2, "In the starting position", 0),
(8, 1, 2, "While the barbell descends towards the chest", 0),
(9, 1, 3, "Chest touches the floor", 1),
(10, 1, 3, "Starting position", 0),
(11, 1, 3, "Plank position", 0),
(12, 1, 3, "Elbows are at a 30-degree angle", 0),
(13, 1, 4, "Lat machine pulldown", 1),
(14, 1, 4, "Push up", 0),
(15, 1, 4, "Peck deck flyes", 0),
(16, 1, 4, "Bench press", 0),
(17, 1, 5, "Dumbbell Flyes", 1),
(18, 1, 5, "Cobra pose", 0),
(19, 1, 5, "Barbell deadlift", 0),
(20, 1, 5, "Barbell press", 0),
(21, 1, 6, "Bow pose", 1),
(22, 1, 6, "Prayer pose", 0),
(23, 1, 6, "Child pose", 0),
(24, 1, 6, "Cobra pose", 0),
(25, 1, 7, "Pectoralis minor and major", 1),
(26, 1, 7, "Quadriceps femoris", 0),
(27, 1, 7, "Sternocleidomastoid", 0),
(28, 1, 7, "Quadratus lumborum", 0),
(29, 1, 8, "Parallel to the floor", 1),
(30, 1, 8, "Perpendicular to the floor", 0),
(31, 1, 8, "Fully extended", 0),
(32, 1, 8, "Fully bent", 0),
(33, 1, 9, "Never", 1),
(34, 1, 9, "When going up", 0),
(35, 1, 9, "When going down", 0),
(36, 1, 9, "Throughout the entire movement", 0),
(37, 1, 10, "Alter the trajectory of the barbell", 1),
(38, 1, 10, "Keep the feet on the ground", 0),
(39, 1, 10, "Arch the back", 0),
(40, 1, 10, "Inhale in the starting position", 0),
(41, 3, 11, "Push up", 1),
(42, 3, 11, "Barbell bent over row", 0),
(43, 3, 11, "Pull up", 0),
(44, 3, 11, "Seated cable row close grip", 0),
(45, 3, 12, "Pull up", 1),
(46, 3, 12, "Push up", 0),
(47, 3, 12, "Squat", 0),
(48, 3, 12, "Crunch", 0),
(49, 3, 13, "Forward flexed torso, knees slightly bent", 1),
(50, 3, 13, "Standing with palms facing each other", 0),
(51, 3, 13, "Plank position", 0),
(52, 3, 13, "Supine position", 0),
(53, 3, 14, "Fully extending the knees", 1),
(54, 3, 14, "Slightly bent knees", 0),
(55, 3, 14, "Prone grip", 0),
(56, 3, 14, "Supine grip", 0),
(57, 3, 15, "Knees-to-chest position", 1),
(58, 3, 15, "Frog pose", 0),
(59, 3, 15, "Bow pose", 0),
(60, 3, 15, "Prayer pose", 0);

COMMIT;

