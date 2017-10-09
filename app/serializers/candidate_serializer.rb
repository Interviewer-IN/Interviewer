class CandidateSerializer < ActiveModel::Serializer
  #TODO wtf text is doing here
  attributes :id, :age, :experience, :contacts, :text
end
