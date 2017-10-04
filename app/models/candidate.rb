class Candidate < ApplicationRecord
  belongs_to :level
  belongs_to :position
  mount_base64_uploader :cv, DocumentUploader
end
