$(function(){
  
  function buildHTML(message) {
    if ( message.image ) {
      var html = `<div class="message">
                    <div class="message__info">
                      <div class="message__info__name">${message.user_name}</div>
                      <div class="message__info__time">${message.created_at}</div>
                    </div>
                    <div class="message__text">${message.text}</div>
                    <img src=${message.image} >
                  </div>`
      return html;
    } else {
      var html = `<div class="message">
                    <div class="message__info">
                      <div class="message__info__name">${message.user_name}</div>
                      <div class="message__info__time">${message.created_at}</div>
                    </div>
                    <div class="message__text">${message.text}</div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false); //失敗後、送信ボタンが押せないのは不便なのでディセーブル解除
    })
  })
})