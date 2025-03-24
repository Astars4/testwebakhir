// Menu Handling
function handleMenu(menu) {
  const contents = document.querySelectorAll("#output .content-section");
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
  document.getElementById(`${menu}Content`).classList.remove("hidden");

  if (menu === "quiz") resetQuiz();
  if (menu === "timeline") showSlide(0);
}

// Material Detail Functions
const materi = {
  proklamasi:
    "Proklamasi Kemerdekaan Indonesia dilaksanakan pada hari Jumat, 17 Agustus 1945...",
  diponegoro:
    "Perang Diponegoro atau Perang Jawa adalah perang besar dan berlangsung selama lima tahun...",
  reformasi:
    "Reformasi 1998 adalah gerakan reformasi di Indonesia yang dimulai pada tahun 1998...",
};

function showDetail(topic) {
  document.getElementById("detailTitle").textContent = topic.replace("_", " ");
  document.getElementById("detailContent").textContent =
    materi[topic] || "Konten belum tersedia.";
  document.getElementById("detailMateri").classList.remove("hidden");
}

function hideDetail() {
  document.getElementById("detailMateri").classList.add("hidden");
}

// Quiz Functions
const quizData = [
  {
    question: "Siapa yang membacakan teks Proklamasi Kemerdekaan Indonesia?",
    options: ["Soekarno", "Mohammad Hatta", "Sutan Sjahrir", "Bung Tomo"],
    answer: "Soekarno",
  },
  // ... other quiz questions
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  const questionData = quizData[currentQuestion];

  quizContainer.innerHTML = `
    <h3 class="question-text">${questionData.question}</h3>
    <div class="options-container">
      ${questionData.options
        .map(
          (option) => `
        <button onclick="selectAnswer('${option}')" class="option-button">
          ${option}
        </button>
      `
        )
        .join("")}
    </div>
  `;
}

function selectAnswer(selectedOption) {
  const correctAnswer = quizData[currentQuestion].answer;
  const buttons = document.querySelectorAll("#quizContainer .option-button");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct-answer");
    } else if (button.textContent === selectedOption) {
      button.classList.add("wrong-answer");
    }
  });

  if (selectedOption === correctAnswer) score++;

  setTimeout(() => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("quizResult").classList.remove("hidden");
  document.getElementById(
    "resultText"
  ).textContent = `Anda menjawab ${score} dari ${quizData.length} pertanyaan dengan benar.`;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
  loadQuestion();
}

// Slider Functions
const slides = document.querySelectorAll(".slider-container .slide");
let currentSlideIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.style.transform = "translate(0, 0)";
  });

  currentSlideIndex = index;

  if (currentSlideIndex === 0) {
    slides[0].style.transform = "translateX(0)";
    slides[1].style.transform = "translateX(100%)";
    slides[2].style.transform = "translateY(100%)";
    slides[3].style.transform = "translateX(-100%)";
  } else if (currentSlideIndex === 1) {
    slides[0].style.transform = "translateX(-100%)";
    slides[1].style.transform = "translateX(0)";
  } else if (currentSlideIndex === 2) {
    slides[0].style.transform = "translateY(-100%)";
    slides[2].style.transform = "translateY(0)";
  } else if (currentSlideIndex === 3) {
    slides[0].style.transform = "translateX(100%)";
    slides[3].style.transform = "translateX(0)";
  }
}

// Year Selector
document.getElementById("yearMenu").addEventListener("change", function () {
  const selectedYear = this.value;
  document.querySelectorAll(".year-slide").forEach((slide) => {
    slide.classList.remove("active");
  });
  document.getElementById(`yearSlide${selectedYear}`).classList.add("active");
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") showSlide(1);
  else if (e.key === "ArrowDown") showSlide(2);
  else if (e.key === "ArrowLeft") showSlide(3);
  else if (e.key === "ArrowUp") showSlide(0);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  loadQuestion();
});
