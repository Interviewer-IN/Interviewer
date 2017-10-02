# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do
  Project.create({
      title: Faker::App.name,
      description: Faker::Lorem.paragraphs
                 })
end

Admin.new({:email => "admin@admin.com", :password => "123456", :password_confirmation => "123456" }).save(:validate => false) unless Admin.where(email: "admin@admin.com").exists?
User.new({:email => "user@user.com", :password => "123456", :password_confirmation => "123456" }).save(:validate => false) unless User.where(email: "user@user.com").exists?
User.new({:email => "user1@user.com", :password => "123456", :password_confirmation => "123456" }).save(:validate => false) unless User.where(email: "user1@user.com").exists?

#TODO - index Level and Position by name case insesitive
#TODO - make params not optional
#TODO - unique elements
