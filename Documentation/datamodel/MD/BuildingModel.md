Represents buildings within an island.

## Schema Fields
- `island_id` (ObjectId): References the [[IslandModel]].
- `lot_id` (ObjectId): References an [[IslandPropertyLotModel]].
- `name` (String): Building name.
- `type` (String): Defaults to "onestory".
- `description` (String): Description of the building.

## Relationships
- [[IslandModel]]
- [[IslandPropertyLotModel]]