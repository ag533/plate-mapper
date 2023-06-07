# Running the App

This project is deployed at : https://ag533.github.io/plate-mapper/
If you want to intstall this locally (prereqiisit install node and npm):

1. Downlaod the code from the repository to you system.
2. Run `npm install`.
3. Run `npm start`.
4. Open `localhost:3000` in you browser to access the app.

## Implementation Steps breakdown

We need following things to solve the problem presented.

1. Create a CSV uploader.
2. Create a virtual plate.
3. Fill the data from CSV into the plate.
4. Show info to print of the user wants to print (Extra Thought)

Thought process.

1. I started this issue by thinking how can I show a plate from the video on a computer screen. So I created a grid which will be 12x8 size.
2. Then I moved on how to get the CSV data from the file onto the app.
3. The next step was to assign different color to each element as it will be interesting of a scientist rather tha looking at a black and white screen.
4. Then I created hovero over for the wells so that the scientist can view which sample to enter in which well.
5. Then I though that what if they want to download this layout and pass it on.
6. So I cearted an index table with sample name, location and color. So that they can also keep a records of this as the functionality to save a model on server is not easy to crete in 3 hours.
7. What if they want to re run wiht different CSV so I added a button for that too.

Improvements:

1. Testing environemt or this project along with unit and e2e tests.
2. The color pallete can also be tweeked (I had no idea what the color pallete breifly.bio has so I selected random colors that went ok according to me.)
3. The image saving code is having some issues of the table and spreading the color that can be fixed too.

More features for the future:

1. Online editing. (We can edit inndividual wells and that will update the table accordingly.)
2. Online plate creation. (We can provide an empty plate to be filled and that will also assign the colors automatically and create table simultaneiously.)
3. State saving for multiple accounts. (We can save state of a plate so that a person can visit it later and change/ fill whenever they feel like.)
4. Footnotes for every well or info about handling the chemicals.
5. Plate sharing so that they can send this to someone else on our platform too.
