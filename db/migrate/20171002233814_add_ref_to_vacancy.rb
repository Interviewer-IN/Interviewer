class AddRefToVacancy < ActiveRecord::Migration[5.1]
  def change
    add_reference :vacancies, :levels, foreign_key: true
    add_reference :vacancies, :positions, foreign_key: true
    add_reference :vacancies, :projects, foreign_key: true
  end
end
