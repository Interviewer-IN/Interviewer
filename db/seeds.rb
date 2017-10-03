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

Level.new({:name => "Trainee"}).save(:validate => false)  unless Level.where(name: "Trainee").exists?
Level.new({:name => "Junior"}).save(:validate => false)  unless Level.where(name: "Junior").exists?
Level.new({:name => "Middle"}).save(:validate => false)  unless Level.where(name: "Middle").exists?
Level.new({:name => "Senior"}).save(:validate => false)  unless Level.where(name: "Senior").exists?

Position.new({:name => "QA"}).save(:validate => false)  unless Position.where(name: "QA").exists?
Position.new({:name => "PM"}).save(:validate => false)  unless Position.where(name: "PM").exists?
Position.new({:name => "Front-end"}).save(:validate => false)  unless Position.where(name: "Front-end").exists?
Position.new({:name => "Back-end"}).save(:validate => false)  unless Position.where(name: "Back-end").exists?

5.times do
  Vacancy.create({
                     status: Faker::DrWho.quote,
                     description: Faker::Lorem.paragraphs,
                     level_id: Level.offset(rand(Level.count)).first.id,
                     position_id: Position.offset(rand(Position.count)).first.id,
                     project_id: Project.offset(rand(Project.count)).first.id
                 })
end

#TODO - index Level and Position by name case insesitive
#TODO - make params not optional
#TODO - unique elements
#TODO - sorry failed to propper commint messages