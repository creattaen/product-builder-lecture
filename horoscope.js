// 🔮 띠별 운세 고도화 스크립트 (horoscope.js)

const todayFortunes = [
    { summary: "대길(大吉)", title: "만사형통의 날", text: "하늘의 기운이 당신을 향해 있습니다. 평소 미뤄두었던 중요한 결정이나 새로운 시작을 하기에 완벽한 타이밍입니다. 과감하게 움직이세요.", score: 95 },
    { summary: "희소식(喜消息)", title: "반가운 소식의 날", text: "멀리서 반가운 소식이 들려오거나 잊고 지냈던 인연에게 연락이 올 수 있습니다. 마음을 열고 소통하면 예상치 못한 기회가 찾아옵니다.", score: 85 },
    { summary: "평온(平穩)", title: "내실을 다지는 날", text: "오늘은 무리한 확장보다 현재의 위치를 점검하고 내실을 다지는 것이 좋습니다. 주변 사람들과 따뜻한 한 끼 식사가 운을 높여줍니다.", score: 70 },
    { summary: "신중(愼重)", title: "지혜가 필요한 날", text: "생각지 못한 변수가 생길 수 있으니 서두르지 마세요. 돌다리도 두드려보고 건너는 마음가짐이 필요합니다. 인내가 곧 성공의 열쇠입니다.", score: 55 },
    { summary: "재물(財物)", title: "금전운 상승의 날", text: "금전적인 흐름이 매우 좋습니다. 작은 투자가 큰 성과로 돌아오거나 막혔던 자금 흐름이 원활해지는 시기입니다. 꼼꼼한 가계부 정리를 추천합니다.", score: 90 },
    { summary: "인연(因緣)", title: "귀인을 만나는 날", text: "당신을 도와줄 소중한 조력자가 나타납니다. 겸손한 자세로 조언을 구하면 해결되지 않던 문제의 실마리를 찾게 될 것입니다.", score: 80 }
];

const luckyItems = {
    numbers: ["1", "3", "7", "8", "9", "11", "24"],
    colors: ["Indigo", "Soft Pink", "Emerald Green", "Clean White", "Deep Blue", "Amber"],
    directions: ["동쪽", "서쪽", "남쪽", "북쪽", "북동쪽", "남서쪽"]
};

// 🎂 생년월일로 띠 계산하는 함수
function getZodiac(year) {
    const zodiacs = ["원숭이띠", "닭띠", "개띠", "돼지띠", "쥐띠", "소띠", "호랑이띠", "토끼띠", "용띠", "뱀띠", "말띠", "양띠"];
    return zodiacs[year % 12];
}

window.onload = () => {
    renderHistory();
    renderMonthlySidebar();
    
    const savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));
    if (savedTodayData) {
        displayTodayResult(savedTodayData);
    }

    document.getElementById('fortune-modal').addEventListener('click', function(event) {
        if (event.target === this) closeFortuneModal();
    });
};

function checkTodayFortune() {
    const birthDateValue = document.getElementById('birth-date').value;

    if (!birthDateValue) {
        alert("분석을 위해 생년월일을 선택해주세요! 📅");
        return;
    }

    const birthDate = new Date(birthDateValue);
    const zodiac = getZodiac(birthDate.getFullYear());
    const now = new Date();
    const currentDayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    let savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));

    if (savedTodayData && savedTodayData.dayKey === currentDayKey) {
        alert("오늘의 분석이 이미 완료되었습니다! 🌟");
        displayTodayResult(savedTodayData);
        return;
    }

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
        const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

        const newTodayData = {
            dayKey: currentDayKey,
            zodiac: zodiac,
            summary: selected.summary,
            title: selected.title,
            text: selected.text,
            score: selected.score,
            lNum: lNum,
            lColor: lColor,
            lDir: lDir,
            timestamp: dateStr
        };

        localStorage.setItem('myTodayData', JSON.stringify(newTodayData));
        displayTodayResult(newTodayData);
        saveToHistory(zodiac, '오늘의', `${selected.summary}: ${selected.text}`);
    }, 2500);
}

function displayTodayResult(data) {
    const container = document.getElementById('today-result-container');
    
    // undefined 방지 및 데이터 삽입
    document.getElementById('res-zodiac').innerText = data.zodiac || "운세";
    document.getElementById('res-date').innerText = data.timestamp || "";
    document.getElementById('res-summary-badge').innerText = data.summary || "분석 완료";
    document.getElementById('res-title').innerText = data.title || "행운의 메시지";
    document.getElementById('today-result-text').innerText = data.text || "오늘의 운세를 확인해보세요.";
    document.getElementById('luck-num').innerText = data.lNum || "-";
    document.getElementById('luck-color').innerText = data.lColor || "-";
    document.getElementById('luck-dir').innerText = data.lDir || "-";

    // 인포그래픽 게이지 바 업데이트
    const scoreBar = document.getElementById('luck-score-bar');
    const scoreText = document.getElementById('luck-score-text');
    if (scoreBar && scoreText) {
        scoreBar.style.width = (data.score || 50) + "%";
        scoreText.innerText = (data.score || 50) + "점";
    }

    container.style.display = 'block';
    container.className = 'result-card pop-in';
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function checkMonthFortune() {
    const birthDateValue = document.getElementById('birth-date').value;
    if (!birthDateValue) {
        alert("띠 계산을 위해 생년월일을 먼저 선택해주세요! 📅");
        return;
    }
    const birthDate = new Date(birthDateValue);
    const zodiac = getZodiac(birthDate.getFullYear());

    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    
    const sidebar = document.getElementById('monthly-sidebar');
    let savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        alert("이미 이달의 분석을 마쳤습니다. 🌙");
        renderMonthlySidebar();
        sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const monthFortunesList = [
        "이번 달은 당신의 잠재력이 폭발하는 시기입니다. 직장이나 학교에서 주도적으로 프로젝트를 이끌어보세요. 💰재물운도 상승 곡선을 그리니, 예상치 못한 보너스를 기대해도 좋습니다.",
        "한 템포 쉬어가는 것이 필요한 한 달입니다. 무언가를 억지로 성취하려고 하기보다는 주변을 정돈하고 내면을 다지세요. 🤝인간관계에서 사소한 오해로 약간의 스트레스가 예상됩니다.",
        "그동안 꾸준히 노력했던 일에서 마침내 빛을 보는 멋진 한 달입니다! 🎉성취감이 최고조에 달하며 주변의 인정도 받게 됩니다. 특히 문서운이나 시험운이 아주 좋습니다."
    ];
    const selectedText = monthFortunesList[Math.floor(Math.random() * monthFortunesList.length)];
    
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
    const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    
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