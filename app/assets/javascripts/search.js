$(function() {
  function appendUsers(user) {
    const html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">
                    ${ user.name }
                  </p>
                  <p class="chat-group-user__btn chat-group-user__btn--add" data-id = ${ user.id } data-name = ${ user.name }>
                    追加
                  </p>
                </div>`;
    $('#user-search-result').append(html);
  }

  function notUser() {
    const html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">
                    検索結果はありません。
                  </p>
                </div>`;
    $('#user-search-result').append(html);
  }

  function appendMembers(user_name, user_id) {
    const html = `<div class="chat-group-user">
                  <input type = "hidden", value = ${ user_id }, name = "group[user_ids][]", id ="group_user_ids_${user_id}">
                  <p class="chat-group-user__name">
                    ${user_name}
                  </p>
                  <p class="chat-group-user__btn chat-group-user__btn--remove">
                    削除
                  </p>
                </div>`;
    $('#chat-group-users').append(html);
  }

  //インクリメンタルサーチ開始
  $('.chat-group-form__input').on('input', function() {
    $('#user-search-result').children().remove();
    const user = $('#user-search-field').val();
    const group_id = $('.chat__group_id').val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { user: user, groupId: group_id },
        dataType: 'json'
      })
    .done(function(users) {
        $('#user_search_result').empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUsers(user);
            })
          } else {
            notUser();
          }
       })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  // ユーザーを追加
  $('#user-search-result').on('click', '.chat-group-user__btn--add', function() {
    const user_name = $(this).data('name');
    const user_id = $(this).data('id');
    $(this).parent().remove();
    const html = appendMembers(user_name, user_id);
  });

  // ユーザーを削除
  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});
