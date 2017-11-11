class RemoveFeedbackRefFromInterview < ActiveRecord::Migration[5.1]
  def change
    remove_column :interviews, :feedback, :text
  end
end
