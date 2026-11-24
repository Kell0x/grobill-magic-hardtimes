ServerEvents.recipes(event => {
    event.custom({
        type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_abyss_located',
        augments: [
            {
                key: 'minecraft:water_bucket'
            }
        ],
        structure: {
            tag: 'cataclysm:eye_of_abyss_located'
        }
    }).id('kubejs:eye_of_abyss_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_curse_located',
    augments: [
      {
        key: 'minecraft:phantom_membrane'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_curse_located'
    }
  }).id('kubejs:eye_of_curse_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_desert_located',
    augments: [
      {
        key: 'minecraft:sand'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_desert_located'
    }
  }).id('kubejs:eye_of_desert_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_flame_located',
    augments: [
      {
        key: 'minecraft:blaze_powder'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_flame_located'
    }
  }).id('kubejs:eye_of_flame_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_mech_located',
    augments: [
      {
        key: 'structurize:sceptergold'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_mech_located'
    }
  }).id('kubejs:eye_of_mech_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_monstrous_located',
    augments: [
      {
        key: 'minecraft:lava_bucket'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_monstrous_located'
    }
  }).id('kubejs:eye_of_monstrous_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_ruined_located',
    augments: [
      {
        key: 'minecraft:shulker_shell'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_ruined_located'
    }
  }).id('kubejs:eye_of_ruined_located');
});

ServerEvents.recipes(event => {
  event.custom({
    type: 'ars_additions:locate_structure',
        id: 'kubejs:eye_of_storm_located',
    augments: [
      {
        key: 'minecraft:prismarine_shard'
      }
    ],
    structure: {
      tag: 'cataclysm:eye_of_storm_located' // Locates the nearest village of any biome type
    }
  }).id('kubejs:eye_of_storm_located');
});
