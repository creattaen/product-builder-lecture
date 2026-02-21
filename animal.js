// 🐶 AI 동물상 엔진 (animal.js)

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/oFwbTa7Ck/"; 

let model;

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
            // 분석 오버레이 표시
            const overlay = document.getElementById('loading-overlay');
            if(overlay) overlay.style.display = 'flex';

            const steps = ["step-1", "step-2", "step-3"];
            for (let i = 0; i < steps.length; i++) {
                await new Promise(r => setTimeout(r, 800));
                document.getElementById(steps[i]).classList.add('active');
            }

            await predictAnimalLook(img, e.target.result);
        };
    };
    reader.readAsDataURL(file);
}

async function predictAnimalLook(imageElement, base64Image) {
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

        let message = "";
        if (dogProb > catProb) {
            message = `당신은 귀여운 '강아지상' 이시네요! 🐶`;
        } else if (catProb > dogProb) {
            message = `당신은 도도한 '고양이상' 이시네요! 🐱`;
        } else {
            message = "당신은 강아지와 고양이의 매력을 모두 가진 얼굴이네요! ✨";
        }

        const resultData = {
            message,
            dog: dogProb,
            cat: catProb,
            image: base64Image // Store for result page display
        };

        localStorage.setItem('currentAnimalResult', JSON.stringify(resultData));
        
        setTimeout(() => {
            location.href = 'animal-result.html';
        }, 500);

    } catch (error) {
        console.error("AI 분석 중 오류 발생:", error);
        alert("분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
        location.reload();
    }
}

function toggleContactForm() {
    const container = document.getElementById('contact-container');
    if(container) container.classList.toggle('active');
}