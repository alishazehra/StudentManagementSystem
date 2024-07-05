#! /usr/bin/env node 
import inquirer from 'inquirer';
import chalk from 'chalk';
class StudentManager {
    students = [];
    nextId = 1;
    addStudent(name, age, grade) {
        const student = { id: this.nextId++, name, age, grade };
        this.students.push(student);
    }
    listStudents() {
        return this.students;
    }
    deleteStudent(id) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }
}
const studentManager = new StudentManager();
async function mainMenu() {
    const choices = [
        'Add Student',
        'List Students',
        'Delete Student',
        'Exit'
    ];
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: choices,
    });
    switch (action) {
        case 'Add Student':
            await addStudent();
            break;
        case 'List Students':
            listStudents();
            break;
        case 'Delete Student':
            await deleteStudent();
            break;
        case 'Exit':
            console.log(chalk.green('Goodbye!'));
            process.exit();
            break;
    }
    mainMenu();
}
async function addStudent() {
    const studentDetails = await inquirer.prompt([
        { name: 'name', type: 'input', message: 'Student Name:' },
        { name: 'age', type: 'number', message: 'Student Age:' },
        { name: 'grade', type: 'input', message: 'Student Grade:' },
    ]);
    studentManager.addStudent(studentDetails.name, studentDetails.age, studentDetails.grade);
    console.log(chalk.green('Student added successfully!'));
}
function listStudents() {
    const students = studentManager.listStudents();
    if (students.length === 0) {
        console.log(chalk.yellow('No students found.'));
    }
    else {
        students.forEach(student => {
            console.log(chalk.blue(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`));
        });
    }
}
async function deleteStudent() {
    const { id } = await inquirer.prompt([
        { name: 'id', type: 'number', message: 'Enter Student ID to delete:' },
    ]);
    if (studentManager.deleteStudent(id)) {
        console.log(chalk.green('Student deleted successfully!'));
    }
    else {
        console.log(chalk.red('Student not found.'));
    }
}
mainMenu();
