class AddIsHrToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_hr, :boolean, default: false, null: false
    User.find_each do |user|
      user.is_hr = false if user.is_hr.nil?
    end
  end
end
