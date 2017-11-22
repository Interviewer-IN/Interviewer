class ChangeStatedefaultFromFalseToTrueInInterview < ActiveRecord::Migration[5.1]
    def change
      remove_column :interviews, :state, :boolean
      add_column :interviews, :state,  :boolean, default: false, null: false
    end
  end

