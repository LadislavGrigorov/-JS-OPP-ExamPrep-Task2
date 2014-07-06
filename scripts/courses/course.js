/*globals define */
define(['./student'], function (Student) {
    'use strict';
    var Course;
    Course = (function () {
        function Course(name, formula) {
            this._name = name;
            this._totalScoreFormula = formula;
            this._students = [];
        }

        Course.prototype.addStudent = function (student) {
            if(!(student instanceof Student)){
                throw new Error('Course can add only students!');
            }

            this._students.push(student);
        };

        Course.prototype.calculateResults = function () {
            for (var i = 0; i < this._students.length; i++) {
                this._students[i].totalScore = this._totalScoreFormula(this._students[i]);
            }
        };

        Course.prototype.getTopStudentsByExam = function (numberOfStudents) {
            var self = this;
            sortStudents(self._students, "exam");
            return self._students.splice(0, numberOfStudents);
        };

        Course.prototype.getTopStudentsByTotalScore = function(numberOfStudents){
            var self = this;
            sortStudents(self._students, "totalScore");
            return self._students.splice(0, numberOfStudents);
        };

        function sortStudents(students, sortBy) {
            students.sort(function (studentA, studentB) {
                return studentB[sortBy] - studentA[sortBy];
            });
        }

        return Course;
    }());
    return Course;
});