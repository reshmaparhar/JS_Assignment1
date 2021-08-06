//1.Add Student
function registerStudent(ID,firstName,lastName){
    function Student(ID,firstName,lastName){
        this.ID = ID
        this.firstName = firstName
        this.lastName = lastName
    }  
    if(!ID || !firstName || !lastName){
        console.log("Please Provide all Required Details")
        return 
    }
   return new Student(ID,firstName,lastName) 
}

//2.Add Course

function registerCourse(courseID,facultyID,courseName){
    function Course(courseID,facultyID,courseName){
        this.courseID = courseID
        this.facultyID = facultyID
        this.name = courseName
       
    }
    if(!courseID || !facultyID || !courseName ){
        console.log('Please Provide Required Details')
        return
    }
    return new Course(courseID,facultyID,courseName)
}
//find particular entity to check it whether it exists or not
function findEntity(entity,ID){
    const result = entity.get(ID)
    if(result)
        return result
}

//3.select courses for a student
function selectCourse(studentMap,courseMap){
  return function(selectedCourse,studentId){  
       const course3 = []
       const student = findEntity(studentMap,studentId)
        for(let cour in selectedCourse){
            const course = courseMap.get(selectedCourse[cour].courseID)
            if(course && course.facultyID === selectedCourse[cour].facultyID){
                course3.push(selectedCourse[cour])
            }

        }
       if( !course3){
            console.log('Either course or student is not registered')
            return
       }
       else{
           
            if(student.Course)
               student.Course = [...student.Course,...course3]
            else
                student.Course = course3
        }
    }
}

//4. Find list of Courses opted by a particular student x

function studentCoursesList(studentMap,courseMap,ID){
    if(!studentMap || !courseMap || !ID){
        console.log('Please Provide Required Details')
        return
    }
   const student  = findEntity(studentMap,ID)
    if(student){
        let cours = []
        for(let course in student.Course){
            const cors = findEntity(courseMap,student.Course[course].courseID)
            cours.push(cors.name)
        }
        return cours
    }

    console.log('It seems like student is not registered with this ID')
    return
}
//5. for a single course ,give a list of students who have opted this course
function coursesStudentList(studentMap,courseID){
    if(!studentMap || !courseID){
        console.log("Please Provide Valid Details")
        return
    }
    var students = [ ...studentMap.values() ];
    return students.filter((stu)=>{
        for (let course in stu.Course){
            if(stu.Course[course].courseID === courseID)
                return stu
        }
    })

}
//6. Find out list of courses which are not being opted by single student
function coursesNotOpted(courseMap,studentMap){
   const courseResult = []
   var set = new Set();
   var students = [ ...studentMap.values() ];
    var courses = [...courseMap.values()]
    for (let student in students){
       students[student].Course.forEach(function(item){
            set.add(item.courseID)
       })
    }
    for(let course in courses){
        if(!set.has(courses[course].courseID))
            courseResult.push(courses[course])
    }
    return courseResult
}


var studentMap = new Map()
var courseMap = new Map()

//1
const student1 = registerStudent(1010,'Reshma','Parhar')
const student2 = registerStudent(1011,'John','Roy')

if(student1)
    studentMap.set(student1.ID,student1)
    console.log(`Congratulations! ${student1.firstName} You are Registered`)
if(student2)
    studentMap.set(student2.ID,student2)
    console.log(`Congratulations! ${student2.firstName} You are Registered`)
//2
var course1 = registerCourse('M201','F101','Math')
var course2 = registerCourse('E234','F202','English')
var course3 = registerCourse('H234','F303','Hindi')
if(course1)
    courseMap.set(course1.courseID,course1)
    console.log(`Course ${course1.name} Registered successfully`)
if(course2)
    courseMap.set(course2.courseID,course2)
    console.log(`Course ${course2.name} Registered successfully`)
if(course3)
    courseMap.set(course3.courseID,course3)
    console.log(`Course ${course3.name} Registered successfully`)
//3

 
const selectedCourses = selectCourse(studentMap,courseMap)
selectedCourses([{courseID:'M201',facultyID:'F101'},{courseID:'E234',facultyID:'F202'}],1011)
selectedCourses([{courseID:'M201',facultyID:'F101'}],1010)

//4
console.log("List Of Courses Opted By John")
const studentOptedCourses = studentCoursesList(studentMap,courseMap,1011)
console.log(studentOptedCourses)
//5
console.log("List Of students who have Opted Math")
const studentlist = coursesStudentList(studentMap,'M201')
for (let student in studentlist)
    console.log(studentlist[student].firstName,studentlist[student].ID)
//6
console.log("List Of courses which are not  Opted By any student")
const course = coursesNotOpted(courseMap,studentMap)
if(course)
    course.forEach(function(item){
        console.log(item.courseID,item.name)
    })
