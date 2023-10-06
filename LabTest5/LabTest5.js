// Array of objects containing Name and Gender
const students = [
  { Name: 'Mark', Gender: 'M' },
  { Name: 'Leo', Gender: 'M' },
  { Name: 'Eve', Gender: 'F' },
  { Name: 'Anne', Gender: 'F' },
  { Name: 'Nick', Gender: 'M' },
  { Name: 'Bob', Gender: 'M' },
  { Name: 'Alice', Gender: 'F' },
];

// 2D Array containing marks
const marks = [
  [72, 94, 74, 78, 70],
  [78, 87, 79, 72, 82],
  [83, 76, 62, 85, 68],
  [88, 79, 68, 90, 73],
  [75, 80, 71, 63, 94],
  [56, 78, 67, 84, 79],
  [91, 84, 85, 77, 72],
];

// Subject list
const subjects = ['Math', 'Geography', 'Biology', 'English', 'Chemistry'];

// Function to populate the table
function populateTable() {
  const tableBody = document.getElementById('tableBody');
  for (let i = 0; i < students.length; i++) {
    const row = document.createElement('tr');
    // Adding Name and Gender
    row.innerHTML = `<td>${students[i].Gender}</td><td>${students[i].Name}</td>`;

    // Adding marks
    for (let j = 0; j < marks[i].length; j++) {
      row.innerHTML += `<td>${marks[i][j]}</td>`;
    }

    tableBody.appendChild(row);
  }
}

// Call the function to populate the table
populateTable();

// 1. Display GPA's of each student
function displayGPAs() {
  let output = 'GPAs:<br>';
  for (let i = 0; i < students.length; i++) {
    const studentMarks = marks[i];
    // To calculate GPA, we need to add all the marks and divide by the number of marks
    // Ex - GPA = (72 + 94 + 74 + 78 + 70) / 5 = 77.6
    const gpa = studentMarks.reduce((acc, mark) => acc + mark, 0) / studentMarks.length;
    console.log("gpa", gpa);

    console.log(students[i].Name);
    // Now we map the GPA to the student's name. 
    output += `${students[i].Name}: ${gpa.toFixed(2)}<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}

// 2. Display averages for each subject
function displaySubjectAverages() {

  let output = 'Subject Averages:<br>';

  // To calculate the average for each subject, 
  // we need to add all the marks for that subject and divide by the number of students
  // Ex - Math Average = (72 + 78 + 83 + 88 + 75 + 56 + 91) / 7 = 77.57

  // We loop through the subjects
  for (let j = 0; j < subjects.length; j++) { // j is row, row is subject 
    let subjectTotal = 0;

    // We loop through the students
    for (let i = 0; i < students.length; i++) { // i is column, column is student 
      console.log(`i: ${i}, j: ${j}`);
      console.log(`i is column, column is student: ${students[i].Name}`);
      console.log(`j is row, row is subject: ${subjects[j]}`);
      console.log("marks", marks[i][j]);
      subjectTotal += marks[i][j];
      console.log("subjectTotal", subjectTotal);
    }

    // Now we calculate the average for the subject 
    const subjectAverage = subjectTotal / students.length;
    console.log("subjectAverage", subjectAverage);

    // Now we map the subject average to the subject name.
    output += `${subjects[j]}: ${subjectAverage.toFixed(2)}<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}

// 3. For each student, display high/low marks along with subject
function displayStudentHighLow() {
  let output = 'High/Low Marks for Each Student:<br>';

  // To calculate the high/low marks for each student, 
  // we need to loop through the marks for each student
  // and find the highest and lowest marks
  // Ex - Mark - High: 94 (Geography), Low: 70 (Chemistry)

  // We loop through the students
  for (let i = 0; i < students.length; i++) {
    // We get the marks for the student
    const studentMarks = marks[i];
    console.log("Student", students[i].Name);
    console.log("studentMarks", studentMarks);

    // We find the highest and lowest marks
    const maxMark = Math.max(...studentMarks);
    console.log("maxMark", maxMark);

    const minMark = Math.min(...studentMarks);
    console.log("minMark", minMark);

    // We find the subject for the highest and lowest marks
    const maxSubject = subjects[studentMarks.indexOf(maxMark)];
    console.log("maxSubject", maxSubject);

    const minSubject = subjects[studentMarks.indexOf(minMark)];
    console.log("minSubject", minSubject);

    // Now we map the high/low marks to the student's name.
    output += `${students[i].Name} - High: ${maxMark} (${maxSubject}), Low: ${minMark} (${minSubject})<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}

// 4. For each subject, display high/low marks along with students
function displaySubjectHighLow() {
  let output = 'High/Low Marks for Each Subject:<br>';

  // To calculate the high/low marks for each subject, 
  // Similar to calculate the high/low marks for each student,

  for (let j = 0; j < subjects.length; j++) {
    const subjectMarks = marks.map(studentMarks => studentMarks[j]);
    console.log("subject", subjects[j]);
    console.log("subjectMarks", subjectMarks);

    const maxMark = Math.max(...subjectMarks);
    console.log("maxMark", maxMark);

    const minMark = Math.min(...subjectMarks);
    console.log("minMark", minMark);

    const maxStudent = students[subjectMarks.indexOf(maxMark)].Name;
    console.log("maxStudent", maxStudent);

    const minStudent = students[subjectMarks.indexOf(minMark)].Name;
    console.log("minStudent", minStudent);
    
    output += `${subjects[j]} - High: ${maxMark} (${maxStudent}), Low: ${minMark} (${minStudent})<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}


// 5. Sort display students by GPA (Up/Down cursor)
let studentSortDirection = 'up';  // Initialize sort direction

function sortStudentsByGPA() {
  let output = 'Students sorted by GPA:<br>';

  // To sort the students by GPA, 
  // we need to calculate the GPA for each student first

  // We loop and use map to calculate the GPA for each student and return new array
  const gpaData = students.map((student, i) => {
    // We get the marks for the student
    const studentMarks = marks[i];
    console.log("studentMarks", studentMarks);

    // We calculate the GPA for the student
    const gpa = studentMarks.reduce((acc, mark) => acc + mark, 0) / studentMarks.length;
    console.log("gpa", gpa);

    // Now we map the GPA to the student's name and return it.
    console.log("student.Name", student.Name);
    return { Name: student.Name, GPA: gpa };
  });

  // Now we sort the array of objects by GPA with the sort function
  gpaData.sort((a, b) => studentSortDirection === 'up' ? a.GPA - b.GPA : b.GPA - a.GPA);
  studentSortDirection = studentSortDirection === 'up' ? 'down' : 'up';

  // Now we loop and map the sorted data to the output string
  gpaData.forEach(data => output += `${data.Name}: ${data.GPA.toFixed(2)}<br>`);
  document.getElementById('output-container').innerHTML = output;

  // Update the button text
  const buttonText = `Display Students Sort by GPA ${studentSortDirection === 'up' ? '↓' : '↑'}`;
  document.getElementById('sortStudentsButton').innerText = buttonText;
}

// 6. Sort display subject by averages (Up/Down cursor)
let subjectSortDirection = 'up';  // Initialize sort direction

function sortSubjectsByAverage() {
  let output = 'Subjects sorted by Average:<br>';

  // To sort the subjects by average, similar to sort students by GPA

  const subjectAverages = subjects.map((subject, j) => {
    let subjectTotal = 0;
    for (let i = 0; i < students.length; i++) {
      subjectTotal += marks[i][j];
    }
    const subjectAverage = subjectTotal / students.length;
    return { Subject: subject, Average: subjectAverage };
  });

  subjectAverages.sort((a, b) => subjectSortDirection === 'up' ? a.Average - b.Average : b.Average - a.Average);
  subjectSortDirection = subjectSortDirection === 'up' ? 'down' : 'up';  // Toggle sort direction

  subjectAverages.forEach(data => output += `${data.Subject}: ${data.Average.toFixed(2)}<br>`);
  document.getElementById('output-container').innerHTML = output;

  // Update the button text
  const buttonText = `Display Subjects Sort by Average ${subjectSortDirection === 'up' ? '↓' : '↑'}`;
  document.getElementById('sortSubjectsButton').innerText = buttonText;
}

// 7. Which subjects have higher/lower average than class average
function compareSubjectToClassAverage() {
  let output = 'Subjects Compared to Class Average:<br>';
  let classTotal = 0;
  let classCount = 0;

  // To calculate the class average, 
  // we need to add all the marks and divide by the number of marks
  // Ex - Class Average = (72 + 94 + 74 + 78 + 70 + ... + 72) / (5 + 5 + 5 + 5 + 5 + ... + 5) = 77.57

  // We loop through the students and add all the marks
  for (const studentMarks of marks) {
    classTotal += studentMarks.reduce((acc, mark) => acc + mark, 0);
    classCount += studentMarks.length;
  }

  // Calculate the class average and display it
  const classAverage = classTotal / classCount;
  output += `Class Average: ${classAverage.toFixed(2)}<br>`;

  // Compare each subject's average to the class average
  // loop through the subjects and calculate the average for each subject
  for (let j = 0; j < subjects.length; j++) {
    let subjectTotal = 0;

    // We loop through the students and add all the marks for the subject
    for (let i = 0; i < students.length; i++) {
      subjectTotal += marks[i][j];
    }

    // To calculate the average for each subject, 
    // we need to add all the marks for that subject and divide by the number of students
    // Ex - Math Average = (72 + 78 + 83 + 88 + 75 + 56 + 91) / 7 = 77.57
    const subjectAverage = subjectTotal / students.length;

    // Compare the subject average to the class average
    const comparison = subjectAverage > classAverage ? 'Higher' : 'Lower';
    output += `${subjects[j]}: ${comparison} (${subjectAverage.toFixed(2)})<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}

// 8. Which students have higher/lower average(GPA) than class average
function compareStudentToClassAverage() {
  let output = 'Students Compared to Class Average GPA:<br>';
  let classTotal = 0;
  let classCount = 0;

  // To calculate the class average GPA, similar to compare subject to class average

  // Calculate the class average GPA
  for (const studentMarks of marks) {
    classTotal += studentMarks.reduce((acc, mark) => acc + mark, 0);
    classCount += studentMarks.length;
  }
  const classAverageGPA = classTotal / classCount;
  output += `Class Average GPA: ${classAverageGPA.toFixed(2)}<br>`;

  // Compare each student's GPA to the class average
  for (let i = 0; i < students.length; i++) {
    const studentMarks = marks[i];
    const gpa = studentMarks.reduce((acc, mark) => acc + mark, 0) / studentMarks.length;
    const comparison = gpa > classAverageGPA ? 'Higher' : 'Lower';
    output += `${students[i].Name}: ${comparison} (GPA: ${gpa.toFixed(2)})<br>`;
  }
  document.getElementById('output-container').innerHTML = output;
}

// 9. List the subject in which female students are better than male students
function subjectsWhereFemalesAreBetter() {
  let output = 'Subjects Where Females Are Better:<br>';

  // To get the subjects that female students are better than male students
  // We loop through the subjects 
  // We need to calculate the avg and,
  // Then make a comparision

  // We loop through the subjects 
  for (let j = 0; j < subjects.length; j++) {
    let maleTotal = 0, femaleTotal = 0;
    let maleCount = 0, femaleCount = 0;

    // We loop through the students
    for (let i = 0; i < students.length; i++) {

      // Match gender and add marks
      if (students[i].Gender === 'M') {
        maleTotal += marks[i][j];
        maleCount++;
      } else {
        femaleTotal += marks[i][j];
        femaleCount++;
      }
    }

    // Calculate the average by dividing the total by the count
    // Ex - Male Average = (72 + 78 + 83 + 88 + 75 + 56 + 91) / 7 = 77.57

    const maleAverage = maleTotal / maleCount;
    const femaleAverage = femaleTotal / femaleCount;

    // Compare the averages
    if (femaleAverage > maleAverage) {
      output += `- ${subjects[j]} - Male Avg: ${maleAverage.toFixed(2)}, Female Avg: ${femaleAverage.toFixed(2)}<br>`;
    }
  }
  document.getElementById('output-container').innerHTML = output;
}

// 10. List the subject in which male students are better than female students
function subjectsWhereMalesAreBetter() {
  let output = 'Subjects Where Males Are Better:<br>';

  // To do this, similar to female better male.

  for (let j = 0; j < subjects.length; j++) {
    let maleTotal = 0, femaleTotal = 0;
    let maleCount = 0, femaleCount = 0;

    for (let i = 0; i < students.length; i++) {
      if (students[i].Gender === 'M') {
        maleTotal += marks[i][j];
        maleCount++;
      } else {
        femaleTotal += marks[i][j];
        femaleCount++;
      }
    }

    const maleAverage = maleTotal / maleCount;
    const femaleAverage = femaleTotal / femaleCount;

    if (maleAverage > femaleAverage) {
      output += `- ${subjects[j]} - Male Avg: ${maleAverage.toFixed(2)}, Female Avg: ${femaleAverage.toFixed(2)}<br>`;
    }
  }
  document.getElementById('output-container').innerHTML = output;
}