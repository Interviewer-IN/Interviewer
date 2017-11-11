class AddDefaultState2QuestionActive < ActiveRecord::Migration[5.1]
  def change
    remove_column :questions, :active, :boolean
    add_column :questions, :active,  :boolean, default: true, null: false
  end
end
