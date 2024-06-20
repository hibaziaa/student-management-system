#! /usr/bin/env node
import inquirer from "inquirer";

class student {
  id: string;
  name: string;
  coursesEnrolled: string[];
  feesAmount: number;

  constructor(
    id: string,
    name: string,
    coursesEnrolled: string[],
    feesAmount: number
  ) {
    this.id = id;
    this.name = name;
    this.coursesEnrolled = coursesEnrolled;
    this.feesAmount = feesAmount;
  }
}

let baseId: number = 1000;
let studentId: string = "";
let continueEnrollment: boolean = true;

let students: student[] = [];
do {
  let action = await inquirer.prompt({
    name: "ans",
    type: "list",
    message: "Please select an option:\n",
    choices: ["Enroll a student", "Show student status"],
  });
  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt({
      name: "ans",
      type: "input",
      message: "Please enter your name:",
    });
    let trimmedStudentName = studentName.ans.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);

    if (studentNameCheck.includes(trimmedStudentName) === false) {
      if (trimmedStudentName !== "") {
        baseId++;
        studentId = "STID" + baseId;
        console.log("\n\tYour account has been created");
        console.log(`Welcome, ${trimmedStudentName}!`);

        let course = await inquirer.prompt({
          name: "ans",
          type: "list",
          message: "Select a course you want to be enrolled in:",
          choices: ["TypeScript", "Python", "C++", "Java"],
        });

        let courseFee = 0;
        switch (course.ans) {
          case "TypeScript":
            courseFee = 2500;
            break;
          case "Python":
            courseFee = 7000;
            break;
          case "C++":
            courseFee = 5500;
            break;
          case "Java":
            courseFee = 5000;
            break;
        }
        let courseConfirm = await inquirer.prompt({
          name: "ans",
          type: "confirm",
          message: "Do you want to enroll in this course?",
        });

        if (courseConfirm.ans === true) {
          let Student = new student(
            studentId,
            trimmedStudentName,
            [course.ans],
            courseFee
          );

          students.push(Student);
          console.log(
            ` You have successfully enrolled in ${course.ans} course `
          );
        }
      } else {
        console.log("Invalid Name!");
      }
    } else {
      console.log("This name already exists!");
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNameCheck = students.map((e) => e.name);

      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Select your name:",
        choices: studentNameCheck,
      });

      let foundStudent = students.find(
        (Student) => Student.name === selectedStudent.ans
      );
      console.log("Student Information");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is empty!");
    }
  }
  let userConfirmation = await inquirer.prompt({
    name: "ans",
    type: "confirm",
    message: "Do you want to continue?",
  });
  if (userConfirmation.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);
