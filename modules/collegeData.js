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
        sequelize.sync().then(() => { 
            Student.create({
                title: 'Student',
                description: 'Student Table'
            }).then(() => {
                Course.create({
                    title: 'Course',
                    description: 'Course Table'
                }).then(() => {
                    resolve("sync success");
                }).catch((error) => {
                    console.error("Failed to create Course:", error);
                    reject("sync fail");
                });
            }).catch((error) => {
                console.error("Failed to create Student:", error);
                reject("sync fail");
            });
        }).catch((error) => {
            console.error("Failed to sync database:", error);
            reject("sync fail");
        });
    });
};

module.exports.getAllStudents = function(){
    return new Promise(function (resolve, reject) {
        Student.findAll({order: [
            ['studentNum', 'ASC'],
        ]})
        .then((studentData) => {
            resolve(studentData);
        }).catch((error) => {
            reject(error); 
        });
    });
}

module.exports.getCourses = function(){
    return new Promise(function (resolve, reject) {
        Course.findAll({order: [
            ['courseId', 'ASC'],
        ]})
        .then((courseData) => {
            resolve(courseData);
        }).catch((error) => {
            reject(error); 
        });
    });
};

module.exports.getCourseById = function(num){
    return new Promise(function (resolve, reject) {
        Student.findAll({ 
            where: {
                courseId: num
            }
        })
        .then((courseData) => {
            resolve(courseData[0]);
        }).catch((error) => {
            reject(error); 
        });
    });
 };

module.exports.getStudentByNum = function(num) {
    return new Promise(function (resolve, reject) {
        Student.findAll({ 
            where: {
                studentNum: num
            }
        })
        .then((studentData) => {
            resolve(studentData[0]);
        }).catch((error) => {
            reject(error); 
        });
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        Student.findAll({ 
            where: {
                course: course
            }
        })
        .then((studentData) => {
            resolve(studentData);
        }).catch((error) => {
            reject(error); 
        });
    });
};

module.exports.addStudent = function (requestBody) {
    return new Promise(function (resolve, reject) {
        try {
            requestBody.TA = (requestBody.TA) ? true : false;
            for (let key in requestBody) {
                if (requestBody.hasOwnProperty(key)) {
                    if (requestBody[key] === "" || requestBody[key] === undefined) {
                        requestBody[key] = null;
                    }
                }
            }
            Student.create(requestBody)
            .then(() => {
                resolve("Student Added");
            });
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });
};

module.exports.updateStudent = function (requestBody) {
    return new Promise(function (resolve, reject) {
        try {
            if(requestBody.TA === "" || requestBody.TA === undefined)
                requestBody.TA = false;
            else
                requestBody.TA = true;
            for (let key in requestBody) {
                if (requestBody.hasOwnProperty(key)) {
                    if (requestBody[key] === "" || requestBody[key] === undefined) {
                        requestBody[key] = null;
                    }
                }
            }
            Student.update(requestBody, {
                where: { studentNum: requestBody.studentNum }
            })
            .then(() => {
                resolve("Student Updated");
            });
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });
};
