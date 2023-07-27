export const MyGame = {
  roomId: "start", //This is the ID of the room the player starts in
  rooms: [
    //Each room is an object that has components: an id (only used for code), a name and description (given to the game player),
    //items for the inventory, and exits with ids that correspond to other rooms
    {
      id: "start",
      name: "The Bathroom",
      desc: "It's the first room",
      items: [
        {
          name: "toilet grenade",
          desc: "A grenade used for general purpose toilet cleaning or for blowing up metal vault doors",
          count: 1,
        },
        {
          name: "kitchen gun",
          desc: "A gun, used for kitchen cleaning or suicide",
          count: 1,
        },
        {
          name: "leo token",
          desc: "A one use token for use in the Leo Machine. You can redeem it for any one item",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Into the void",
          id: "left",
        },
      ],
    },

    {
      id: "left",
      name: "void",
      desc: "your fate is sealed, but theres donuts",
      items: [
        {
          name: "loose donut",
          desc: "a singular donut, seemingly here to comfort you in this confusing place",
          count: 1,
        },
        {
          name: "unidentified liquid",
          desc: "A strange liquid smeared on the floor of this dark abyss",
        },
        {
          name: "leo token",
          desc: "A one use token for use in the Leo Machine. You can redeem it for any one item",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "forward, exiting thru the void-gate 14",
          id: "underover",
        },
        {
          dir: "Onto an upward-faceing sword, choosing to kill yourself",
          id: "netherrealm",
        },
      ],
    },

    {
      id: "netherrealm",
      name: "Death",
      desc: "Why are you still here?",
      items: [
        {
          name: "Immortality",
          desc: "The ability to become unkillable",
          count: 1,
        },
      ],
      exits: [
        {
          dir: "backwards, like a moron",
          id: "left",
        },
      ],
    },

    {
      id: "underover",
      name: "void-gate 14",
      desc: "Its a gate",
      items: [
        {
          name: "trinket",
          desc: "A ping pong ball painted gold. You are strangly facinated by it",
          count: 1,
        },
        {
          name: "a trashbag full of human ears",
          desc: "Its exactly what it sounds like",
          count: 1,
        },
        {
          name: "83 leo bucks covered in blood",
          desc: "The plastic-y flimsy paper currency used in Leo Machine",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "backwards, like a moron",
          id: "left",
        },
        {
          dir: "On a train, to Seattle, WA",
          id: "WA",
        },
      ],
    },

    {
      id: "WA",
      name: "The Train",
      desc: "It has begun",
      items: [
        {
          name: "a dead dove in a paper bag",
          desc: "Is this a reference?",
          count: 1,
        },
        {
          name: "a tennisball covered in mold",
          desc: "You've been here before, haven't you",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "forwards, deeper into the train",
          id: "moretrain",
        },
      ],
    },

    {
      id: "moretrain",
      name: "Still The Train",
      desc: "The train is... moist",
      items: [
        {
          name: "a used face",
          desc: "Seems as though it was removed by force",
          count: 1,
        },
        {
          name: "A dull, bloody hacksaw",
          desc: "This could be used as a weapon",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "forwards",
          id: "moremoretrain",
        },
      ],
    },

    {
      id: "moremoretrain",
      name: "Even More Train",
      desc: "You can here something breathing. There are two doors infront of you. Which will you pick",
      items: [],

      exits: [
        {
          dir: "A clean, white, wooden door",
          id: "ending1",
        },
        {
          dir: "A vault door, made of steel",
          id: "vault",
          locked: true,
          requiredItem: "toilet grenade",
        },
      ],
    },

    {
      id: "ending1",
      name: "Too Far?",
      desc: "The creature is here. You are dead",
      items: [],

      exits: [
        {
          dir: "Restart",
          id: "start",
        },
      ],
    },

    {
      id: "vault",
      name: "The Box",
      desc: "A metal box, filled with Leo Tokens. When you go to grab them, you see that it's a hologram. On the other side of the room, you see a garage door",
      items: [],

      exits: [
        {
          dir: "Forward, through the garage door",
          id: "elzzup",
        },
      ],
    },
    {
      id: "elzzup",
      name: "The Garage",
      desc: "A Garage filled with tools and junk. There are 3 white wooden doors on the other side of the room",
      items: [
        {
          name: "A Stapler",
          desc: "A basic common stapler",
          count: 1,
        },
        {
          name: "A bag of potato chips",
          desc: "It's a bag of chips",
          count: 1,
        },
        {
          name: "a tennis ball",
          desc: "An old, worn out, tennis ball",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Door 1",
          id: "ending2",
        },
        {
          dir: "Door 2",
          id: "escape",
        },
        {
          dir: "Door 3",
          id: "ending3",
        },
      ],
    },
    {
      id: "escape",
      name: "The Train Again",
      desc: "The train... again. This train doesnt seem to end, or go anywhere",
      items: [
        {
          name: "train oil",
          desc: "A small vial of pungent brown liquid. Its labeled train oil",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Forward, to a sliding door",
          id: "slidoor",
        },
      ],
    },
    {
      id: "ending2",
      name: "The End",
      desc: "Its here. It found you. You Are Dead",
      items: [],

      exits: [
        {
          dir: "Restart",
          id: "start",
        },
      ],
    },
    {
      id: "ending3",
      name: "The End",
      desc: "Its here. It found you. You Are Dead",
      items: [],

      exits: [
        {
          dir: "Restart",
          id: "start",
        },
      ],
    },
    {
      id: "slidoor",
      name: "A Ballpit?",
      desc: "It's a... Ballpit?",
      items: [
        {
          name: "Ball",
          desc: "All of the balls in the ballpit",
          count: 3000,
        },
      ],

      exits: [
        {
          dir: "Forward, deeper into the ballpit",
          id: "ballball",
        },
      ],
    },
    {
      id: "ballball",
      name: "A Sea of Balls",
      desc: "You've gone deeper into the ballpit",
      items: [
        {
          name: "Piss",
          desc: "There's piss all over these balls",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Forward, deeper into the ballpit",
          id: "ballballball",
        },
        {
          dir: "Backwards, like a wuss",
          id: "slidoor",
        },
      ],
    },
    {
      id: "ballballball",
      name: "A Sea of Balls",
      desc: "You've gone deeper into the ballpit",
      items: [
        {
          name: "Piss",
          desc: "There's piss all over these balls",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Forward, deeper into the ballpit",
          id: "ballballballdoor",
        },
        {
          dir: "Backwards, like a wuss",
          id: "ballball",
        },
      ],
    },
    {
      id: "ballballballdoor",
      name: "The Sea of Balls",
      desc: "You see a door infront of you. Whats that doing here?",
      items: [
        {
          name: "Piss",
          desc: "There's piss all over these balls",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Forward, swimming through the piss towards the door",
          id: "dodo",
        },
        {
          dir: "Backwards, like a wuss",
          id: "ballballball",
        },
      ],
    },
    {
      id: "dodo",
      name: "The Door",
      desc: "You made it to the door. Do you enter?",
      items: [
        {
          name: "Piss",
          desc: "There's piss all over these balls",
          count: 1,
        },
      ],

      exits: [
        {
          dir: "Forward, through the door",
          id: "dodob",
        },
        {
          dir: "Backwards, like a wuss",
          id: "ballballballdoor",
        },
      ],
    },
    {
      id: "dodob",
      name: "The House",
      desc: "Welcome to the House, there is some stairs heading to the second floor, and theres a submarine hatch in the back",
      items: [],

      exits: [
        {
          dir: "Up the stairs to the second floor",
          id: "stairup",
        },
        {
          dir: "Out of the house, using the submarine hatch",
          id: "subh",
        },
      ],
    },
  ],
};
