class Level < ApplicationRecord
  validates :name, :format => { :with => /\A[a-zA-Z]+\z/, :message => "Only letters allowed" },
                   :presence => true, :uniqueness =>  { :case_sensitive => false },
                   :length => { :in => 3..20 }

end
