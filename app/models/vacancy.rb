class Vacancy < ApplicationRecord
  belongs_to :level
  belongs_to :project
  belongs_to :position

end
