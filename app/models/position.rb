class Position < ApplicationRecord
  validates :name, :format => { :with => /\A[a-zA-Z]+\z/, :message => "Only letters allowed" },
            :presence => true, :uniqueness =>  { :case_sensitive => false },
            :length => { :in => 2..20 }
end
