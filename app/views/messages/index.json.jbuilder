json.messages @messages.each do |message|
  json.user_name message.user.name
  json.date message.created_at.to_s(:default)
  json.content message.content
  json.image message.image
  json.id message.id
end
