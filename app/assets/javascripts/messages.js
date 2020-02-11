$(function(){

  function buildHTML(message) {
    //条件分岐に関係のないhtmlの前半部分を定義
    var messageInfo =  `<div class="message" data-message-id=${message.id}>
                          <div class="message__info">
                            <div class="message__info__name">${message.user_name}</div>
                            <div class="message__info__time">${message.created_at}</div>
                          </div>`;
    //添付画像の有無により、htmlの後半部分を定義
    if ( message.image ) {
      var messageContent = `<div class="message__text">${message.text}</div>
                            <img src=${message.image} >
                          </div>`;
    } else {
      var messageContent = `<div class="message__text">${message.text}</div>
                          </div>`;
    };
    //前半・後半を結合した結果を返す
    var html = messageInfo + messageContent
    return html;
  }
  
  //メッセージの自動更新
  var reloadMessages = function(){
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if ( messages.length !== 0 ){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
  }

  //メッセージ送信時の非同期通信処理
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
      $('.submit-btn').prop('disabled', false);
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})