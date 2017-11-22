class Interview < ApplicationRecord
  belongs_to :candidate
  belongs_to :vacancy
  belongs_to :user
  #belongs_to :rating
  has_many :feedbacks, dependent: :destroy
  validates :user_id, :presence => true
end
