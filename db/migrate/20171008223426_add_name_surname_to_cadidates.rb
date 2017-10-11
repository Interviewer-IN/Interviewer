class AddNameSurnameToCadidates < ActiveRecord::Migration[5.1]
  def change
    add_column :candidates, :name, :string
    add_column :candidates, :surname, :string

    Candidate.find_each do |candidate|
      candidate.name = Faker::Name.first_name
      candidate.surname = Faker::Name.last_name
    end
  end
end
