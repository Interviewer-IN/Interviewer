class AddCvToCandidates < ActiveRecord::Migration[5.1]
  def change
    add_column :candidates, :cv, :string
  end
end
