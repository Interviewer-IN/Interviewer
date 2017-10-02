class CreateVacancies < ActiveRecord::Migration[5.1]
  def change
    create_table :vacancies do |t|
      t.text :descriprion
      t.bigint :level_id
      t.bigint :project_id
      t.bigint :position_id
      t.text :status

      t.timestamps
    end
  end
end
