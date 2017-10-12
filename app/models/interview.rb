class Interview < ApplicationRecord
  belongs_to :candidate
  belongs_to :vacancy
  belongs_to :user
  belongs_to :rating
end
