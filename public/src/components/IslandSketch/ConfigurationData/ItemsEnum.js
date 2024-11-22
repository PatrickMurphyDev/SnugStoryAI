export const ItemsEnum = {
    'default': {id:1, key:"default", type:1, name:"Item", icon: ["🥅",""], details: {"props":{
        "weight":1
      }}},
      'crabtrap': {id:2, key:"crabtrap", type:1, name:"Crab Trap", icon: ["🥅",""], details: {"props":{
        "weight":10, buyPrice:35, salePrice:6, soldBy: "unit",
      }}},
      'hermitcrab': {id:3, key:"hermitcrab", type:2, name:"Hermit Crab", icon: ["🦀","🐚"], details: {"props":{
        soldBy: "unit",
        "weight":1, buyPrice:7, salePrice:4
      }}},
      'redrockcrab': {id:4, key:"redrockcrab", type:2, name:"Red Rock Crab", icon: ["🦀","🟥"], details: {"props":{
        soldBy: "weight",
        "weight":2, buyPrice:11, salePrice:8
      }}},
      'snowcrab': {id:5, key:"snowcrab", type:2, name:"Snow Crab", icon: ["🦀","❄️"], details: {"props":{
        soldBy: "weight",
        "weight":2.8, buyPrice:16.54, salePrice:12
      }}},
      'dungenesscrab': {id:6, key:"dungenesscrab", type:2, name:"Dungeness Crab", icon: ["🦀",""], details: {"props":{
        soldBy: "weight",
        "weight":3.5, buyPrice:19.99, salePrice:15.25
      }}},
      'kingcrab': {id:7, key: "kingcrab", type:2, name:"King Crab", icon: ["🦀","👑"], details: {"props":{
        soldBy: "weight",
        "weight":13, buyPrice:54.99, salePrice:32
      }}}
};