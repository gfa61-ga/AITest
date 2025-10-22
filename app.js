// Application State
class QuizApp {
    constructor() {
        this.chapters = [
            { number: 1, title: "Εισαγωγή στην Τεχνητή Νοημοσύνη", questions: 40, file: "test_kefalaio_1.json" },
            { number: 2, title: "Διασύνδεση AI με Άλλες Τεχνολογίες", questions: 40, file: "test_kefalaio_2.json" },
            { number: 3, title: "Η Αξία των Δεδομένων για την AI", questions: 40, file: "test_kefalaio_3.json" },
            { number: 4, title: "Αλγόριθμοι και Μοντέλα Μηχανικής Μάθησης", questions: 40, file: "test_kefalaio_4.json" },
            { number: 5, title: "Νευρωνικά Δίκτυα και Βαθιά Μάθηση", questions: 40, file: "test_kefalaio_5.json" },
            { number: 6, title: "Ανάπτυξη και Εκπαίδευση Μοντέλων AI", questions: 40, file: "test_kefalaio_6.json" },
            { number: 7, title: "Natural Language Processing (NLP)", questions: 40, file: "test_kefalaio_7.json" },
            { number: 8, title: "Computer Vision", questions: 40, file: "test_kefalaio_8.json" },
            { number: 9, title: "Ρομποτική και Αυτονομία", questions: 40, file: "test_kefalaio_9.json" },
            { number: 10, title: "Ηθικά και Νομικά Ζητήματα AI", questions: 40, file: "test_kefalaio_10.json" },
            { number: 11, title: "AI στο Marketing", questions: 40, file: "test_kefalaio_11.json" },
            { number: 12, title: "AI στην Υγεία", questions: 40, file: "test_kefalaio_12.json" },
            { number: 13, title: "Conversational AI και Personal Assistants", questions: 40, file: "test_kefalaio_13.json" },
            { number: 14, title: "AI στις Επιχειρήσεις", questions: 40, file: "test_kefalaio_14.json" },
            { number: 15, title: "Υλοποίηση και Ενσωμάτωση AI", questions: 40, file: "test_kefalaio_15.json" }
        ];
        
        this.currentChapter = null;
        this.questions = [];
        this.userAnswers = [];
        this.currentQuestionIndex = 0;
        this.isTestComplete = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleRouting();
        this.populateChaptersTable();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.showMainView();
        });

        // Quiz navigation
        document.getElementById('prev-question').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submit-answers').addEventListener('click', () => {
            this.submitAnswers();
        });

        // Answer choices
        document.getElementById('choices-container').addEventListener('click', (e) => {
            if (e.target.closest('.choice-btn')) {
                this.selectAnswer(e.target.closest('.choice-btn'));
            }
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('retry-test').addEventListener('click', () => {
            this.retryTest();
        });

        document.getElementById('return-home').addEventListener('click', () => {
            this.showMainView();
        });

        document.getElementById('retry-load').addEventListener('click', () => {
            if (this.currentChapter) {
                this.loadQuiz(this.currentChapter);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRouting();
        });
    }

    handleRouting() {
        const urlParams = new URLSearchParams(window.location.search);
        const chapter = urlParams.get('chapter');
        
        if (chapter && this.chapters.find(c => c.number === parseInt(chapter))) {
            const chapterData = this.chapters.find(c => c.number === parseInt(chapter));
            this.loadQuiz(chapterData);
        } else {
            this.showMainView();
        }
    }

    populateChaptersTable() {
        const tbody = document.getElementById('tests-tbody');
        tbody.innerHTML = '';
        
        this.chapters.forEach(chapter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="chapter-number">${chapter.number}</span></td>
                <td><span class="chapter-title">${chapter.title}</span></td>
                <td><span class="questions-count">${chapter.questions}</span></td>
                <td>
                    <button class="btn btn--primary" onclick="app.startTest(${chapter.number})">
                        Έναρξη Τεστ
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    startTest(chapterNumber) {
        const chapter = this.chapters.find(c => c.number === chapterNumber);
        if (chapter) {
            // Update URL without page reload
            const url = new URL(window.location);
            url.searchParams.set('chapter', chapterNumber);
            window.history.pushState({}, '', url);
            
            this.loadQuiz(chapter);
        }
    }

    async loadQuiz(chapter) {
        this.currentChapter = chapter;
        this.showQuizView();
        this.showLoading();
        
        try {
            // Simulate loading from JSON file
            // Since we can't actually load files in this sandbox environment,
            // we'll generate sample questions
            const questions = this.generateSampleQuestions(chapter.number);
            
            this.questions = questions;
            this.userAnswers = new Array(questions.length).fill(null);
            this.currentQuestionIndex = 0;
            this.isTestComplete = false;
            
            this.hideLoading();
            this.displayQuestion();
            this.updateProgress();
            
        } catch (error) {
            console.error('Error loading quiz:', error);
            this.showError();
        }
    }

    generateSampleQuestions(chapterNumber) {
        // Generate 40 sample questions for demonstration
        const questions = [];
        const sampleQuestions = {
            1: [
                {
                    question: "Τι σημαίνει το ακρωνύμιο AI;",
                    choices: {
                        A: "Artificial Intelligence",
                        B: "Automated Information",
                        C: "Advanced Integration",
                        D: "Algorithmic Innovation"
                    },
                    answer: "A"
                },
                {
                    question: "Ποια είναι η βασική ιδέα πίσω από την τεχνητή νοημοσύνη;",
                    choices: {
                        A: "Η δημιουργία ρομπότ",
                        B: "Η προσομοίωση της ανθρώπινης νοημοσύνης",
                        C: "Η ανάπτυξη γρήγορων υπολογιστών",
                        D: "Η αυτοματοποίηση εργασιών"
                    },
                    answer: "B"
                },
                {
                    question: "Ποιος θεωρείται ο πατέρας της τεχνητής νοημοσύνης;",
                    choices: {
                        A: "Bill Gates",
                        B: "Steve Jobs",
                        C: "Alan Turing",
                        D: "Mark Zuckerberg"
                    },
                    answer: "C"
                }
            ],
            2: [
                {
                    question: "Με ποιες τεχνολογίες συνδυάζεται συχνά η AI;",
                    choices: {
                        A: "IoT και Cloud Computing",
                        B: "Μόνο με βάσεις δεδομένων",
                        C: "Μόνο με το Internet",
                        D: "Μόνο με mobile εφαρμογές"
                    },
                    answer: "A"
                }
            ]
        };

        // Get sample questions for this chapter, or default questions
        const chapterQuestions = sampleQuestions[chapterNumber] || sampleQuestions[1];
        
        // Generate 40 questions by repeating and modifying the sample questions
        for (let i = 0; i < 40; i++) {
            const baseQuestion = chapterQuestions[i % chapterQuestions.length];
            questions.push({
                question: `${i + 1}. ${baseQuestion.question}`,
                choices: baseQuestion.choices,
                answer: baseQuestion.answer
            });
        }
        
        return questions;
    }

    showMainView() {
        // Update URL
        const url = new URL(window.location);
        url.searchParams.delete('chapter');
        window.history.pushState({}, '', url.pathname);
        
        document.getElementById('main-view').classList.add('active');
        document.getElementById('quiz-view').classList.remove('active');
        this.hideModal();
    }

    showQuizView() {
        document.getElementById('main-view').classList.remove('active');
        document.getElementById('quiz-view').classList.add('active');
        
        // Update header
        document.getElementById('chapter-title').textContent = 
            `Κεφάλαιο ${this.currentChapter.number}: ${this.currentChapter.title}`;
    }

    showLoading() {
        document.getElementById('loading-spinner').classList.remove('hidden');
        document.getElementById('quiz-content').classList.add('hidden');
        document.getElementById('error-message').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading-spinner').classList.add('hidden');
        document.getElementById('quiz-content').classList.remove('hidden');
    }

    showError() {
        document.getElementById('loading-spinner').classList.add('hidden');
        document.getElementById('quiz-content').classList.add('hidden');
        document.getElementById('error-message').classList.remove('hidden');
    }

    displayQuestion() {
        if (this.questions.length === 0) return;
        
        const question = this.questions[this.currentQuestionIndex];
        
        document.getElementById('question-number').textContent = 
            `Ερώτηση ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-text').textContent = question.question;
        
        // Update choices
        const choices = ['A', 'B', 'C', 'D'];
        choices.forEach(choice => {
            const choiceElement = document.getElementById(`choice-${choice}`);
            choiceElement.textContent = question.choices[choice];
            
            // Update button selection state
            const choiceBtn = document.querySelector(`[data-choice="${choice}"]`);
            if (this.userAnswers[this.currentQuestionIndex] === choice) {
                choiceBtn.classList.add('selected');
            } else {
                choiceBtn.classList.remove('selected');
            }
        });
        
        this.updateNavigationButtons();
    }

    selectAnswer(choiceBtn) {
        // Clear previous selection
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select new choice
        choiceBtn.classList.add('selected');
        const choice = choiceBtn.getAttribute('data-choice');
        this.userAnswers[this.currentQuestionIndex] = choice;
        
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-answers');
        
        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next/Submit buttons
        const hasAnswer = this.userAnswers[this.currentQuestionIndex] !== null;
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            // Last question
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
            submitBtn.disabled = !this.allQuestionsAnswered();
        } else {
            // Not last question
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.disabled = !hasAnswer;
        }
    }

    allQuestionsAnswered() {
        return this.userAnswers.every(answer => answer !== null);
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateProgress();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
        }
    }

    updateProgress() {
        document.getElementById('progress-text').textContent = 
            `Ερώτηση ${this.currentQuestionIndex + 1} από ${this.questions.length}`;
    }

    submitAnswers() {
        if (!this.allQuestionsAnswered()) {
            alert('Παρακαλώ απαντήστε σε όλες τις ερωτήσεις πριν την υποβολή.');
            return;
        }
        
        this.calculateResults();
        this.showResults();
    }

    calculateResults() {
        let correctAnswers = 0;
        
        this.results = this.questions.map((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.answer;
            
            if (isCorrect) {
                correctAnswers++;
            }
            
            return {
                questionNumber: index + 1,
                question: question.question,
                userAnswer,
                correctAnswer: question.answer,
                isCorrect,
                userAnswerText: question.choices[userAnswer],
                correctAnswerText: question.choices[question.answer]
            };
        });
        
        this.score = {
            correct: correctAnswers,
            total: this.questions.length,
            percentage: Math.round((correctAnswers / this.questions.length) * 100)
        };
    }

    showResults() {
        const modal = document.getElementById('results-modal');
        const scorePercentage = document.getElementById('score-percentage');
        const scoreFraction = document.getElementById('score-fraction');
        const resultsList = document.getElementById('results-list');
        const scoreCircle = document.querySelector('.score-circle');
        
        // Update score display
        scorePercentage.textContent = `${this.score.percentage}%`;
        scoreFraction.textContent = `${this.score.correct}/${this.score.total}`;
        
        // Update score circle color based on performance
        if (this.score.percentage < 60) {
            scoreCircle.classList.add('low-score');
        } else {
            scoreCircle.classList.remove('low-score');
        }
        
        // Display detailed results
        resultsList.innerHTML = '';
        this.results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
            
            let resultHTML = `
                <div class="result-number">${result.questionNumber}.</div>
                <div class="result-details">
                    <div class="result-answer">
                        Η απάντησή σας: ${result.userAnswerText || 'Δεν απαντήθηκε'}
                    </div>
            `;
            
            if (!result.isCorrect) {
                resultHTML += `
                    <div class="result-correct">
                        Σωστή απάντηση: ${result.correctAnswerText}
                    </div>
                `;
            }
            
            resultHTML += '</div>';
            resultItem.innerHTML = resultHTML;
            resultsList.appendChild(resultItem);
        });
        
        modal.classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('results-modal').classList.add('hidden');
    }

    retryTest() {
        this.hideModal();
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
        this.displayQuestion();
        this.updateProgress();
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuizApp();
});