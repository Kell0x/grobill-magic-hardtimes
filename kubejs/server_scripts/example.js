EntityEvents.hurt(event => {

    const victim = event.entity
    const source = event.source

    // Une entité pacifiée ne reçoit pas de dégâts
    if (victim.hasEffect('kubejs:pacified_effect') || victim.hasEffect('kubejs:devil_stick_effect')) {
        event.cancel()
        return
    }

    const attacker = source.actual

    // Une entité pacifiée ne peut pas infliger de dégâts
    if (
        attacker &&
        attacker.isLiving() &&
        (attacker.hasEffect('kubejs:pacified_effect') || attacker.hasEffect('kubejs:devil_stick_effect'))
    ) {
        event.cancel()
    }
})

ServerEvents.recipes(event => {
    event.shapeless(
        'kubejs:devil_stick',
        [
            'hexerei:dried_sage',
            'hexerei:dried_sage',
            'hexerei:dried_sage',
            'minecraft:paper'
        ]
    )
})