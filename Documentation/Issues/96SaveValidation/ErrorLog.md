`
[0] Server started on 5006
[0] DB Connetion Successfull
[0] User connected:  lw7ySPSNg6ENCg9iAAAB
[0] User connected:  7L3SoF1hACmh3AF6AAAD
[0] Save Game State {
[0]   saveID: 'save1',
[0]   saveData: {
[0]     player: { location: [Object], inventory: [Object] },
[0]     world: { date: '07/04/2024', time: '21:40' }
[0]   }
[0] }
[0] C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:2962
[0]     this.$__.validationError = new ValidationError(this);
[0]                                ^
[0]
[0] ValidationError: GameSaveState validation failed: player.inventory: Cast to string failed for value "{
[0]   items: { Item2: 5 },
[0]   itemDetails: {
[0]     Item2: {
[0]       id: 2,
[0]       key: 'Item2',
[0]       type: 1,
[0]       name: 'Crab Trap',
[0]       description: 'A basic trap for catching small crabs.',
[0]       icon: [Array],
[0]       details: [Object]
[0]     }
[0]   },
[0]   _cashValue: 1300,
[0]   _currentItemIndex: 0
[0] }" (type Object) at path "player.inventory"
[0]     at Document.invalidate (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:2962:32)
[0]     at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1476:12)
[0]     at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1248:14)
[0]     at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1154:14)
[0]     at model.Document (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:161:12)
[0]     at model.Model (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:108:12)
[0]     at new model (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:4813:15)
[0]     at C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:3134:22
[0]     at C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:3170:7
[0]     at Array.forEach (<anonymous>) {
[0]   errors: {
[0]     'player.inventory': CastError: Cast to string failed for value "{
[0]       items: { Item2: 5 },
[0]       itemDetails: {
[0]         Item2: {
[0]           id: 2,
[0]           key: 'Item2',
[0]           type: 1,
[0]           name: 'Crab Trap',
[0]           description: 'A basic trap for catching small crabs.',
[0]           icon: [Array],
[0]           details: [Object]
[0]         }
[0]       },
[0]       _cashValue: 1300,
[0]       _currentItemIndex: 0
[0]     }" (type Object) at path "player.inventory"
[0]         at SchemaString.cast (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\schema\string.js:603:11)
[0]         at SchemaType.applySetters (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\schematype.js:1180:12)
[0]         at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1435:20)
[0]         at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1248:14)
[0]         at model.$set (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:1154:14)
[0]         at model.Document (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\document.js:161:12)
[0]         at model.Model (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:108:12)
[0]         at new model (C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:4813:15)
[0]         at C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:3134:22
[0]         at C:\Users\Patrick\CodeProjects\SnugStoryAI\server\node_modules\mongoose\lib\model.js:3170:7 {
[0]       stringValue: '"{\n' +
[0]         '  items: { Item2: 5 },\n' +
[0]         '  itemDetails: {\n' +
[0]         '    Item2: {\n' +
[0]         '      id: 2,\n' +
[0]         "      key: 'Item2',\n" +
[0]         '      type: 1,\n' +
[0]         "      name: 'Crab Trap',\n" +
[0]         "      description: 'A basic trap for catching small crabs.',\n" +
[0]         '      icon: [Array],\n' +
[0]         '      details: [Object]\n' +
[0]         '    }\n' +
[0]         '  },\n' +
[0]         '  _cashValue: 1300,\n' +
[0]         '  _currentItemIndex: 0\n' +
[0]         '}"',
[0]       messageFormat: undefined,
[0]       kind: 'string',
[0]       value: {
[0]         items: { Item2: 5 },
[0]         itemDetails: {
[0]           Item2: {
[0]             id: 2,
[0]             key: 'Item2',
[0]             type: 1,
[0]             name: 'Crab Trap',
[0]             description: 'A basic trap for catching small crabs.',
[0]             icon: [Array],
[0]             details: [Object]
[0]           }
[0]         },
[0]         _cashValue: 1300,
[0]         _currentItemIndex: 0
[0]       },
[0]       path: 'player.inventory',
[0]       reason: null,
[0]       valueType: 'Object'
[0]     }
[0]   },
[0]   _message: 'GameSaveState validation failed'
[0] }
[0]
[0] Node.js v18.18.2
[0] [nodemon] app crashed - waiting for file changes before starting...
`