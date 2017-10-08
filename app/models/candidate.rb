class Candidate < ApplicationRecord
  belongs_to :level
  belongs_to :position
  mount_base64_uploader :cv, DocumentUploader

  validates :name, :format => { :with => /\A[a-zA-Z]+\z/, :message => "Only letters allowed" },
            :presence => true,
            :length => { :in => 2..20 }

  validates :surname, :format => { :with => /\A[a-zA-Z]+\z/, :message => "Only letters allowed" },
            :presence => true,
            :length => { :in => 2..20 }

  validates :contacts, :presence => true

end
