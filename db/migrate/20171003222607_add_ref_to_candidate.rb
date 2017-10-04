class AddRefToCandidate < ActiveRecord::Migration[5.1]
  def change
    add_reference :candidates, :level, foreign_key: true
    add_reference :candidates, :position, foreign_key: true
  end
end
