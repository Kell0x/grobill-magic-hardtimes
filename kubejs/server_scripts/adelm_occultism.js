ItemEvents.rightClicked('kubejs:bloodied_wedding_ring', event => {
    const player = event.player

    if (!player || !player.isPlayer()) return

    player.runCommandSilent(
        'advancement grant @s only adelm:adelm_occ'
    )

    player.teleportTo(
        'adelm:adelm',
        0,
        0,
        0,
        player.getYaw(),
        player.getPitch()
    )

})

ServerEvents.recipes(event => {

    event.recipes.occultism.ritual(
        'kubejs:bloodied_wedding_ring',
        [
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot'
        ],
        'occultism:book_of_binding_bound_marid',
        'occultism:craft_marid'
    )
    .ritualType('occultism:craft')
    .dummy('kubejs:dummy_ritual_thing')
    .sacrifice({
        tag: 'kubejs:demonic_spouses',
        display_name: 'Demonic Spouse'
    })

})