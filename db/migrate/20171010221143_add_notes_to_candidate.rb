class AddNotesToCandidate < ActiveRecord::Migration[5.1]
  def change
    add_column :candidates, :notes, :text
  end
end
