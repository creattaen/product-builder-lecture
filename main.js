// 🔮 오늘의 운세
const todayFortunes = [
    { text: "예상치 못한 곳에서 행운이 찾아옵니다! 주변을 잘 살펴보세요.", type: "color-good" },
    { text: "오늘은 평범함 속에 행복이 숨어있습니다. 무난하고 평화로운 하루.", type: "color-normal" },
    { text: "조금 피곤할 수 있는 하루입니다. 무리하지 말고 휴식을 취하세요.", type: "color-bad" },
    { text: "귀인을 만날 수 있는 날! 새로운 만남을 피하지 마세요.", type: "color-good" },
    { text: "말실수를 조심해야 하는 날입니다. 한 번 더 생각하고 말하세요.", type: "color-bad" },
    { text: "금전운이 상승하고 있습니다. 소소한 이득이 생길 수 있어요.", type: "color-good" }
];

// 🌙 이달의 운세
const monthFortunes = [
    { text: "이번 달은 당신의 잠재력이 폭발하는 시기입니다. 직장이나 학교에서 주도적으로 프로젝트를 이끌어보세요. 💰재물운도 상승 곡선을 그리니, 예상치 못한 보너스나 부수입을 기대해도 좋습니다. 💖애정운 또한 긍정적이어서 새로운 인연이 닿거나 기존 관계가 더욱 깊어질 것입니다. 다만, 너무 바쁘게 움직이다 위장 건강을 해칠 수 있으니 규칙적인 식사를 꼭 챙기세요.", type: "color-good" },
    { text: "한 템포 쉬어가는 것이 필요한 한 달입니다. 무언가를 억지로 성취하려고 하기보다는 주변을 정돈하고 내면을 다지세요. 🤝인간관계에서 사소한 오해로 약간의 스트레스가 예상되니, 말을 할 때는 한 번 더 생각하는 여유가 필요합니다. 금전적으로는 충동구매를 주의하고 저축에 힘써야 하는 시기입니다. 주말에는 가벼운 산책으로 에너지를 충전하세요.", type: 'color-bad' },
    { text: "그동안 꾸준히 노력했던 일에서 마침내 빛을 보는 멋진 한 달입니다! 🎉성취감이 최고조에 달하며 주변의 인정도 받게 됩니다. 특히 문서운이나 시험운이 아주 좋으니 중요한 계약이나 자격증 시험을 앞두고 있다면 자신감을 가져도 좋습니다. 건강운도 최상이니 평소 배우고 싶었던 스포츠나 취미 활동을 시작하기에 완벽한 타이밍입니다.", type: "color-good" },
    { text: "평온하고 안정적인 일상이 지속되는 달입니다. 큰 기복 없이 무난하게 흘러가지만, 자칫 지루함을 느낄 수 있습니다. 이럴 때는 방 구조를 바꾸거나 새로운 스타일의 옷을 시도해 보는 등 소소한 변화를 주면 운기 상승에 큰 도움이 됩니다. 💳지출 관리에만 조금 신경 쓴다면 금전적으로도 여유로운 한 달을 보낼 수 있습니다.", type: "color-normal" },
    { text: "귀인의 도움이 당신을 향하는 달입니다! 혼자서 해결하기 어려웠던 문제가 있다면 주변의 선배나 지인에게 적극적으로 조언을 구하세요. 💼뜻밖의 기회나 제안이 들어올 수 있으니 마음을 열고 긍정적으로 검토해 보는 것이 좋습니다. 연애운은 천천히 불타오르는 시기이므로 조급해하지 말고 상대방의 페이스에 맞춰주는 배려가 필요합니다.", type: "color-good" }
];

const jackpotFortune = { text: "✨ 대박 운세 ✨\n우주의 기운이 당신을 돕고 있습니다! 로또를 사거나 평소 망설이던 일에 과감하게 도전해보세요!", type: "color-jackpot" };

// 🐶 동물상 AI 모델 (실제 Teachable Machine URL)
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/oFwbTa7Ck/"; 

let model;

window.onload = () => {
    renderHistory();
    renderMonthlySidebar();
    renderTodayFortune();

    document.getElementById('history-list').addEventListener('click', function(event) {
        const historyItem = event.target.closest('.history-item');
        if (historyItem) {
            const title = historyItem.dataset.title;
            const fullText = historyItem.dataset.fullText;
            openFortuneModal(title, fullText);
        }
    });

    document.getElementById('fortune-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeFortuneModal();
        }
    });
};

// --- 동물상 테스트 로직 ---
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
        // 모델 로드 (한 번만 로드하도록 최적화 가능)
        if (!model) {
            model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        }
        
        // 예측 수행
        const prediction = await model.predict(imageElement);
        
        // 결과 처리 (강아지, 고양이 클래스 매핑)
        let dogProb = 0;
        let catProb = 0;

        prediction.forEach(p => {
            if (p.className.includes("강아지") || p.className.toLowerCase().includes("dog")) {
                dogProb = p.probability * 100;
            } else if (p.className.includes("고양이") || p.className.toLowerCase().includes("cat")) {
                catProb = p.probability * 100;
            }
        });

        // 결과 표시
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

    // 바 애니메이션
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

// --- 기존 운세 로직 ---
function checkTodayFortune() {
    const now = new Date();
    const currentDayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    let savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));
    const container = document.getElementById('today-result-container');

    if (savedTodayData && savedTodayData.dayKey === currentDayKey) {
        alert("이미 오늘의 운세를 확인하셨습니다. 내일 다시 찾아와주세요! 🌟");
        container.classList.remove('highlight-red');
        void container.offsetWidth;
        container.classList.add('highlight-red');
        return;
    }

    const zodiac = document.getElementById('zodiac-select').value;
    const isJackpot = Math.random() < 0.07;
    let selected = isJackpot ? jackpotFortune : todayFortunes[Math.floor(Math.random() * todayFortunes.length)];

    const newTodayData = {
        dayKey: currentDayKey,
        zodiac: zodiac,
        text: selected.text,
        type: selected.type
    };
    localStorage.setItem('myTodayData', JSON.stringify(newTodayData));

    renderTodayFortune();
    saveToHistory(zodiac, '오늘의', selected.text);
}

function renderTodayFortune() {
    const now = new Date();
    const currentDayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    let savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));

    if (savedTodayData && savedTodayData.dayKey === currentDayKey) {
        const container = document.getElementById('today-result-container');
        const resultText = document.getElementById('today-result-text');
        
        container.className = ''; 
        void container.offsetWidth; 
        
        resultText.innerText = `[${savedTodayData.zodiac} 오늘의 운세]\n\n${savedTodayData.text}`;
        container.className = `pop-in ${savedTodayData.type}`;
    }
}

function checkMonthFortune() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    
    const sidebar = document.getElementById('monthly-sidebar');
    let savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        alert("이미 이달의 운세를 확인하셨습니다. (매월 1회만 가능) 🌙");
        sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sidebar.classList.add('highlight-red');
        setTimeout(() => sidebar.classList.remove('highlight-red'), 1500);
        return;
    }

    const zodiac = document.getElementById('zodiac-select').value;
    const selected = monthFortunes[Math.floor(Math.random() * monthFortunes.length)];
    
    const newMonthlyData = {
        monthKey: currentMonthKey,
        zodiac: zodiac,
        text: selected.text,
        type: selected.type,
        displayMonth: now.getMonth() + 1
    };
    localStorage.setItem('myMonthlyData', JSON.stringify(newMonthlyData));

    renderMonthlySidebar();
    saveToHistory(zodiac, '이달의', selected.text);
    
    sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    sidebar.classList.add('highlight-red');
    setTimeout(() => sidebar.classList.remove('highlight-red'), 1500);
}

function renderMonthlySidebar() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    let savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));
    const resultBox = document.getElementById('monthly-result-text');

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        resultBox.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold;">
                [${savedMonthlyData.zodiac}] ${savedMonthlyData.displayMonth}월의 운세
            </div>
            <div style="padding: 15px; border-radius: 10px; font-size: 15px; background: rgba(128,128,128,0.1);">
                ${savedMonthlyData.text}
            </div>
        `;
    }
}

function saveToHistory(zodiac, periodText, fortuneText) {
    const now = new Date();
    const dateString = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newRecord = {
        date: dateString,
        zodiac: zodiac,
        period: periodText,
        text: fortuneText
    };

    let history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];
    history.unshift(newRecord);
    if(history.length > 20) history.pop();

    localStorage.setItem('fortuneHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];

    if (history.length === 0) {
        historyList.innerHTML = "<div style='color:#a9a9a9; text-align:center;'>아직 저장된 운세가 없습니다.</div>";
        return;
    }

    historyList.innerHTML = history.map(item => {
        const title = `[${item.zodiac} ${item.period}]`;
        const displayText = item.text.replace('✨ 대박 운세 ✨\n', '✨대박✨ ');
        const shortenedText = displayText.length > 18 ? displayText.substring(0, 18) + '...' : displayText;
        const fullTextForAttr = item.text.replace(/"/g, '&quot;');

        return `
            <div class="history-item" data-title="${title}" data-full-text="${fullTextForAttr}">
                <div>
                    <strong>${title}</strong> 
                    ${shortenedText.split('\n')[0]}
                </div>
                <span class="date">${item.date}</span>
            </div>
        `;
    }).join('');
}

function openFortuneModal(title, text) {
    const modal = document.getElementById('fortune-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    modal.style.display = 'flex';
}

function closeFortuneModal() {
    const modal = document.getElementById('fortune-modal');
    modal.style.display = 'none';
}

function toggleContactForm() {
    const container = document.getElementById('contact-container');
    container.classList.toggle('active');
}