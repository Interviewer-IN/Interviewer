class AddRefToVacancy < ActiveRecord::Migration[5.1]
  def change
    add_reference :vacancies, :level, foreign_key: true
    add_reference :vacancies, :position, foreign_key: true
    add_reference :vacancies, :project, foreign_key: true
  end
end
