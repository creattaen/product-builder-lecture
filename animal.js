// 🐶 AI 동물상 테스트 전용 스크립트 (animal.js)

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/oFwbTa7Ck/"; 

let model;

window.onload = () => {
    // Shared functionality if any
};

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = document.getElementById('face-image');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('upload-label').style.display = 'none';
        
        await predictAnimalLook(img);
    };
    reader.readAsDataURL(file);
}

async function predictAnimalLook(imageElement) {
    document.getElementById('loading-area').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';

    try {
        if (!model) {
            model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        }
        
        const prediction = await model.predict(imageElement);
        
        let dogProb = 0;
        let catProb = 0;

        prediction.forEach(p => {
            if (p.className.includes("강아지") || p.className.toLowerCase().includes("dog")) {
                dogProb = p.probability * 100;
            } else if (p.className.includes("고양이") || p.className.toLowerCase().includes("cat")) {
                catProb = p.probability * 100;
            }
        });

        displayResults(dogProb, catProb);

    } catch (error) {
        console.error("AI 분석 중 오류 발생:", error);
        alert("분석 중 오류가 발생했습니다. 얼굴이 선명한 다른 사진으로 시도해 주세요.");
        retryTest();
    }
}

function displayResults(dog, cat) {
    document.getElementById('loading-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'block';

    const dogBar = document.getElementById('dog-bar');
    const catBar = document.getElementById('cat-bar');
    const dogPercent = document.getElementById('dog-percent');
    const catPercent = document.getElementById('cat-percent');
    const resultMsg = document.getElementById('result-message');

    setTimeout(() => {
        dogBar.style.width = dog + "%";
        catBar.style.width = cat + "%";
        dogPercent.innerText = Math.round(dog) + "%";
        catPercent.innerText = Math.round(cat) + "%";
    }, 100);

    if (dog > cat) {
        resultMsg.innerText = `당신은 귀여운 '강아지상' 이시네요! (확률: ${Math.round(dog)}%) 🐶`;
    } else if (cat > dog) {
        resultMsg.innerText = `당신은 도도한 '고양이상' 이시네요! (확률: ${Math.round(cat)}%) 🐱`;
    } else {
        resultMsg.innerText = "당신은 강아지와 고양이를 모두 닮은 매력적인 얼굴이시네요! ✨";
    }
}

function retryTest() {
    document.getElementById('face-image').src = "";
    document.getElementById('face-image').style.display = 'none';
    document.getElementById('upload-label').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('loading-area').style.display = 'none';
    document.getElementById('file-input').value = "";
}

function toggleContactForm() {
    const container = document.getElementById('contact-container');
    container.classList.toggle('active');
}