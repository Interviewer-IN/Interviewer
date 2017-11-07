InterviewerSchema = GraphQL::Schema.define do
  #https://blog.codeship.com/how-to-implement-a-graphql-api-in-rails/
  #https://philsturgeon.uk/api/2017/01/24/graphql-vs-rest-overview/
  #https://www.youtube.com/watch?v=DaznKqh5Ypk


  #mutation(Types::MutationType)
  query(Types::QueryType)
end
