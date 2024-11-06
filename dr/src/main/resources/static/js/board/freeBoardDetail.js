
// 댓글 수정 버튼을 눌렀을 때 실행되는 함수
document.querySelectorAll('.freeBoardDetail-editBtn').forEach(function (button) {
    button.addEventListener('click', function () {
        let commentContainer = button.closest('.freeBoardDetail-comment'); // 부모 댓글 컨테이너 선택
        let commentText = commentContainer.querySelector('.freeBoardDetail-commentText'); // 댓글 텍스트 선택
        let editInput = commentContainer.querySelector('.freeBoardDetail-commentInput'); // 수정 입력창 선택
        let editTextarea = commentContainer.querySelector('textarea'); // textarea 선택
        let buttonGroup = commentContainer.querySelector('.freeBoardDetail-buttonGroup'); // 버튼 그룹 선택

        // 댓글 원본 텍스트를 data-original-text 속성에 저장
        commentText.setAttribute('data-original-text', commentText.innerText);

        // 기존 댓글 텍스트를 textarea에 삽입
        editTextarea.value = commentText.innerText;

        // 댓글 텍스트와 버튼 그룹을 숨기고 수정창을 보이게 함
        commentText.style.display = 'none';
        buttonGroup.style.display = 'none'; // 버튼 그룹 숨김
        editInput.style.display = 'block'; // 수정 입력창 보임
    });
});

// 댓글 수정 취소 버튼을 눌렀을 때 실행되는 함수
document.querySelectorAll('.freeBoardDetail-cancelBtn').forEach(function (button) {
    button.addEventListener('click', function () {
        let boardNumber = document.querySelector('[name="boardNumber"]').value;  // boardNumber 값 가져오기
        window.location.href = '/board/freeBoardDetail?boardNumber=' + boardNumber;  // detail 페이지로 리다이렉트
    });
});



// 댓글 저장 버튼을 눌렀을 때 실행되는 함수
document.querySelectorAll('.freeBoardDetail-saveBtn').forEach(function (button) {
    button.addEventListener('click', function () {
        let commentContainer = button.closest('.freeBoardDetail-comment');
        let replyNumber = commentContainer.querySelector('input[name="replyNumber"]').value;
        let editTextarea = commentContainer.querySelector('textarea').value;

        if (confirm("수정하시겠습니까?")) {
            // AJAX 요청을 통해 서버에 수정된 댓글을 전송
            $.ajax({
                type: 'POST',
                url: '/board/updateReply',  // 서버의 댓글 수정 요청 URL
                data: {
                    replyNumber: replyNumber,
                    replyText: editTextarea
                },
                success: function () {
                    // 페이지를 리다이렉트하여 수정된 댓글을 다시 불러옴
                    window.location.reload(); // 페이지를 새로고침하여 업데이트된 내용 표시
                },
                error: function () {
                    alert("댓글 수정에 실패했습니다.");
                }
            });
        }
    });
});



// 댓글 삭제 버튼을 눌렀을 때 실행되는 함수
document.querySelectorAll('.freeBoardDetail-deleteBtn').forEach(function (button) {
    button.addEventListener('click', function () {
        let replyNumber = button.getAttribute('data-reply-number');
        deleteComment(replyNumber);
    });
});

// 댓글 삭제 함수
function deleteComment(replyNumber) {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
        // AJAX 요청을 통해 서버에 댓글 삭제 요청
        $.ajax({
            type: 'POST',
            url: '/board/deleteReply', // 서버의 댓글 삭제 요청 URL
            data: { replyNumber: replyNumber },
            success: function () {
                alert("댓글이 삭제되었습니다.");
                // 페이지를 새로고침하여 변경 사항 반영
                window.location.reload();
            },
            error: function () {
                alert("댓글 삭제에 실패했습니다.");
            }
        });
    }
}
