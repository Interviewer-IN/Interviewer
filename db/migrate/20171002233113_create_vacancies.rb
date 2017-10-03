class CreateVacancies < ActiveRecord::Migration[5.1]
  def change
    create_table :vacancies do |t|
      t.text :description
      t.text :status

      t.timestamps
    end
  end
end
