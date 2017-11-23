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

Level.new({:name => "Trainee"}).save(:validate => false)  unless Level.where(name: "Trainee").exists?
Level.new({:name => "Junior"}).save(:validate => false)  unless Level.where(name: "Junior").exists?
Level.new({:name => "Middle"}).save(:validate => false)  unless Level.where(name: "Middle").exists?
Level.new({:name => "Senior"}).save(:validate => false)  unless Level.where(name: "Senior").exists?
Level.new({:name => "Lead"}).save(:validate => false)  unless Level.where(name: "Senior").exists?

Rating.new({:grade => "Supa Bad"}).save(:validate => false)  unless Rating.where(grade: "Supa Bad").exists?
Rating.new({:grade => "Bad"}).save(:validate => false)  unless Rating.where(grade: "Bad").exists?
Rating.new({:grade => "Neutral"}).save(:validate => false)  unless Rating.where(grade: "Neutral").exists?
Rating.new({:grade => "Good"}).save(:validate => false)  unless Rating.where(grade: "Good").exists?
Rating.new({:grade => "Supa Good"}).save(:validate => false)  unless Rating.where(grade: "Supa Good").exists?

Position.new({:name => "QA"}).save(:validate => false)  unless Position.where(name: "QA").exists?
Position.new({:name => "PM"}).save(:validate => false)  unless Position.where(name: "PM").exists?
Position.new({:name => "Front-end"}).save(:validate => false)  unless Position.where(name: "Front-end").exists?
Position.new({:name => "Back-end"}).save(:validate => false)  unless Position.where(name: "Back-end").exists?
Position.new({:name => "HR"}).save(:validate => false)  unless Position.where(name: "HR").exists?

User.create({
                email:  "user@user.com",
                password:  "123456",
                password_confirmation: "123456",
                provider:  "email",
                uid: "user@user.com",
                confirmed_at:  "22.07.2016 " ,
                level_id:  Level.offset(rand(Level.count)).first.id,
                position_id: Position.offset(rand(Position.count)).first.id,
                confirmation_token: "hello"
            })  unless User.where(email: "user@user.com").exists?

User.create({
                email:  "user1@user.com",
                password:  "123456",
                password_confirmation: "123456",
                provider:  "email",
                uid: "user1@user.com",
                confirmed_at:  "22.07.2016 " ,
                level_id:  Level.offset(rand(Level.count)).first.id,
                position_id: Position.offset(rand(Position.count)).first.id,
                confirmation_token: "world"
            })  unless User.where(email: "user1@user.com").exists?

5.times do
  Vacancy.create({
                     status: Faker::DrWho.quote,
                     description: Faker::Lorem.paragraphs,
                     level_id: Level.offset(rand(Level.count)).first.id,
                     position_id: Position.offset(rand(Position.count)).first.id,
                     project_id: Project.offset(rand(Project.count)).first.id
                 })
end

5.times do
  Candidate.create({
                     name: Faker::Name.first_name,
                     surname: Faker::Name.last_name,
                     age: rand(19..45),
                     experience: Faker::Lorem.paragraphs,
                     contacts: Faker::Address.city + "," + Faker::Address.street_address + ","+ Faker::Address.building_number,
                     level_id: Level.offset(rand(Level.count)).first.id,
                     position_id: Position.offset(rand(Position.count)).first.id,
                   })
end

5.times do
  Interview.create({
                       date_time: Time.at(0.0 + rand * (Time.now.to_f - 0.0.to_f)),
                       candidate_id: Candidate.offset(rand(Candidate.count)).first.id,
                       vacancy_id: Vacancy.offset(rand(Vacancy.count)).first.id,
                       user_id: User.offset(rand(User.count)).first.id,
                       rating_id: Rating.offset(rand(Rating.count)).first.id
                   })
end

6.times do
  Question.create ( {
                 content: Faker::HitchhikersGuideToTheGalaxy.quote,
                 hint: Faker::Lovecraft.sentence,
                 active: true
  }
                  )
end

User.create({
                email:  "user@user.com",
                password:  "123456",
                password_confirmation: "123456",
                provider:  "email",
                uid: "user@user.com",
                confirmed_at:  "22.07.2016 " ,
                level_id:  Level.offset(rand(Level.count)).first.id,
                position_id: Position.offset(rand(Position.count)).first.id,
                confirmation_token: "Faker::DrWho.quote"
            })  unless User.where(email: "user@user.com").exists?

User.create({
                email:  "user1@user.com",
                password:  "123456",
                password_confirmation: "123456",
                provider:  "email",
                uid: "user1@user.com",
                confirmed_at:  "22.07.2016 " ,
                level_id:  Level.offset(rand(Level.count)).first.id,
                position_id: Position.offset(rand(Position.count)).first.id,
                confirmation_token: "Faker::DrWho.quote1"
            })  unless User.where(email: "user1@user.com").exists?