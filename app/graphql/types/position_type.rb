Types::PositionType = GraphQL::ObjectType.define do
  name 'Position'

  field :id, !types.ID
  field :name, !types.String
  field :created_at, !types.String
  field :updated_at, !types.String

  end