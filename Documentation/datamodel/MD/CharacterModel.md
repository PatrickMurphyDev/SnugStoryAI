Represents characters in the game world.

## Schema Fields
### **Character**
- `island_id` (ObjectId): References the [[IslandModel]].
- `is_npc` (Boolean): Indicates if the character is non-player.
- `is_active` (Boolean): Whether the character is active.
- `name` (Object): Character's full name with:
  - `first` (String): First name.
  - `last` (String): Last name.
- `age` (Number): Character's age.
- `biologicalGender` (String): Biological gender, defaults to "female".

### **CharacterDetails**
- Links to detailed character metadata such as:
  - `traits` (Array): References to [[Trait]]s.
  - `resources_id`: References [[Resources]].
  - `behavioral_patterns_id`: References [[BehavioralPatternsModel]].
  - `special_conditions_id`: References [[SpecialConditionsModel]].

### **Trait**
- Defines traits with attributes like:
  - `name` (String): Name of the trait.
  - `category` (String): E.g., physical, psychological, etc.

### **Personality**
- Represents character personality data including:
  - `relationshipStatus` (String): Current relationship status.
  - `hobbies`, `childhoodMemories`, etc.

## Relationships
- [[IslandModel]]
- [[Trait]]
- [[Resources]]
- [[BehavioralPatternsModel]]
- [[SpecialConditionsModel]]

---