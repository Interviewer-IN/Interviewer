class ChangeStatusTypeInVacancy < ActiveRecord::Migration[5.1]
  def change
    remove_column :vacancies, :status
    add_column :vacancies, :status,  :boolean, default: true, null: false
  end
end
