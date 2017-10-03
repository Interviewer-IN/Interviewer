class CreateCandidates < ActiveRecord::Migration[5.1]
  def change
    create_table :candidates do |t|
      t.integer :age
      t.text :experience
      t.text :contacts

      t.timestamps
    end
  end
end
