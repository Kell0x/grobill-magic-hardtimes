ServerEvents.recipes(event => {

    event.recipes.botania.mana_infusion(
        'kubejs:life_essence_block_oc',
        'kubejs:life_essence_block',
        1000000
    )

    event.shapeless(
        'kubejs:life_essence_block',
        [
            'botania:life_essence',
            'botania:life_essence',
            'botania:life_essence',
            'botania:life_essence'
        ]
    )
})