class Project < ApplicationRecord
  validates :title, :format => { :with => /\A[a-zA-Z0-9 ]+\z/, :message => "Only letters allowed" },
            :presence => true, :uniqueness =>  { :case_sensitive => false },
            :length => { :in => 2..35 }

  validates :description, :presence => true

end
