// get current year
const currentYear = new Date().getFullYear();
document.getElementById('current-year').innerHTML = currentYear;

// get last modified date
const lastModified = document.lastModified;
document.getElementById('last-modified-date').innerHTML = lastModified;

// course list array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// generate course cards
const courseList = document.querySelector('.course-cards');
courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    // Add class for completed courses
    if (course.completed) {
        courseCard.classList.add('completed');  
    }
    courseCard.innerHTML = `
        <h3>${course.title}</h3>
        <p>Subject: ${course.subject}</p>
        <p>Number: ${course.number}</p>
        <p>Credits: ${course.credits}</p>
        <p>Certificate: ${course.certificate}</p>
        <p>Description: ${course.description}</p>
        <p>Technology: ${course.technology.join(', ')}</p>
        <p>Completed: ${course.completed ? 'Yes' : 'No'}</p>
    `;
    courseList.appendChild(courseCard);
});

//total credits after filtering
const updateTotalCredits = (coursesToDisplay) => {
    const totalCredits = coursesToDisplay.reduce((acc, course) => acc + course.credits, 0);
    document.getElementById('total-credits').innerHTML = totalCredits;
};

// filter courses
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const filteredCourses = courses.filter(course => {
            if (filter === 'all') return true;
            if (filter === 'wdd' && course.subject.toLowerCase() === 'wdd') return true;
            if (filter === 'cse' && course.subject.toLowerCase() === 'cse') return true;
            return false;
        });
        courseList.innerHTML = '';  
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }
            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>Subject: ${course.subject}</p>
                <p>Number: ${course.number}</p>
                <p>Credits: ${course.credits}</p>
                <p>Certificate: ${course.certificate}</p>
                <p>Description: ${course.description}</p>
                <p>Technology: ${course.technology.join(', ')}</p>
                <p>Completed: ${course.completed ? 'Yes' : 'No'}</p>
            `;
            courseList.appendChild(courseCard);
        });
        //total credits after filtering
        updateTotalCredits(filteredCourses);
    });
});
