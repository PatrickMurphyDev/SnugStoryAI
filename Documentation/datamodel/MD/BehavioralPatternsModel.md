Represents the behavioral patterns of characters in the game.

## Schema Fields
- `island_id` (ObjectId): References the [[IslandModel]].
- `character_id` (ObjectId): References the [[Character]].
- `dailySchedule` (Array of Strings): Daily routine tasks for the character.
- `taskPriorities` (Array of Strings): Task priority levels for the character.

## Relationships
- [[IslandModel]]
- [[Character]]

---
