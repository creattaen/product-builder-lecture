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
    initBirthSelects();
    renderHistory();
    renderMonthlySidebar();
    
    // 이전에 저장된 결과 로드 시 undefined 체크
    try {
        const savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));
        if (savedTodayData && savedTodayData.dayKey) {
            displayTodayResult(savedTodayData);
        }
    } catch (e) {
        console.error("데이터 로드 오류:", e);
        localStorage.removeItem('myTodayData');
    }

    document.getElementById('fortune-modal').addEventListener('click', function(event) {
        if (event.target === this) closeFortuneModal();
    });
};

function initBirthSelects() {
    const yearSelect = document.getElementById('birth-year');
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    
    if (!yearSelect || !monthSelect || !daySelect) return;

    const currentYear = new Date().getFullYear();
    let yearOptions = '<option value="">연도</option>';
    for (let i = currentYear; i >= 1920; i--) yearOptions += `<option value="${i}">${i}년</option>`;
    yearSelect.innerHTML = yearOptions;

    let monthOptions = '<option value="">월</option>';
    for (let i = 1; i <= 12; i++) monthOptions += `<option value="${i}">${i}월</option>`;
    monthSelect.innerHTML = monthOptions;

    let dayOptions = '<option value="">일</option>';
    for (let i = 1; i <= 31; i++) dayOptions += `<option value="${i}">${i}일</option>`;
    daySelect.innerHTML = dayOptions;
}

function checkTodayFortune() {
    const year = document.getElementById('birth-year').value;
    const month = document.getElementById('birth-month').value;
    const day = document.getElementById('birth-day').value;

    if (!year || !month || !day) {
        alert("분석을 위해 생년월일을 모두 선택해주세요! 📅");
        return;
    }

    const birthDateYear = parseInt(year);
    const zodiac = getZodiac(birthDateYear);
    const now = new Date();
    const currentDayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    const savedTodayData = JSON.parse(localStorage.getItem('myTodayData'));
    if (savedTodayData && savedTodayData.dayKey === currentDayKey) {
        alert("오늘의 분석이 이미 완료되었습니다! 🌟");
        displayTodayResult(savedTodayData);
        return;
    }

    const loading = document.getElementById('loading-overlay');
    const resultCard = document.getElementById('today-result-container');
    if (loading) loading.style.display = 'block';
    if (resultCard) resultCard.style.display = 'none';

    setTimeout(() => {
        if (loading) loading.style.display = 'none';
        
        const selected = todayFortunes[Math.floor(Math.random() * todayFortunes.length)];
        const lNum = luckyItems.numbers[Math.floor(Math.random() * luckyItems.numbers.length)];
        const lColor = luckyItems.colors[Math.floor(Math.random() * luckyItems.colors.length)];
        const lDir = luckyItems.directions[Math.floor(Math.random() * luckyItems.directions.length)];
        const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

        const newTodayData = {
            dayKey: currentDayKey,
            zodiac: zodiac || "띠",
            summary: selected.summary || "분석 완료",
            title: selected.title || "행운의 메시지",
            text: selected.text || "",
            score: selected.score || 50,
            lNum: lNum || "-",
            lColor: lColor || "-",
            lDir: lDir || "-",
            timestamp: dateStr
        };

        localStorage.setItem('myTodayData', JSON.stringify(newTodayData));
        displayTodayResult(newTodayData);
        saveToHistory(zodiac, '오늘의', `${newTodayData.summary}: ${newTodayData.text}`);
    }, 2500);
}

function displayTodayResult(data) {
    const container = document.getElementById('today-result-container');
    if (!container) return;
    
    // 모든 필드에 대한 안전한 접근 (undefined 방지)
    const elements = {
        'res-zodiac': data.zodiac,
        'res-date': data.timestamp,
        'res-summary-badge': data.summary,
        'res-title': data.title,
        'today-result-text': data.text,
        'luck-num': data.lNum,
        'luck-color': data.lColor,
        'luck-dir': data.lDir,
        'luck-score-text': (data.score || 0) + "점"
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = value || "-";
    }

    const scoreBar = document.getElementById('luck-score-bar');
    if (scoreBar) scoreBar.style.width = (data.score || 0) + "%";

    container.style.display = 'block';
    container.className = 'result-card pop-in';
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function checkMonthFortune() {
    const year = document.getElementById('birth-year').value;
    if (!year) {
        alert("띠 계산을 위해 생년월일을 먼저 선택해주세요! 📅");
        return;
    }
    const zodiac = getZodiac(parseInt(year));
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    
    const sidebar = document.getElementById('monthly-sidebar');
    const savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));

    if (savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        alert("이미 이달의 분석을 마쳤습니다. 🌙");
        renderMonthlySidebar();
        if (sidebar) sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        zodiac: zodiac || "띠",
        text: selectedText || "분석 결과를 불러올 수 없습니다.",
        displayMonth: now.getMonth() + 1
    };
    localStorage.setItem('myMonthlyData', JSON.stringify(newMonthlyData));

    renderMonthlySidebar();
    saveToHistory(newMonthlyData.zodiac, '이달의', newMonthlyData.text);
    if (sidebar) sidebar.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderMonthlySidebar() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    const savedMonthlyData = JSON.parse(localStorage.getItem('myMonthlyData'));
    const resultBox = document.getElementById('monthly-result-text');

    if (resultBox && savedMonthlyData && savedMonthlyData.monthKey === currentMonthKey) {
        resultBox.innerHTML = `
            <div style="margin-bottom: 12px; font-weight: 800; color: var(--primary);">
                [${savedMonthlyData.zodiac || "분석"}] ${savedMonthlyData.displayMonth || (now.getMonth()+1)}월의 총운
            </div>
            <div style="padding: 20px; border-radius: 16px; font-size: 15px; color: var(--text-main); background: var(--primary-soft); border: 1px solid var(--border);">
                ${savedMonthlyData.text || ""}
            </div>
        `;
    }
}

function saveToHistory(zodiac, periodText, fortuneText) {
    const now = new Date();
    const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newRecord = {
        date: dateString,
        zodiac: zodiac || "띠",
        period: periodText || "기록",
        text: fortuneText || ""
    };

    let history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];
    history.unshift(newRecord);
    if(history.length > 20) history.pop();

    localStorage.setItem('fortuneHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    const history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];

    if (history.length === 0) {
        historyList.innerHTML = "<div style='color:var(--text-sub); text-align:center; padding: 20px;'>아직 기록된 행운이 없습니다.</div>";
        return;
    }

    historyList.innerHTML = history.map(item => {
        const title = `[${item.zodiac || "띠"} ${item.period || "기록"}]`;
        const text = item.text || "";
        const shortenedText = text.length > 25 ? text.substring(0, 25) + '...' : text;
        const fullTextForAttr = text.replace(/"/g, '&quot;');

        return `
            <div class="history-item" data-title="${title}" data-full-text="${fullTextForAttr}">
                <div style="display:flex; flex-direction:column; gap:4px;">
                    <strong style="color:var(--primary); font-size:14px;">${title}</strong> 
                    <span style="font-size:14px; color:var(--text-main);">${shortenedText}</span>
                </div>
                <span style="color:var(--text-sub); font-size:12px;">${item.date || ""}</span>
            </div>
        `;
    }).join('');
}

function openFortuneModal(title, text) {
    const modal = document.getElementById('fortune-modal');
    if (modal) {
        document.getElementById('modal-title').innerText = title || "기록 보기";
        document.getElementById('modal-text').innerText = text || "";
        modal.style.display = 'flex';
    }
}

function closeFortuneModal() {
    const modal = document.getElementById('fortune-modal');
    if (modal) modal.style.display = 'none';
}