    // State management & LocalStorage Key
    const STORAGE_KEY = 'gpa_master_semesters_data';
    const THEME_KEY = 'gpa_master_theme';
    
    // Initial sample data
    const sampleData = [
        {
            id: 'sem-1',
            name: 'Học kỳ 1 - Năm học 2025 - 2026',
            courses: [
                { id: 'c-1-1', code: 'GE403987', name: 'Pháp luật Việt Nam đại cương', credits: 2, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-2', code: 'GE409181', name: 'Triết học Mác - Lênin', credits: 3, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-3', code: 'IN4012N02', name: 'Lập trình căn bản', credits: 3, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-4', code: 'IN401702', name: 'Toán rời rạc', credits: 3, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-5', code: 'IN421902', name: 'Xác suất thống kê cho tin học', credits: 2, weightGK: '40', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-6', code: 'IN450606', name: 'Thiết kế đồ họa', credits: 2, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-7', code: 'IN453002', name: 'Nhập môn ngành CNTT', credits: 1, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' }

            ]
        },
        {
            id: 'sem-2',
            name: 'Học kỳ 2 - Năm học 2025 - 2026',
            courses: [
                { id: 'c-1-1', code: 'AI445041', name: 'Nhập môn Công nghệ số và ứng dụng AI', credits: 2, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-2', code: 'GE409233', name: 'Kinh tế chính trị Mác - Lênin', credits: 2, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-3', code: 'IN400204', name: 'Cấu trúc dữ liệu và Giải thuật', credits: 3, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-4', code: 'IN4019N04', name: 'Lý thuyết đồ thị', credits: 2, weightGK: '50', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-5', code: 'IN410704', name: 'Cơ sở dữ liệu', credits: 3, weightGK: '40', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-6', code: 'IN430703', name: 'Đại số tuyến tính', credits: 2, weightGK: '40', weightCK: '', gradeGK: '', gradeCK: '' },
            ]
        },
         {
            id: 'sem-3',
            name: 'Học kỳ 3 - Năm học 2025 - 2026',
            courses: [
                { id: 'c-1-1', code: 'GE4093100', name: 'Chủ nghĩa xã hội khoa học', credits: 2, weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-2', code: 'IN412104', name: 'Lập trình hướng đối tượng', credits: 3, weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-3', code: 'IN4126N04', name: 'Lý thuyết thông tin', credits: 3, weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-4', code: 'IN416810', name: 'Chuyên đề Luật CNTT, An ninh mạng, Sở hữu trí tuệ', credits: 1, weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' },
                { id: 'c-1-5', code: 'IN460102', name: 'Kiến trúc máy tính và Hệ điều hành', credits: 3, weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' },
            ]
        }
    ];

    let semesters = [];

    // Initialize application
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        loadData();
        setupEventListeners();
        render();
    });

    // Theme logic
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        document.getElementById('themeToggle').addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const themeIcon = document.getElementById('themeIcon');
        if (theme === 'dark') {
            // Moon icon svg
            themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
        } else {
            // Sun icon svg
            themeIcon.innerHTML = `
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
            `;
        }
    }

    // Data handling
    function loadData() {
        const rawData = localStorage.getItem(STORAGE_KEY);
        if (rawData) {
            try {
                semesters = JSON.parse(rawData);
                // Data migration to course-level weights
                semesters.forEach(sem => {
                    const semGK = sem.weightGK !== undefined ? sem.weightGK : '';
                    const semCK = sem.weightCK !== undefined ? sem.weightCK : '';
                    sem.courses.forEach(course => {
                        if (course.weightGK === undefined) {
                            course.weightGK = semGK;
                        }
                        if (course.weightCK === undefined) {
                            course.weightCK = semCK;
                        }
                    });
                });
            } catch (e) {
                console.error("Lỗi parse dữ liệu LocalStorage. Tải lại dữ liệu mẫu.");
                semesters = JSON.parse(JSON.stringify(sampleData));
            }
        } else {
            // No data, set default sample data
            semesters = JSON.parse(JSON.stringify(sampleData));
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
    }

    // Helper: Grade conversions and computations
    function getLetterAndScale4(score10) {
        if (score10 === null || isNaN(score10)) return { letter: '-', scale4: '-' };
        
        // Clamp and round to 1 decimal place
        const rounded = Math.round(score10 * 10) / 10;
        
        if (rounded >= 8.5) return { letter: 'A', scale4: '4.0', class: 'a' };
        if (rounded >= 7.0) return { letter: 'B', scale4: '3.0', class: 'b' };
        if (rounded >= 5.5) return { letter: 'C', scale4: '2.0', class: 'c' };
        if (rounded >= 4.0) return { letter: 'D', scale4: '1.0', class: 'd' };
        return { letter: 'F', scale4: '0.0', class: 'f' };
    }

    function calculateCourse(course) {
        const credits = parseInt(course.credits);
        const gk = parseFloat(course.gradeGK);
        const ck = parseFloat(course.gradeCK);
        const wGk = parseInt(course.weightGK !== undefined ? course.weightGK : '');
        const wCk = 100 - wGk;

        // Validation checks
        const hasCredits = !isNaN(credits) && credits >= 0;
        const hasGK = !isNaN(gk) && gk >= 0 && gk <= 10;
        const hasCK = !isNaN(ck) && ck >= 0 && ck <= 10;

        if (!hasCredits || !hasGK || !hasCK) {
            return {
                total10: null,
                total4: null,
                letter: null,
                isValid: false
            };
        }

        // Calculate and round to 1 decimal place
        let total10 = (gk * wGk / 100) + (ck * wCk / 100);
        total10 = Math.round(total10 * 10) / 10;

        const converted = getLetterAndScale4(total10);

        return {
            total10: total10.toFixed(1),
            total4: parseFloat(converted.scale4),
            letter: converted.letter,
            badgeClass: converted.class,
            isValid: true
        };
    }

    // Event listeners
    function setupEventListeners() {
        // Add semester button
        document.getElementById('btnAddSemester').addEventListener('click', () => {
            const nextSemNum = semesters.length + 1;
            const newSem = {
                id: 'sem-' + Date.now(),
                name: `Học kỳ ${nextSemNum}`,
                courses: [
                    { id: 'c-' + Date.now() + '-1', code: '', name: '', credits: '', weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' }
                ]
            };
            semesters.push(newSem);
            saveData();
            render();
            // Scroll to the newly added semester
            document.getElementById(newSem.id).scrollIntoView({ behavior: 'smooth' });
        });

        // Reset data button
        document.getElementById('btnResetData').addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu mẫu không? Toàn bộ dữ liệu hiện tại sẽ bị ghi đè.')) {
                semesters = JSON.parse(JSON.stringify(sampleData));
                saveData();
                render();
            }
        });

        // Event delegation for inputs and actions inside semesters area
        const area = document.getElementById('semesterArea');
        
        // Handle input events for real-time recalculations
        area.addEventListener('input', (e) => {
            const target = e.target;
            const row = target.closest('tr');
            const semesterCard = target.closest('.semester-card');
            
            if (!semesterCard) return;
            const semId = semesterCard.id;
            const semester = semesters.find(s => s.id === semId);
            if (!semester) return;

            // Case 1: Semester name updated
            if (target.classList.contains('semester-title-input')) {
                semester.name = target.value;
                saveData();
                return;
            }

            // Case 2: Course inputs updated (code, name, credits, weight, GK, CK)
            if (row) {
                const courseId = row.dataset.courseId;
                const course = semester.courses.find(c => c.id === courseId);
                if (!course) return;

                if (target.classList.contains('col-code')) course.code = target.value;
                if (target.classList.contains('col-name')) course.name = target.value;
                if (target.classList.contains('col-credits')) {
                    let val = parseInt(target.value);
                    course.credits = isNaN(val) ? '' : Math.max(0, val);
                    target.value = course.credits; // enforce clean integer UI
                }
                if (target.classList.contains('col-weight-gk')) {
                    let val = parseInt(target.value);
                    if (isNaN(val)) val = ''; // default
                    val = Math.max(0, Math.min(100, val));
                    course.weightGK = val;
                    course.weightCK = 100 - val;
                    row.querySelector('.col-weight-ck-text').textContent = 100 - val;
                }
                if (target.classList.contains('col-gk')) {
                    let val = parseFloat(target.value);
                    if (target.value === '') {
                        course.gradeGK = '';
                    } else {
                        course.gradeGK = Math.max(0, Math.min(10, val));
                    }
                }
                if (target.classList.contains('col-ck')) {
                    let val = parseFloat(target.value);
                    if (target.value === '') {
                        course.gradeCK = '';
                    } else {
                        course.gradeCK = Math.max(0, Math.min(10, val));
                    }
                }

                // Recalculate this specific row and the semester totals
                recalculateRowUI(row, course);
                recalculateSemesterUI(semesterCard, semester);
                updateDashboard();
                saveData();
            }
        });

        // Clamp checks on input blur (unifying to valid ranges)
        area.addEventListener('blur', (e) => {
            const target = e.target;
            const row = target.closest('tr');
            if (!row) return;
            const semesterCard = target.closest('.semester-card');
            if (!semesterCard) return;
            const semId = semesterCard.id;
            const semester = semesters.find(s => s.id === semId);
            const courseId = row.dataset.courseId;
            const course = semester.courses.find(c => c.id === courseId);
            if (!course) return;

            if (target.classList.contains('col-weight-gk')) {
                let val = parseInt(target.value);
                if (isNaN(val)) val = '';
                const clamped = Math.max(0, Math.min(100, val));
                target.value = clamped;
                course.weightGK = clamped;
                course.weightCK = 100 - clamped;
                row.querySelector('.col-weight-ck-text').textContent = 100 - clamped;

                recalculateRowUI(row, course);
                recalculateSemesterUI(semesterCard, semester);
                updateDashboard();
                saveData();
            }

            if (target.classList.contains('col-gk') || target.classList.contains('col-ck')) {
                let val = parseFloat(target.value);
                if (!isNaN(val)) {
                    const clamped = Math.max(0, Math.min(10, val));
                    target.value = clamped; // Clean display on blur
                    
                    if (target.classList.contains('col-gk')) course.gradeGK = clamped;
                    if (target.classList.contains('col-ck')) course.gradeCK = clamped;

                    recalculateRowUI(row, course);
                    recalculateSemesterUI(semesterCard, semester);
                    updateDashboard();
                    saveData();
                }
            }
        }, true);

        // Click events (Add Course, Delete Course, Delete Semester)
        area.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const semesterCard = target.closest('.semester-card');
            if (!semesterCard) return;
            const semId = semesterCard.id;
            const semesterIndex = semesters.findIndex(s => s.id === semId);
            if (semesterIndex === -1) return;
            const semester = semesters[semesterIndex];

            // Action: Add Course
            if (target.classList.contains('btn-add-course')) {
                const newCourse = {
                    id: 'c-' + Date.now(),
                    code: '',
                    name: '',
                    credits: '',
                    weightGK: '',
                    weightCK: '',
                    gradeGK: '',
                    gradeCK: ''
                };
                semester.courses.push(newCourse);
                saveData();
                renderSemesterCard(semesterCard, semester);
                updateDashboard();
                return;
            }

            // Action: Delete Course
            if (target.classList.contains('btn-delete-course')) {
                const row = target.closest('tr');
                if (!row) return;
                const courseId = row.dataset.courseId;
                
                // If only 1 course left, make it empty instead of removing the row to keep the layout friendly, or just delete it.
                if (semester.courses.length <= 1) {
                    semester.courses = [{ id: 'c-' + Date.now(), code: '', name: '', credits: '', weightGK: '', weightCK: '', gradeGK: '', gradeCK: '' }];
                } else {
                    semester.courses = semester.courses.filter(c => c.id !== courseId);
                }
                
                saveData();
                renderSemesterCard(semesterCard, semester);
                updateDashboard();
                return;
            }

            // Action: Delete Semester
            if (target.classList.contains('btn-delete-semester')) {
                if (confirm(`Bạn có chắc chắn muốn xóa "${semester.name || 'Học kỳ này'}" không?`)) {
                    semesters.splice(semesterIndex, 1);
                    saveData();
                    render();
                }
            }
        });
    }

    // Recalculates and updates the DOM elements of a row without losing focus
    function recalculateRowUI(row, course) {
        const res = calculateCourse(course);
        const cellTotal10 = row.querySelector('.cell-total10');
        const cellTotal4 = row.querySelector('.cell-total4');
        const cellLetter = row.querySelector('.cell-letter');

        if (res.isValid) {
            row.classList.remove('invalid-row');
            cellTotal10.textContent = res.total10;
            cellTotal4.textContent = res.total4.toFixed(2);
            cellLetter.innerHTML = `<span class="badge-letter ${res.badgeClass}">${res.letter}</span>`;
        } else {
            cellTotal10.textContent = '-';
            cellTotal4.textContent = '-';
            cellLetter.innerHTML = `<span class="badge-letter">-</span>`;
            
            // Highlight validation errors if partially entered
            const hasSomeInput = course.credits !== '' || course.gradeGK !== '' || course.gradeCK !== '';
            if (hasSomeInput) {
                // Check what specific field is invalid
                const creditsValid = course.credits !== '' && parseInt(course.credits) >= 0;
                const gkValid = course.gradeGK === '' || (parseFloat(course.gradeGK) >= 0 && parseFloat(course.gradeGK) <= 10);
                const ckValid = course.gradeCK === '' || (parseFloat(course.gradeCK) >= 0 && parseFloat(course.gradeCK) <= 10);
                
                if (!creditsValid || !gkValid || !ckValid) {
                    row.classList.add('invalid-row');
                } else {
                    row.classList.remove('invalid-row');
                }
            } else {
                row.classList.remove('invalid-row');
            }
        }
    }

    // Recalculates stats for a semester and updates the card's stats display
    function recalculateSemesterUI(semesterCard, semester) {
        let totalCredits = 0;
        let sumGrade10 = 0;
        let sumGrade4 = 0;
        let validCourses10 = 0;
        let validCourses4 = 0;

        semester.courses.forEach(course => {
            const res = calculateCourse(course);
            if (res.isValid) {
                const credits = parseInt(course.credits);
                if (credits > 0) {
                    totalCredits += credits;
                    sumGrade10 += parseFloat(res.total10) * credits;
                    sumGrade4 += res.total4 * credits;
                    validCourses10++;
                    validCourses4++;
                }
            }
        });

        const gpa10 = totalCredits > 0 ? (sumGrade10 / totalCredits) : 0;
        const gpa4 = totalCredits > 0 ? (sumGrade4 / totalCredits) : 0;

        semesterCard.querySelector('.stat-credits').innerHTML = `${totalCredits} <small>tín chỉ</small>`;
        semesterCard.querySelector('.stat-gpa10').textContent = totalCredits > 0 ? gpa10.toFixed(2) : '0.00';
        semesterCard.querySelector('.stat-gpa4').textContent = totalCredits > 0 ? gpa4.toFixed(2) : '0.00';
    }

    // Renders the list of semesters
    function render() {
        const container = document.getElementById('semesterArea');
        container.innerHTML = '';

        if (semesters.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary); background: var(--card-bg); border-radius: var(--radius-xl); border: 1px solid var(--card-border);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); margin-bottom: 1rem;"><path d="m15 5 4 4"/><path d="M19 17V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/><path d="M2 9h17"/><path d="M10 3v16"/></svg>
                    <h3>Chưa có học kỳ nào</h3>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Hãy bấm nút bên dưới để khởi tạo học kỳ đầu tiên.</p>
                </div>
            `;
            updateDashboard();
            return;
        }

        semesters.forEach(semester => {
            const card = document.createElement('div');
            card.className = 'semester-card';
            card.id = semester.id;
            
            renderSemesterCard(card, semester);
            container.appendChild(card);
        });

        updateDashboard();
    }

    // Builds the internal DOM structure of a semester card
    function renderSemesterCard(cardElement, semester) {
        let rowsHtml = '';
        
        let totalCredits = 0;
        let sumGrade10 = 0;
        let sumGrade4 = 0;

        semester.courses.forEach((course, idx) => {
            const res = calculateCourse(course);
            let total10Str = '-';
            let total4Str = '-';
            let letterStr = '<span class="badge-letter">-</span>';
            let rowClass = '';

            const wGk = course.weightGK !== undefined ? course.weightGK : 30;
            const wCk = 100 - wGk;

            if (res.isValid) {
                total10Str = res.total10;
                total4Str = res.total4.toFixed(2);
                letterStr = `<span class="badge-letter ${res.badgeClass}">${res.letter}</span>`;
                
                const credits = parseInt(course.credits);
                if (credits > 0) {
                    totalCredits += credits;
                    sumGrade10 += parseFloat(res.total10) * credits;
                    sumGrade4 += res.total4 * credits;
                }
            } else {
                const hasSomeInput = course.credits !== '' || course.gradeGK !== '' || course.gradeCK !== '';
                if (hasSomeInput) {
                    const creditsValid = course.credits !== '' && parseInt(course.credits) >= 0;
                    const gkValid = course.gradeGK === '' || (parseFloat(course.gradeGK) >= 0 && parseFloat(course.gradeGK) <= 10);
                    const ckValid = course.gradeCK === '' || (parseFloat(course.gradeCK) >= 0 && parseFloat(course.gradeCK) <= 10);
                    if (!creditsValid || !gkValid || !ckValid) {
                        rowClass = 'class="invalid-row"';
                    }
                }
            }

            rowsHtml += `
                <tr data-course-id="${course.id}" ${rowClass}>
                    <td class="w-stt">${idx + 1}</td>
                    <td class="w-code">
                        <input type="text" class="table-input col-code" value="${escapeHtml(course.code)}" placeholder="Mã HP..." />
                    </td>
                    <td class="w-name">
                        <input type="text" class="table-input col-name" value="${escapeHtml(course.name)}" placeholder="Nhập tên môn học..." />
                    </td>
                    <td class="w-credits">
                        <input type="number" class="table-input col-credits text-center number-input" value="${course.credits}" min="0" placeholder="0" />
                    </td>
                    <td class="w-weight text-center">
                        <div class="weight-cell-container">
                            <input type="number" class="col-weight-gk" value="${wGk}" min="0" max="100" />
                            <span class="weight-separator">/</span>
                            <span class="col-weight-ck-text">${wCk}</span>
                        </div>
                    </td>
                    <td class="w-grade">
                        <input type="number" class="table-input col-gk text-center number-input" value="${course.gradeGK}" min="0" max="10" step="0.1" placeholder="0.0" />
                    </td>
                    <td class="w-grade">
                        <input type="number" class="table-input col-ck text-center number-input" value="${course.gradeCK}" min="0" max="10" step="0.1" placeholder="0.0" />
                    </td>
                    <td class="w-result cell-total10">${total10Str}</td>
                    <td class="w-result cell-total4">${total4Str}</td>
                    <td class="w-result cell-letter">${letterStr}</td>
                    <td class="w-action">
                        <button class="btn-delete-course" title="Xóa môn này">
                            <!-- SVG Trash Icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </td>
                </tr>
            `;
        });

        const semGPA10 = totalCredits > 0 ? (sumGrade10 / totalCredits).toFixed(2) : '0.00';
        const semGPA4 = totalCredits > 0 ? (sumGrade4 / totalCredits).toFixed(2) : '0.00';

        cardElement.innerHTML = `
            <div class="semester-header">
                <div class="semester-title-container">
                    <svg class="semester-drag-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                    <input type="text" class="semester-title-input" value="${escapeHtml(semester.name)}" placeholder="Nhập tên học kỳ..." />
                </div>
                
                <button class="btn-delete-semester" title="Xóa học kỳ này">
                    <!-- SVG Trash-2 Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="grade-table">
                    <thead>
                        <tr>
                            <th class="w-stt">STT</th>
                            <th class="w-code">Mã HP</th>
                            <th class="w-name">Tên môn học / Học phần</th>
                            <th class="w-credits text-center">Tín chỉ</th>
                            <th class="w-weight text-center">Tỷ lệ GK/CK</th>
                            <th class="w-grade text-center">Giữa kỳ</th>
                            <th class="w-grade text-center">Cuối kỳ</th>
                            <th class="w-result">Tổng kết (10)</th>
                            <th class="w-result">Thang 4</th>
                            <th class="w-result">Điểm chữ</th>
                            <th class="w-action"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
            
            <div class="semester-footer">
                <button class="btn-outline btn-add-course">
                    <!-- SVG Plus-Circle Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    Thêm môn học
                </button>
                
                <div class="semester-stats">
                    <div class="stat-item">
                        <span>Tổng số tín chỉ</span>
                        <h4 class="stat-credits">${totalCredits} <small>tín chỉ</small></h4>
                    </div>
                    <div class="stat-item">
                        <span>GPA Học kỳ (10)</span>
                        <h4 class="stat-gpa10">${semGPA10}</h4>
                    </div>
                    <div class="stat-item">
                        <span>GPA Học kỳ (4)</span>
                        <h4 class="stat-gpa4" style="color: var(--accent); font-weight: 700;">${semGPA4}</h4>
                    </div>
                </div>
            </div>
        `;
    }

    // Calculates cumulative stats and updates the top dashboard
    function updateDashboard() {
        let totalCredits = 0;
        let sumGrade10 = 0;
        let sumGrade4 = 0;
        let totalCourses = 0;

        semesters.forEach(sem => {
            sem.courses.forEach(course => {
                const res = calculateCourse(course);
                if (res.isValid) {
                    const credits = parseInt(course.credits);
                    if (credits > 0) {
                        totalCredits += credits;
                        sumGrade10 += parseFloat(res.total10) * credits;
                        sumGrade4 += res.total4 * credits;
                        totalCourses++;
                    }
                }
            });
        });

        const cumGPA10 = totalCredits > 0 ? (sumGrade10 / totalCredits) : 0;
        const cumGPA4 = totalCredits > 0 ? (sumGrade4 / totalCredits) : 0;

        // Update texts
        document.getElementById('gpa4Text').innerHTML = `${cumGPA4.toFixed(2)} <small>/ 4.0</small>`;
        document.getElementById('gpa10Text').innerHTML = `${cumGPA10.toFixed(2)} <small>/ 10.0</small>`;
        document.getElementById('totalCreditsText').innerHTML = `${totalCredits} <small>tín chỉ</small>`;
        document.getElementById('totalCoursesText').textContent = `Hoàn thành ${totalCourses} môn học`;

        // Update Classification Badge
        const standingBadge = document.getElementById('standingBadge');
        if (totalCredits === 0) {
            standingBadge.textContent = 'Chưa xếp loại';
            standingBadge.className = 'standing-badge';
            standingBadge.style.display = 'none';
        } else {
            standingBadge.style.display = 'inline-flex';
            if (cumGPA4 >= 3.60) {
                standingBadge.textContent = 'Xuất sắc';
                standingBadge.className = 'standing-badge xuatsu';
            } else if (cumGPA4 >= 3.20) {
                standingBadge.textContent = 'Giỏi';
                standingBadge.className = 'standing-badge gioi';
            } else if (cumGPA4 >= 2.50) {
                standingBadge.textContent = 'Khá';
                standingBadge.className = 'standing-badge kha';
            } else if (cumGPA4 >= 2.00) {
                standingBadge.textContent = 'Trung bình';
                standingBadge.className = 'standing-badge trungbinh';
            }else if (cumGPA4 >= 1.00) {
                standingBadge.textContent = 'Yếu';
                standingBadge.className = 'standing-badge yeu';
            } else {
                standingBadge.textContent = 'Kém';
                standingBadge.className = 'standing-badge';
                standingBadge.style.backgroundColor = 'var(--danger-glow)';
                standingBadge.style.color = 'var(--danger)';
            }
        }

        // Update Circular SVGs
        // Circumference is 220 (2 * Math.PI * 35)
        const circ = 220;
        
        const gpa4Circle = document.getElementById('gpa4Circle');
        const gpa4PctText = document.getElementById('gpa4PctText');
        const gpa4Pct = (cumGPA4 / 4.0) * 100;
        const offset4 = circ - (isNaN(gpa4Pct) ? 0 : gpa4Pct / 100 * circ);
        gpa4Circle.style.strokeDashoffset = offset4;
        gpa4PctText.textContent = `${Math.round(isNaN(gpa4Pct) ? 0 : gpa4Pct)}%`;

        const gpa10Circle = document.getElementById('gpa10Circle');
        const gpa10PctText = document.getElementById('gpa10PctText');
        const gpa10Pct = (cumGPA10 / 10.0) * 100;
        const offset10 = circ - (isNaN(gpa10Pct) ? 0 : gpa10Pct / 100 * circ);
        gpa10Circle.style.strokeDashoffset = offset10;
        gpa10PctText.textContent = `${Math.round(isNaN(gpa10Pct) ? 0 : gpa10Pct)}%`;
    }

    // Helper: Escaping HTML values
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
