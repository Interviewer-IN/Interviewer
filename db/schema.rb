# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171111180212) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "candidates", force: :cascade do |t|
    t.integer "age"
    t.text "experience"
    t.text "contacts"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "level_id"
    t.bigint "position_id"
    t.string "cv"
    t.string "name"
    t.string "surname"
    t.text "notes"
    t.index ["level_id"], name: "index_candidates_on_level_id"
    t.index ["position_id"], name: "index_candidates_on_position_id"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.text "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "interview_id"
    t.bigint "question_id"
    t.index ["interview_id"], name: "index_feedbacks_on_interview_id"
    t.index ["question_id"], name: "index_feedbacks_on_question_id"
  end

  create_table "interviews", force: :cascade do |t|
    t.boolean "status", default: true, null: false
    t.datetime "date_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "candidate_id"
    t.bigint "vacancy_id"
    t.bigint "user_id"
    t.bigint "rating_id"
    t.boolean "state", default: false, null: false
    t.index ["candidate_id"], name: "index_interviews_on_candidate_id"
    t.index ["rating_id"], name: "index_interviews_on_rating_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
    t.index ["vacancy_id"], name: "index_interviews_on_vacancy_id"
  end

  create_table "levels", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.string "hint"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.string "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "surname"
    t.bigint "level_id"
    t.bigint "position_id"
    t.boolean "is_hr", default: false, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["level_id"], name: "index_users_on_level_id"
    t.index ["position_id"], name: "index_users_on_position_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "vacancies", force: :cascade do |t|
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "level_id"
    t.bigint "position_id"
    t.bigint "project_id"
    t.boolean "status", default: true, null: false
    t.index ["level_id"], name: "index_vacancies_on_level_id"
    t.index ["position_id"], name: "index_vacancies_on_position_id"
    t.index ["project_id"], name: "index_vacancies_on_project_id"
  end

  add_foreign_key "candidates", "levels"
  add_foreign_key "candidates", "positions"
  add_foreign_key "feedbacks", "interviews"
  add_foreign_key "feedbacks", "questions"
  add_foreign_key "interviews", "candidates"
  add_foreign_key "interviews", "ratings"
  add_foreign_key "interviews", "users"
  add_foreign_key "interviews", "vacancies"
  add_foreign_key "users", "levels"
  add_foreign_key "users", "positions"
  add_foreign_key "vacancies", "levels"
  add_foreign_key "vacancies", "positions"
  add_foreign_key "vacancies", "projects"
end
