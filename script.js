// ===================== 1. DATA SOAL =====================
const quizData = [
    { question: "Apa arti kata 'Nahwu'?", options: ["Ilmu tanda baca", "Ilmu perubahan kata", "Ilmu susunan kalimat", "Ilmu tajwid"], answer: 2, explanation: "Nahwu adalah ilmu yang membahas susunan kalimat dan kedudukan kata dalam bahasa Arab." },
    { question: "Apa arti kata 'Sharaf'?", options: ["Perubahan bentuk kata", "Makna kata", "Urutan kalimat", "Tanda baca"], answer: 0, explanation: "Sharaf membahas perubahan bentuk kata (morfologi) dalam bahasa Arab." },
    { question: "Apa bentuk jamak dari kata 'kitab'?", options: ["kutub", "katabah", "kutaba", "kattab"], answer: 0, explanation: "Jamak dari 'kitab' adalah 'kutub'." },
    { question: "Apa isim berarti?", options: ["Kata kerja", "Kata benda", "Kata huruf", "Kata sifat"], answer: 1, explanation: "Isim adalah kata benda dalam bahasa Arab." },
    { question: "Apa fi'il berarti?", options: ["Kata kerja", "Kata benda", "Kata sambung", "Kata tunjuk"], answer: 0, explanation: "Fi'il adalah kata kerja." },
    { question: "Apa huruf dalam ilmu nahwu?", options: ["Kata benda", "Kata kerja", "Kata penghubung", "Kata tunjuk"], answer: 2, explanation: "Huruf adalah kata penghubung yang tidak memiliki arti kecuali disertai kata lain." },
    { question: "Apa arti 'Rafa’' dalam nahwu?", options: ["Dibaca fathah", "Dibaca dhammah", "Dibaca kasrah", "Dibaca sukun"], answer: 1, explanation: "Rafa’ adalah keadaan kata yang berharakat dhammah." },
    { question: "Apa arti 'Nasab'?", options: ["Dibaca kasrah", "Dibaca fathah", "Dibaca dhammah", "Dibaca sukun"], answer: 1, explanation: "Nasab berarti keadaan kata yang dibaca fathah." },
    { question: "Apa arti 'Jar'?", options: ["Dibaca dhammah", "Dibaca sukun", "Dibaca kasrah", "Dibaca fathah"], answer: 2, explanation: "Jar berarti kata yang dibaca kasrah." },
    { question: "Apa arti 'Jazm'?", options: ["Dibaca kasrah", "Dibaca sukun", "Dibaca fathah", "Dibaca dhammah"], answer: 1, explanation: "Jazm adalah keadaan kata yang dibaca sukun." },
    { question: "Apa fi’il madhi menunjukkan?", options: ["Peristiwa sekarang", "Peristiwa masa lalu", "Perintah", "Larangan"], answer: 1, explanation: "Fi’il madhi menunjukkan peristiwa yang sudah terjadi (masa lalu)." },
    { question: "Apa fi’il mudhari’ menunjukkan?", options: ["Masa lalu", "Masa depan atau sekarang", "Perintah", "Larangan"], answer: 1, explanation: "Fi’il mudhari’ menunjukkan masa sekarang atau akan datang." },
    { question: "Apa fi’il amr berarti?", options: ["Larangan", "Perintah", "Pertanyaan", "Keterangan"], answer: 1, explanation: "Fi’il amr berarti kata kerja perintah." },
    { question: "Kata 'yaktubu' berarti?", options: ["Dia menulis", "Dia membaca", "Dia makan", "Dia pergi"], answer: 0, explanation: "'Yaktubu' berarti 'dia menulis'." },
    { question: "Kata 'kataba' berarti?", options: ["Dia menulis", "Dia membaca", "Dia duduk", "Dia pergi"], answer: 0, explanation: "'Kataba' berarti 'dia telah menulis'." },
    { question: "Kata 'ukhtub' berarti?", options: ["Tulislah!", "Bacalah!", "Pergilah!", "Duduklah!"], answer: 0, explanation: "'Uktub' adalah fi’il amr yang berarti 'Tulislah!'." },
    { question: "Isim dapat berupa...", options: ["Nama benda", "Nama orang", "Nama tempat", "Semua benar"], answer: 3, explanation: "Isim mencakup nama benda, orang, tempat, waktu, dan lain-lain." },
    { question: "Kata 'al-kitabu' dibaca rafa’ karena...", options: ["Sebagai subjek", "Sebagai objek", "Sebagai huruf jar", "Sebagai keterangan"], answer: 0, explanation: "‘Al-kitabu’ dibaca rafa’ karena berfungsi sebagai subjek." },
    { question: "Kata 'fil madrosati' menunjukkan?", options: ["Dalam sekolah", "Ke sekolah", "Dari sekolah", "Sekolah besar"], answer: 0, explanation: "'Fi' berarti 'di dalam', sehingga 'fil madrosati' berarti 'di sekolah'." },
    { question: "‘Bismillah’ terdiri dari huruf apa?", options: ["Ba’ jar", "Isim majrur", "Keduanya benar", "Tidak ada huruf jar"], answer: 2, explanation: "'Bismillah' terdiri dari huruf jar (ba’) dan isim majrur (ismillah)." },
];

// ===================== 2. VARIABEL =====================
let currentQuestionIndex = 0;
let score = 0;
let participantName = '';
let participantAnswers = Array(quizData.length).fill(null);
const totalQuestions = quizData.length;

// ===================== 3. ELEMENT DOM =====================
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const nameForm = document.getElementById('name-form');
const initialInput = document.getElementById('initial-input');
const questionContainer = document.getElementById('question-container');
const questionCounter = document.getElementById('question-counter');
const nextButton = document.getElementById('next-button');
const submissionForm = document.getElementById('submission-form');
const exitButton = document.getElementById('exit-button');
const menuButton = document.getElementById('menu-button');
const submissionStatus = document.getElementById('submission-status');

// ===================== 4. FUNGSI =====================
function changeScreen(show) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
    show.classList.remove('hidden');
    setTimeout(() => show.classList.add('active'), 10);
}

function loadQuestion() {
    const q = quizData[currentQuestionIndex];
    questionCounter.textContent = `Soal ${currentQuestionIndex + 1} / ${totalQuestions}`;
    nextButton.textContent = (currentQuestionIndex === totalQuestions - 1) ? "Lihat Hasil" : "Lanjut";
    nextButton.disabled = true;

    questionContainer.innerHTML = `
        <p class="question-text">${q.question}</p>
        ${q.options.map((opt, i) => `<div class="option" data-index="${i}">${String.fromCharCode(65+i)}. ${opt}</div>`).join('')}
        <div id="explanation-box" class="info-text" style="display:none;margin-top:10px;font-style:italic;"></div>
    `;

    document.querySelectorAll('.option').forEach(opt => opt.addEventListener('click', handleAnswer));
}

function handleAnswer(e) {
    const q = quizData[currentQuestionIndex];
    const selected = e.currentTarget;
    const selectedIndex = parseInt(selected.dataset.index);
    const correctIndex = q.answer;
    const explanationBox = document.getElementById('explanation-box');
    participantAnswers[currentQuestionIndex] = selectedIndex;
    document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedIndex === correctIndex) {
        selected.style.backgroundColor = '#d4edda';
        selected.style.borderColor = '#28a745';
        score++;
        explanationBox.innerHTML = `✅ Benar! ${q.explanation}`;
    } else {
        selected.style.backgroundColor = '#f8d7da';
        selected.style.borderColor = '#dc3545';
        document.querySelector(`.option[data-index="${correctIndex}"]`).style.backgroundColor = '#d4edda';
        document.querySelector(`.option[data-index="${correctIndex}"]`).style.borderColor = '#28a745';
        explanationBox.innerHTML = `❌ Salah. ${q.explanation}`;
    }

    explanationBox.style.display = 'block';
    nextButton.disabled = false;
}

function calculateResults() {
    const correctList = quizData
        .map((q, i) => (participantAnswers[i] === q.answer ? i + 1 : null))
        .filter(Boolean);

    document.getElementById('result-name').textContent = participantName;
    document.getElementById('result-score').textContent = `${score} / ${totalQuestions}`;
    document.getElementById('result-correct-count').textContent = score;
    document.getElementById('result-correct-list').textContent = correctList.join(', ');

    document.getElementById('form-name').value = participantName;
    document.getElementById('form-score').value = `${score}/${totalQuestions}`;
    document.getElementById('form-correct-list').value = correctList.join(', ');
    submissionForm.submit();

    changeScreen(resultScreen);
    submissionStatus.textContent = '✅ Hasil Berhasil Dikirim!';
}

// ===================== 5. EVENT =====================
nameForm.addEventListener('submit', e => {
    e.preventDefault();
    participantName = initialInput.value.trim();
    if (participantName) {
        changeScreen(quizScreen);
        loadQuestion();
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        calculateResults();
    }
});

exitButton.addEventListener('click', () => window.location.href = 'https://instagram.com/assabah07');
menuButton.addEventListener('click', () => window.location.href = 'https://ppfhas-sabah.github.io/laman_quizz/');

changeScreen(startScreen);
