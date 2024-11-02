// 소수점 반올림 함수
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// 음쓰 계산기 함수
function convert() {
    var qnt_kg = document.getElementById("main-qnt").value;

    document.getElementById("main-portion").innerHTML = round(qnt_kg / 0.719, 1) + " 인분";
    document.getElementById("main-co2").innerHTML = round(qnt_kg * 1.7, 1) + " kgCO2eq.";
    document.getElementById("main-tree").innerHTML = round(qnt_kg / 4.87, 1) + " 그루";
    document.getElementById("main-energy").innerHTML = round(qnt_kg * 1.67, 1) + " kWh";
    document.getElementById("main-washingMachine").innerHTML = round(qnt_kg * 12, 1) + " 회";
    document.getElementById("main-transCost").innerHTML = round(qnt_kg * 182, 1) + " 원";
    document.getElementById("main-processCost").innerHTML = round(qnt_kg * 260000, 1) + " 원";
}

// 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
    // 무게 입력 필드에 입력할 때마다 convert 함수가 실행되도록 이벤트 리스너를 추가
    var inputField = document.getElementById("main-qnt");
    inputField.addEventListener("input", convert);
});

// 현재 년, 월 가져오기
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 1 추가

// select 요소를 가져옴
const monthSelect = document.getElementById('main-monthSelect');

// select 기본값 현재 월
document.addEventListener('DOMContentLoaded', function () {
    // 현재 월에 해당하는 option을 선택
    monthSelect.value = `${month}월`;

    // currentYearMonth 처음 값 = monthSelect.value (이번달)
    document.getElementById('currentYearMonth').textContent = `${year}년 ${monthSelect.value} 지역별 가구당 평균 음식물쓰레기 배출량`;

    // // 처음 로드시 공공데이터 불러오기
    // $.ajax({
    //     type: "GET",
    //     url: "/publicData",
    //     contentType: "application/json",
    //     data: ({check: monthSelect.value}),
    //     success: function (publicData) {
    //         alert("불러오기 성공");
    //         console.log(publicData);
    //
    //     },
    //     error: function (){
    //         alert("불러오기 실패");
    //     }
    // })


    // monthSelect의 값이 바뀔 때 currentYearMonth도 업데이트
    monthSelect.addEventListener('change', function () {
        document.getElementById('currentYearMonth').textContent = `${year}년 ${monthSelect.value} 지역별 가구당 평균 음식물쓰레기 배출량`;
        // 공공데이터 비동기 처리
        $.ajax({
            type: "GET",
            url: "/publicData",
            contentType: "application/json",
            data: ({check: monthSelect.value}),
            success: function (publicData) {
                alert("불러오기 성공");
                console.log(publicData);

            },
            error: function (){
                alert("불러오기 실패");
            }
        })
    });


});


// 그래프
const xValues = ["서울시", "경기도", "강원도", "충청도", "경상도", "전라도", "제주도"];
const yValues = [50, 25, 27, 31, 35, 29, 24];
const barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#71491e",
    "#711e66"
];

new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "단위(kg)"
        }
    }
});