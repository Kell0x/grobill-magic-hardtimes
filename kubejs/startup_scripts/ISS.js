StartupEvents.registry('attribute', event => {
	// Use the `spell` type for these attributes and set all the values needed. The default value has to be higher than the minimum value and lower than the maximum value.
	event.create('portoloin_spell_power', 'irons_spells_js:spell').setDefaultValue(1).setMinimumValue(0).setMaximumValue(10)
	event.create('portoloin_spell_resistance', 'irons_spells_js:spell').setDefaultValue(1).setMinimumValue(0).setMaximumValue(10)
})

// You can listen to mod bus events by using `ForgeModEvents.onEvent`, and then inputting the event class.
ForgeModEvents.onEvent('net.minecraftforge.event.entity.EntityAttributeModificationEvent', event => {
	// Here, we loop through all the entity types and add both attributes to each and every one of them. 
	// This makes sure that every entity that has magic capabilities can use these attributes.
	event.types.forEach(type => {
		event.add(type, 'kubejs:portoloin_spell_power')
		event.add(type, 'kubejs:portoloin_spell_resistance')
	})
})

StartupEvents.registry('irons_spellbooks:schools', event => {
	// This creates a school named `Test` with the ID `kubejs:test`.
	// You can use the ID of this school in any spell you create, or to change the school of an existing spell using the Iron's Spells server config.
	event.create('transplanaire')
		.setName(Component.of('Transplanaire').aqua()) // This sets what the school will be displayed as. This needs to be a Component.
        .setFocus("kubejs:pov_interplanaire_focus")
		.setPowerAttribute('kubejs:portoloin_spell_power') // This sets the power attribute.
		.setResistanceAttribute('kubejs:portoloin_spell_resistance') // This sets the resistance attribute.
		.setDefaultCastSound('minecraft:entity.chicken.death') // You can also set a default cast sound for each spell in the school.
		// In 1.20.1 and up, creating spell schools requires a damage type to be inputted.
		// You can create a damage type using datapacks. https://minecraft.wiki/w/Damage_type
		// .setDamageType('kubejs:test_spell_damage_type')
})

StartupEvents.registry('irons_spellbooks:spells', event => {
	event.create('kubejs:portoloin')
		.setCastTime(600)
		.setCooldownSeconds(100)
		.setManaCostPerLevel(1000)
		.setCastType('long')
		.setSchool('kubejs:transplanaire')
		.setMinRarity('legendary')
		.setMaxLevel(1)
		.setStartSound('item.honey_bottle.drink')
		.setFinishSound('item.honey_bottle.drink')
		.onCast(ctx => global.portoloin(ctx))
		.setAllowLooting(false)
		.needsLearning(false)
		.canBeCraftedBy(player => true)
		.setUniqueInfo((spellLevel, caster) => {
			return [
				Component.aqua('Téléporte vers l’ADELM')
			]
		})
})

global.portoloin = (ctx) => {
	const player = ctx.entity

	if (!player.isPlayer()) return

	player.teleportTo(
		'adelm:adelm',
		0,
		0,
		0,
		player.getYaw(),
		player.getPitch()
	)


    player.runCommandSilent(
        'advancement grant @s only adelm:adelm_iss'
    )
}

StartupEvents.registry('item', event => {
    event.create('pov_interplanaire')
        .displayName('Point de vue interplanaire')
        .tooltip('Cet oeil semble voir toutes les dimensions à la fois')
        .rarity('epic')
        .maxStackSize(1)
        .glow(true)
        .tag('kubejs:pov_interplanaire_focus')
        .tag('irons_spellbooks:school_focus')

    event.create('nether_scroll')
        .displayName('Burnt scroll')
        .tooltip('Ce parchemin sent le brulé et semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('end_scroll')
        .displayName('Cosmic scroll')
        .tooltip('Ce parchemin se tortille et semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('overworld_scroll')
        .displayName('Normal scroll')
        .tooltip('Ce parchemin a l\'air normal mais il semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('au_dela_scroll')
        .displayName('Dead scroll')
        .tooltip('Ce parchemin semble mort et vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('noosphere_scroll')
        .displayName('Soaked scroll')
        .tooltip('Ce parchemin est détrempé et semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('deep_noosphere_scroll')
        .displayName('Lost scroll')
        .tooltip('Ce parchemin a l\'air d\'avoir passé des années derrière un meuble et semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('overworld11_scroll')
        .displayName('Anormal scroll')
        .tooltip('Ce parchemin est étrange et semble vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)


    event.create('adelm_scroll')
        .displayName('Transdimentional scroll')
        .tooltip('Ce parchemin semble porter le poids de toutes les dimensions connues et est vidé de toute sa magie.')
        .texture('kubejs:item/scroll')
        .rarity('epic')
        .maxStackSize(1)
})