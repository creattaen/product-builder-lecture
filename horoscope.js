// 🔮 띠별 운세 전용 스크립트 (horoscope.js)

const todayFortunes = [
    { summary: "대길(大吉) - 기분 좋은 행운의 날", text: "예상치 못한 곳에서 소중한 인연이나 행운이 찾아옵니다. 오늘 당신의 직감을 믿고 과감하게 행동해보세요. 주변 사람들과의 대화 속에서 큰 힌트를 얻을 수 있습니다.", type: "color-good" },
    { summary: "평온(平穩) - 소소한 행복이 깃든 날", text: "오늘은 평범함 속에 행복이 숨어있습니다. 무리하게 일을 추진하기보다 주변을 정리하며 내실을 다지는 시간을 가져보세요. 따뜻한 차 한 잔이 큰 위로가 됩니다.", type: "color-normal" },
    { summary: "신중(愼重) - 한 템포 쉬어가는 날", text: "조금 피곤할 수 있는 하루입니다. 무리한 일정은 피하고 충분한 휴식을 취하는 것이 좋습니다. 지금의 인내가 조만간 큰 보상으로 돌아올 것입니다.", type: "color-bad" },
    { summary: "인연(因緣) - 귀인을 만나는 날", text: "귀인을 만날 수 있는 좋은 운의 흐름입니다. 새로운 만남을 주저하지 마세요. 당신의 친절한 태도가 상대방에게 깊은 인상을 남겨 긍정적인 결과로 이어집니다.", type: "color-good" },
    { summary: "성찰(省察) - 말을 아껴야 하는 날", text: "말실수를 조심해야 하는 날입니다. 특히 가까운 사이일수록 예의를 지키고, 한 번 더 생각한 후 말을 꺼내세요. 침묵이 오히려 득이 되는 순간이 많습니다.", type: "color-bad" },
    { summary: "재물(財物) - 금전운이 트이는 날", text: "금전운이 상승하고 있습니다. 소소한 이득이 생기거나 계획했던 소비에서 만족감을 얻을 수 있습니다. 투자를 고려 중이라면 오늘은 정보를 모으기에 최적의 날입니다.", type: "color-good" }
];

const luckyItems = {
    numbers: ["1", "3", "7", "8", "9", "11", "24"],
    colors: ["Indigo", "Soft Pink", "Emerald Green", "Clean White", "Deep Blue", "Amber"],
    directions: ["동쪽", "서쪽", "남쪽", "북쪽", "북동쪽", "남서쪽"]
};

window.onload = () => {
    renderHistory();
    renderMonthlySidebar();
    
    // 이전에 저장된 결과가 있다면 불러오기
    const savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));
    if (savedTodayData) {
        displayTodayResult(savedTodayData);
    }

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

function checkTodayFortune() {
    const zodiac = document.getElementById('zodiac-select').value;
    const birthDate = document.getElementById('birth-date').value;

    if (!birthDate) {
        alert("더 디테일한 분석을 위해 생년월일을 선택해주세요! 📅");
        return;
    }

    const now = new Date();
    const currentDayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    let savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));

    if (savedTodayData && savedTodayData.dayKey === currentDayKey) {
        alert("이미 오늘의 운세 분석을 마쳤습니다. 내일의 행운을 기대해주세요! 🌟");
        const container = document.getElementById('today-result-container');
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // 분석 중 애니메이션 보여주기
    const loading = document.getElementById('loading-overlay');
    const resultCard = document.getElementById('today-result-container');
    loading.style.display = 'block';
    resultCard.style.display = 'none';

    setTimeout(() => {
        loading.style.display = 'none';
        
        const selected = todayFortunes[Math.floor(Math.random() * todayFortunes.length)];
        const lNum = luckyItems.numbers[Math.floor(Math.random() * luckyItems.numbers.length)];
        const lColor = luckyItems.colors[Math.floor(Math.random() * luckyItems.colors.length)];
        const lDir = luckyItems.directions[Math.floor(Math.random() * luckyItems.directions.length)];

        const newTodayData = {
            dayKey: currentDayKey,
            zodiac: zodiac,
            birth: birthDate,
            summary: selected.summary,
            text: selected.text,
            type: selected.type,
            lNum: lNum,
            lColor: lColor,
            lDir: lDir,
            timestamp: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
        };

        localStorage.setItem('myTodayData', JSON.stringify(newTodayData));
        displayTodayResult(newTodayData);
        saveToHistory(zodiac, '오늘의', `${selected.summary}: ${selected.text}`);
    }, 2000); // 2초간 분석하는 척 함
}

function displayTodayResult(data) {
    const container = document.getElementById('today-result-container');
    
    document.getElementById('res-zodiac').innerText = data.zodiac;
    document.getElementById('res-date').innerText = data.timestamp;
    document.getElementById('res-summary').innerText = data.summary;
    document.getElementById('today-result-text').innerText = data.text;
    document.getElementById('luck-num').innerText = data.lNum;
    document.getElementById('luck-color').innerText = data.lColor;
    document.getElementById('luck-dir').innerText = data.lDir;

    container.style.display = 'block';
    container.className = 'result-card pop-in';
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderTodayFortune() {
    // window.onload에서 이미 처리함
}

function checkMonthFortune() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    
    const sidebar = document.getElementById('monthly-sidebar');
    let savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        alert("이미 이달의 총운 분석을 마쳤습니다. 🌙");
        sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const zodiac = document.getElementById('zodiac-select').value;
    const monthFortunes = [
        "이번 달은 당신의 잠재력이 폭발하는 시기입니다. 직장이나 학교에서 주도적으로 프로젝트를 이끌어보세요. 💰재물운도 상승 곡선을 그리니, 예상치 못한 보너스를 기대해도 좋습니다.",
        "한 템포 쉬어가는 것이 필요한 한 달입니다. 무언가를 억지로 성취하려고 하기보다는 주변을 정돈하고 내면을 다지세요. 🤝인간관계에서 사소한 오해로 약간의 스트레스가 예상됩니다.",
        "그동안 꾸준히 노력했던 일에서 마침내 빛을 보는 멋진 한 달입니다! 🎉성취감이 최고조에 달하며 주변의 인정도 받게 됩니다. 특히 문서운이나 시험운이 아주 좋습니다."
    ];
    const selectedText = monthFortunes[Math.floor(Math.random() * monthFortunes.length)];
    
    const newMonthlyData = {
        monthKey: currentMonthKey,
        zodiac: zodiac,
        text: selectedText,
        displayMonth: now.getMonth() + 1
    };
    localStorage.setItem('myMonthlyData', JSON.stringify(newMonthlyData));

    renderMonthlySidebar();
    saveToHistory(zodiac, '이달의', selectedText);
    sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderMonthlySidebar() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    let savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));
    const resultBox = document.getElementById('monthly-result-text');

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        resultBox.innerHTML = `
            <div style="margin-bottom: 12px; font-weight: 800; color: var(--primary);">
                [${savedMonthlyData.zodiac}] ${savedMonthlyData.displayMonth}월의 총운
            </div>
            <div style="padding: 20px; border-radius: 16px; font-size: 15px; color: var(--text-main); background: var(--primary-soft); border: 1px solid var(--border);">
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
        historyList.innerHTML = "<div style='color:var(--text-sub); text-align:center; padding: 20px;'>아직 기록된 행운이 없습니다.</div>";
        return;
    }

    historyList.innerHTML = history.map(item => {
        const title = `[${item.zodiac} ${item.period}]`;
        const shortenedText = item.text.length > 25 ? item.text.substring(0, 25) + '...' : item.text;
        const fullTextForAttr = item.text.replace(/"/g, '&quot;');

        return `
            <div class="history-item" data-title="${title}" data-full-text="${fullTextForAttr}">
                <div style="display:flex; flex-direction:column; gap:4px;">
                    <strong style="color:var(--primary); font-size:14px;">${title}</strong> 
                    <span style="font-size:14px; color:var(--text-main);">${shortenedText}</span>
                </div>
                <span style="color:var(--text-sub); font-size:12px;">${item.date}</span>
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