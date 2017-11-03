class CreateInterviews < ActiveRecord::Migration[5.1]
  def change
    create_table :interviews do |t|
      t.boolean :status, default: true, null: false
      t.string :state
      t.text :feedback
      t.timestamp :date_time

      t.timestamps
    end

    add_reference :interviews, :candidate, foreign_key: true
    add_reference :interviews, :vacancy, foreign_key: true
    add_reference :interviews, :user, foreign_key: true
  end
end
