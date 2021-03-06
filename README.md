# README

# chat-space DB設計
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|references|null: false, foreign_key true|
|group_id|references|null: false, foreign_key true|
### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key true|
|user_id|references|null: false, foreign_key true|
### Association
- belongs_to :group
- belongs_to :user