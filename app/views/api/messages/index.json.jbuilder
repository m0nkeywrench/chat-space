json.array! @messages do |message|
  json.text message.text
  json.image asset_path(message.image) #旧コード @message.image.url
  json.created_at message.created_at.to_s
  json.user_name message.user.nickname
  json.id message.id
end