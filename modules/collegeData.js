const Sequelize = require('sequelize');
var sequelize = new Sequelize('SenecaDB', 'SenecaDB_owner', 'rFL0X9PTOfSJ', {
    host: 'ep-nameless-river-a56tg7zt.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query:{ raw: true }
});

var Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:Sequelize.STRING,
    addressStreet:Sequelize.STRING,
    addressCity:Sequelize.STRING,
    addressProvince:Sequelize.STRING,
    TA:Sequelize.BOOLEAN,
    status:Sequelize.STRING
});

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode:Sequelize.STRING,
    courseDescription:Sequelize.STRING
});

Course.hasMany(Student, {foreignKey: 'course'});

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

module.exports.getAllStudents = function(){
    return new Promise(function (resolve, reject) {
        reject();
    });
}

module.exports.getCourses = function(){
    return new Promise(function (resolve, reject) {
        reject();
    });
};

module.exports.getCourseById = function(num){
    return new Promise(function (resolve, reject) {
        reject();
    });
 };

module.exports.getStudentByNum = function(num) {
    return new Promise(function (resolve, reject) {
        reject();
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        reject();
    });
};

module.exports.addStudent = function (requestBody) {
    return new Promise(function (resolve, reject) {
        reject();
    });
};

module.exports.updateStudent = function (requestBody) {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
