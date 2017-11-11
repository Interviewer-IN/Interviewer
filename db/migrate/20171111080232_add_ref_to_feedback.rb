class AddRefToFeedback < ActiveRecord::Migration[5.1]
  def change
    add_reference :feedbacks, :interview, foreign_key: true
    add_reference :feedbacks, :question, foreign_key: true
  end
end
