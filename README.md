To run this code just execute `npm i` and then `npm start`
The app will start on port 3000

Endpoints: 
- `POST /courses` -> Create a new course with given name/dni (sent on body)
- `GET /courses/:dni` -> Get all courses with given student dni
- `POST /exam` -> Create a new exam with all needed data
- `GET /list` -> Get for each user if it has graded or not from his courses

There is example data on `data.js` file
Required Node >= 10