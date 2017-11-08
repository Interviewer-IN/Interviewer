Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :positions, !types[Types::PositionType] do
    argument :id, types.ID
    argument :name, types.String
    resolve -> (obj, args, ctx) {
      if args[:id]
        Position.where(id: args[:id])
      elsif args[:name]
        Position.where(name: args[:name])
      else
        Position.all
      end
    }
  end
end
