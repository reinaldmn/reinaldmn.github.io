class CourseManager {
    constructor() {
        this.courses = [];
        this.init();
    }

    async init() {
        // In a real application, this would fetch from an API
        this.courses = [
            {
                id: 1,
                title: "Introduction to Computer Science",
                institution: "MIT OpenCourseWare",
                category: "cs",
                description: "A comprehensive introduction to computer science and programming",
                url: "https://ocw.mit.edu/courses/6-00-introduction-to-computer-science-and-programming-fall-2008/",
                popularity: 95,
                dateAdded: "2025-01-15"
            },
            // Add more courses here
        ];

        this.renderCourses(this.courses);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.querySelector('.search-input');
        const categoryFilter = document.querySelector('#category-filter');
        const sortFilter = document.querySelector('#sort-filter');

        searchInput?.addEventListener('input', () => this.filterCourses());
        categoryFilter?.addEventListener('change', () => this.filterCourses());
        sortFilter?.addEventListener('change', () => this.filterCourses());
    }

    filterCourses() {
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();
        const category = document.querySelector('#category-filter').value;
        const sortBy = document.querySelector('#sort-filter').value;

        let filtered = this.courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                                course.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || course.category === category;
            return matchesSearch && matchesCategory;
        });

        filtered = this.sortCourses(filtered, sortBy);
        this.renderCourses(filtered);
    }

    sortCourses(courses, sortBy) {
        switch (sortBy) {
            case 'alphabetical':
                return [...courses].sort((a, b) => a.title.localeCompare(b.title));
            case 'popular':
                return [...courses].sort((a, b) => b.popularity - a.popularity);
            case 'newest':
                return [...courses].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            default:
                return courses;
        }
    }

    renderCourses(courses) {
        const grid = document.getElementById('course-grid');
        if (!grid) return;

        grid.innerHTML = courses.map(course => `
            <article class="course-card">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <div>${course.institution}</div>
                </div>
                <p>${course.description}</p>
                <a href="${course.url}" class="course-link" target="_blank">Go to Course →</a>
            </article>
        `).join('');
    }
}

// Initialize the course manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CourseManager();
});