// 🔮 띠별 운세 엔진 (horoscope.js)

const fortuneTexts = [
    { summary: "대길(大吉)", title: "만사형통의 날", text: "하늘의 기운이 당신을 향해 있습니다. 평소 미뤄두었던 중요한 결정이나 새로운 시작을 하기에 완벽한 타이밍입니다. 과감하게 움직이세요." },
    { summary: "희소식(喜消息)", title: "반가운 소식의 날", text: "멀리서 반가운 소식이 들려오거나 잊고 지냈던 인연에게 연락이 올 수 있습니다. 마음을 열고 소통하면 예상치 못한 기회가 찾아옵니다." },
    { summary: "평온(平穩)", title: "내실을 다지는 날", text: "오늘은 무리한 확장보다 현재의 위치를 점검하고 내실을 다지는 것이 좋습니다. 주변 사람들과 따뜻한 한 끼 식사가 운을 높여줍니다." },
    { summary: "신중(愼重)", title: "지혜가 필요한 날", text: "생각지 못한 변수가 생길 수 있으니 서두르지 마세요. 돌다리도 두드려보고 건너는 마음가짐이 필요합니다. 인내가 곧 성공의 열쇠입니다." },
    { summary: "재물(財物)", title: "금전운 상승의 날", text: "금전적인 흐름이 매우 좋습니다. 작은 투자가 큰 성과로 돌아오거나 막혔던 자금 흐름이 원활해지는 시기입니다. 꼼꼼한 가계부 정리를 추천합니다." },
    { summary: "인연(因緣)", title: "귀인을 만나는 날", text: "당신을 도와줄 소중한 조력자가 나타납니다. 겸손한 자세로 조언을 구하면 해결되지 않던 문제의 실마리를 찾게 될 것입니다." }
];

const colors = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라", "검정", "흰색"];
const directions = ["위", "아래", "왼쪽", "오른쪽"];

// 🎂 생년월일로 띠 계산 (deterministic)
function getZodiac(year) {
    const zodiacs = ["원숭이띠", "닭띠", "개띠", "돼지띠", "쥐띠", "소띠", "호랑이띠", "토끼띠", "용띠", "뱀띠", "말띠", "양띠"];
    return zodiacs[year % 12];
}

// 🔑 입력값 기반 해시 생성 (결과값이 입력에 따라 달라지게 함)
function getHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; 
    }
    return Math.abs(hash);
}

window.onload = () => {
    if (document.getElementById('birth-year')) {
        initBirthSelects();
        const savedNickname = localStorage.getItem('userNickname');
        if (savedNickname) document.getElementById('user-nickname').value = savedNickname;
    }
    
    // 결과 페이지나 다른 페이지에서 히스토리 렌더링
    renderHistory();
    renderMonthlySidebar();
};

function initBirthSelects() {
    const yearSelect = document.getElementById('birth-year');
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    if (!yearSelect) return;

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

async function startFortuneAnalysis() {
    const nickname = document.getElementById('user-nickname').value.trim();
    const year = document.getElementById('birth-year').value;
    const month = document.getElementById('birth-month').value;
    const day = document.getElementById('birth-day').value;

    if (!nickname || !year || !month || !day) {
        alert("모든 정보를 입력해주셔야 정밀한 분석이 가능합니다! ✨");
        return;
    }

    localStorage.setItem('userNickname', nickname);
    const birthStr = `${year}${month}${day}`;
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const seed = getHashCode(nickname + birthStr + todayStr);

    // 🌌 분석 애니메이션 시작
    const overlay = document.getElementById('analysis-overlay');
    overlay.style.display = 'flex';

    const steps = ["step-1", "step-2", "step-3"];
    for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 1000));
        document.getElementById(steps[i]).classList.add('active');
    }

    // 데이터 생성 (결정론적 랜덤)
    const fortuneIdx = seed % fortuneTexts.length;
    const luckScore = 60 + (seed % 41); // 60~100점
    const luckNum = (seed % 100) + 1; // 1~100
    const luckColor = colors[seed % colors.length];
    const luckDir = directions[seed % directions.length];
    const zodiac = getZodiac(parseInt(year));
    
    const resultData = {
        nickname,
        zodiac,
        timestamp: new Date().toLocaleDateString('ko-KR').slice(0, -1),
        summary: fortuneTexts[fortuneIdx].summary,
        title: fortuneTexts[fortuneIdx].title,
        text: fortuneTexts[fortuneIdx].text,
        score: luckScore,
        lNum: luckNum,
        lColor: luckColor,
        lDir: luckDir
    };

    localStorage.setItem('currentFortuneResult', JSON.stringify(resultData));
    saveToHistory(zodiac, '오늘의', `${nickname}님: ${resultData.summary}`);

    setTimeout(() => {
        location.href = 'horoscope-result.html';
    }, 1000);
}

// 히스토리 및 사이드바 로직 (기존 유지)
function saveToHistory(zodiac, period, text) {
    let history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];
    const date = new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    history.unshift({ zodiac, period, text, date });
    if (history.length > 10) history.pop();
    localStorage.setItem('fortuneHistory', JSON.stringify(history));
}

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    const history = JSON.parse(localStorage.getItem('fortuneHistory')) || [];
    if (history.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-sub);">아직 기록이 없습니다.</p>';
        return;
    }
    list.innerHTML = history.map(h => `
        <div class="history-item">
            <div style="display:flex; flex-direction:column;">
                <span style="font-weight:800; color:var(--primary); font-size:13px;">[${h.zodiac}] ${h.period}</span>
                <span style="font-size:14px; margin-top:2px;">${h.text}</span>
            </div>
            <span style="font-size:11px; color:var(--text-sub);">${h.date}</span>
        </div>
    `).join('');
}

function renderMonthlySidebar() {
    const box = document.getElementById('monthly-result-text');
    if (!box) return;
    const data = JSON.parse(localStorage.getItem('currentFortuneResult'));
    if (data) {
        box.innerHTML = `
            <div style="font-weight:800; color:var(--text-main); font-size:18px;">${data.nickname}님</div>
            <div style="font-size:13px; font-weight:700; color:var(--primary); margin-bottom:12px;">[${data.zodiac}] 이번 달 기운</div>
            <div style="padding:16px; background:var(--primary-soft); border-radius:12px; font-size:14px; line-height:1.6;">
                이달의 분석 데이터가 곧 업데이트 됩니다.
            </div>
        `;
    }
}

function openFortuneModal(title, text) {
    const modal = document.getElementById('fortune-modal');
    if (modal) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-text').innerText = text;
        modal.style.display = 'flex';
    }
}

function closeFortuneModal() {
    const modal = document.getElementById('fortune-modal');
    if (modal) modal.style.display = 'none';
}