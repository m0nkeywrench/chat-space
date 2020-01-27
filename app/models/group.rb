class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_latest_message
    if (last_message = messages.last).present?
      if last_message.text?
        last_message.text
      else
        "画像が投稿されています"
      end
    else
      "まだメッセージはありません"
    end
  end

  def get_members
    members = ""
    users.each do |member|
      members += member.nickname
      members += " "
    end
    return members
  end
end
